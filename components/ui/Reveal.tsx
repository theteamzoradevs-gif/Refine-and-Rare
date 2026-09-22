"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "up" | "down" | "left" | "right" | "scale" | "blur";

const hidden: Record<Variant, string> = {
  up: "translate-y-10 opacity-0",
  down: "translate-y-[-1.5rem] opacity-0",
  left: "translate-x-10 opacity-0",
  right: "-translate-x-10 opacity-0",
  scale: "scale-[0.94] opacity-0",
  blur: "translate-y-6 opacity-0 blur-sm",
};

const shown: Record<Variant, string> = {
  up: "translate-y-0 opacity-100",
  down: "translate-y-0 opacity-100",
  left: "translate-x-0 opacity-100",
  right: "translate-x-0 opacity-100",
  scale: "scale-100 opacity-100",
  blur: "translate-y-0 opacity-100 blur-0",
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-transform",
        visible ? shown[variant] : hidden[variant],
        className
      )}
      style={{
        transitionDuration: "900ms",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}
