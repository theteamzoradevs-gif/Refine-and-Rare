"use client";

import { FormEvent, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { submitChatEnquiry } from "@/app/actions/enquiry";
import { answerSiteQuestion, type KnowledgeContext } from "@/lib/siteKnowledge";
import { parseHours } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ServiceOption = {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  longDesc: string;
};

type ProjectOption = {
  title: string;
  description: string;
  category: string;
};

type Props = {
  businessName?: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  hoursJson: string;
  instagram: string;
  services: ServiceOption[];
  projects: ProjectOption[];
};

type ChatMsg = { id: string; from: "bot" | "user"; text: string };
type Mode = "chat" | "lead-name" | "lead-phone" | "lead-note" | "lead-done";

export function ChatLauncher({
  businessName = "Refine & Rare",
  tagline,
  description,
  email,
  phone,
  city,
  address,
  hoursJson,
  instagram,
  services,
  projects,
}: Props) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState<Mode>("chat");
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [interest, setInterest] = useState("General enquiry");
  const [serviceId, setServiceId] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [pending, startTransition] = useTransition();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const bootstrapped = useRef(false);

  const knowledge = useMemo<KnowledgeContext>(() => {
    const hours = parseHours(hoursJson);
    const hoursText = Object.entries(hours)
      .map(([d, v]) => `${d}: ${v}`)
      .join("\n");
    return {
      businessName,
      tagline,
      description,
      email,
      phone,
      city,
      address,
      hoursText,
      instagram,
      services: services.map((s) => ({
        title: s.title,
        shortDesc: s.shortDesc,
        longDesc: s.longDesc,
        slug: s.slug,
      })),
      projects,
    };
  }, [
    businessName,
    tagline,
    description,
    email,
    phone,
    city,
    address,
    hoursJson,
    instagram,
    services,
    projects,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("rr_chat_closed") === "1") {
      setDismissed(true);
      return;
    }
    const t = window.setTimeout(() => setOpen(true), 2200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open || dismissed || bootstrapped.current) return;
    bootstrapped.current = true;
    void botSay(
      `Hi — I'm your ${businessName} assistant. Ask me anything about our services, projects, process, hours, or pricing. When you're ready, type “enquire”.`
    );
  }, [open, dismissed, businessName]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, typing, mode]);

  function closePanel() {
    setOpen(false);
    setDismissed(true);
    sessionStorage.setItem("rr_chat_closed", "1");
  }

  function reopen() {
    setDismissed(false);
    setOpen(true);
    sessionStorage.removeItem("rr_chat_closed");
  }

  function push(from: "bot" | "user", text: string) {
    setMsgs((m) => [...m, { id: `${Date.now()}-${Math.random()}`, from, text }]);
  }

  function botSay(text: string) {
    return new Promise<void>((resolve) => {
      setTyping(true);
      window.setTimeout(() => {
        setTyping(false);
        push("bot", text);
        resolve();
      }, 550);
    });
  }

  function startLead(preferredInterest?: string, preferredServiceId?: string) {
    if (preferredInterest) setInterest(preferredInterest);
    if (preferredServiceId) setServiceId(preferredServiceId);
    setMode("lead-name");
    void botSay("Sure — I’ll take your enquiry here. What’s your name?");
  }

  function ask(value: string) {
    const answer = answerSiteQuestion(value, knowledge);
    const matched = services.find(
      (s) =>
        value.toLowerCase().includes(s.slug.replace(/-/g, " ")) ||
        value.toLowerCase().includes(s.title.toLowerCase())
    );
    if (matched) {
      setInterest(matched.title);
      setServiceId(matched.id);
    }
    void botSay(answer.text).then(() => {
      if (
        answer.suggestLead &&
        /enquire|inquiry|enquiry|quote|consultation|book/i.test(value)
      ) {
        startLead(matched?.title, matched?.id);
      }
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = input.trim();
    if (!value || pending) return;
    setError(null);
    push("user", value);
    setInput("");

    if (mode === "chat" || mode === "lead-done") {
      if (mode === "lead-done") setMode("chat");
      if (/^(enquire|inquiry|enquiry|get quote|consultation)$/i.test(value)) {
        startLead();
        return;
      }
      ask(value);
      return;
    }

    if (mode === "lead-name") {
      if (value.length < 2) {
        setError("Please enter your name.");
        return;
      }
      setName(value);
      setMode("lead-phone");
      void botSay("Thanks. What’s the best phone number to reach you?");
      return;
    }

    if (mode === "lead-phone") {
      if (value.replace(/\D/g, "").length < 8) {
        setError("Please enter a valid phone number.");
        return;
      }
      setLeadPhone(value);
      setMode("lead-note");
      void botSay("Last step — briefly describe your space or timeline (or type skip).");
      return;
    }

    if (mode === "lead-note") {
      const note = value.toLowerCase() === "skip" ? "" : value;
      const n = name;
      const p = leadPhone;
      const i = interest;
      const sid = serviceId;
      startTransition(async () => {
        void botSay("Saving your enquiry…");
        const result = await submitChatEnquiry({
          name: n,
          phone: p,
          interest: i,
          note: note || undefined,
          serviceId: sid,
        });
        if (!result.ok) {
          setError(result.error);
          setMode("lead-note");
          void botSay("I couldn’t save that. Please try again.");
          return;
        }
        setMode("lead-done");
        void botSay(
          `Thank you, ${n.split(" ")[0] || "there"}. Your enquiry is with our team — we’ll follow up shortly.`
        );
      });
    }
  }

  return (
    <div className="fixed bottom-[5.75rem] right-4 z-50 flex max-w-[min(100vw-5.5rem,23rem)] flex-col items-end gap-3 sm:bottom-[6.25rem] sm:right-6">
      {open && !dismissed && (
        <div className="flex h-[min(70vh,540px)] w-[min(100vw-2rem,23rem)] flex-col overflow-hidden rounded-2xl border border-line/80 bg-[#faf6ef] shadow-[0_28px_70px_-28px_rgba(28,36,33,0.55)] animate-float-in">
          <div className="flex items-center justify-between border-b border-white/10 bg-ink px-4 py-3.5 text-cream">
            <div className="flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-teal text-sm font-semibold text-white">
                R
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-ink bg-[#6fbf73]" />
              </span>
              <div>
                <p className="text-sm font-medium tracking-wide">{businessName}</p>
                <p className="text-[11px] text-cream/55">Ask anything · online</p>
              </div>
            </div>
            <button
              type="button"
              onClick={closePanel}
              className="rounded-full px-2 py-1 text-lg leading-none text-cream/60 hover:bg-white/10 hover:text-cream"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[90%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                  m.from === "bot"
                    ? "rounded-bl-md bg-white text-ink"
                    : "ml-auto rounded-br-md bg-teal text-white"
                )}
              >
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="inline-flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-3 py-2.5 shadow-sm">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal/70" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal/70 [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal/70 [animation-delay:240ms]" />
              </div>
            )}
            {mode === "chat" && msgs.length < 3 && !typing && (
              <div className="flex flex-wrap gap-2">
                {["What services do you offer?", "Modular kitchen?", "Business hours", "Enquire"].map(
                  (chip) => (
                    <button
                      key={chip}
                      type="button"
                      className="rounded-full border border-line bg-white px-3 py-1.5 text-xs text-ink hover:border-teal hover:text-teal"
                      onClick={() => {
                        push("user", chip);
                        if (/^enquire$/i.test(chip)) {
                          startLead();
                          return;
                        }
                        ask(chip);
                      }}
                    >
                      {chip}
                    </button>
                  )
                )}
              </div>
            )}
            {mode === "lead-done" && (
              <div className="rounded-xl border border-teal/20 bg-teal/5 px-3.5 py-3 text-sm text-ink">
                You’re all set. Ask more anytime — no extra forms.
              </div>
            )}
            {error && <p className="text-xs text-red-700">{error}</p>}
          </div>

          <form onSubmit={onSubmit} className="border-t border-line/80 bg-white/80 p-3 backdrop-blur">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === "lead-name"
                    ? "Your name"
                    : mode === "lead-phone"
                      ? "Phone number"
                      : mode === "lead-note"
                        ? "Project note or skip"
                        : "Ask about services, projects, hours…"
                }
                className="min-w-0 flex-1 rounded-xl border border-line bg-cream px-3 py-2.5 text-sm outline-none focus:border-teal"
              />
              <button
                type="submit"
                disabled={pending}
                className="rounded-xl bg-ink px-4 text-sm font-medium text-cream transition hover:bg-teal"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {!open && (
        <button
          type="button"
          onClick={reopen}
          className="hidden max-w-[15.5rem] animate-float-in rounded-2xl rounded-br-md border border-line/80 bg-white/95 px-3.5 py-2.5 text-left text-xs leading-snug text-ink shadow-lg sm:block"
        >
          <span className="font-medium text-teal">Ask Refine & Rare</span>
          <span className="mt-0.5 block text-muted">
            Services, projects, hours — type freely.
          </span>
        </button>
      )}

      <button
        type="button"
        onClick={() => (open ? closePanel() : reopen())}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-ink text-cream shadow-[0_14px_34px_-12px_rgba(28,36,33,0.65)] transition hover:bg-teal"
        aria-expanded={open}
        aria-label="Open chat assistant"
      >
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-gold ring-2 ring-cream" />
        )}
        {open ? (
          <span className="text-2xl leading-none">×</span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z" />
          </svg>
        )}
      </button>
    </div>
  );
}
