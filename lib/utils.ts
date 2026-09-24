type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: boolean | null | undefined };

function toClass(input: ClassValue): string {
  if (!input) return "";
  if (typeof input === "string" || typeof input === "number") return String(input);
  if (Array.isArray(input)) return input.map(toClass).filter(Boolean).join(" ");
  if (typeof input === "object") {
    return Object.entries(input)
      .filter(([, on]) => Boolean(on))
      .map(([key]) => key)
      .join(" ");
  }
  return "";
}

export function cn(...inputs: ClassValue[]) {
  return inputs.map(toClass).filter(Boolean).join(" ");
}
