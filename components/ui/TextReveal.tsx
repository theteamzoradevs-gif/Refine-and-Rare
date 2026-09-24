"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 45,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Tag className={cn(className)}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom py-[0.18em] -my-[0.12em]"
          >
            <span
              className={cn(
                "inline-block transition-all",
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[110%] opacity-0"
              )}
              style={{
                transitionDuration: "800ms",
                transitionDelay: `${delay + i * stagger}ms`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
