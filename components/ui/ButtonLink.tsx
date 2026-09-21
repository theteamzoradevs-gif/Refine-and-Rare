import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold" | "outline";
  className?: string;
};

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  gold: "btn-gold",
  outline: "btn-outline",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: Props) {
  return (
    <Link href={href} className={cn(variants[variant], className)}>
      {children}
    </Link>
  );
}
