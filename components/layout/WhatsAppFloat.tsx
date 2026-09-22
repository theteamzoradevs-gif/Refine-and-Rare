import { whatsappUrl } from "@/lib/constants";

type Props = {
  whatsapp: string;
  message: string;
};

export function WhatsAppFloat({ whatsapp, message }: Props) {
  return (
    <a
      href={whatsappUrl(whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 z-40 block h-14 w-14 overflow-visible transition hover:scale-105 sm:bottom-6 sm:right-6"
      aria-label="Chat on WhatsApp"
      title="WhatsApp"
    >
      {/* Official WhatsApp brand mark — full glyph so the bubble tail isn’t clipped */}
      <svg
        viewBox="0 0 48 48"
        className="h-full w-full drop-shadow-md"
        aria-hidden
      >
        <circle cx="24" cy="24" r="24" fill="#25D366" />
        <path
          fill="#fff"
          d="M24.002 9.2c-8.04 0-14.56 6.52-14.56 14.56 0 2.56.68 5.06 1.96 7.26L9.2 38.8l7.98-2.14a14.5 14.5 0 0 0 6.82 1.7h.01c8.04 0 14.56-6.52 14.56-14.56 0-3.89-1.51-7.54-4.26-10.29A14.47 14.47 0 0 0 24 9.2zm0 26.55h-.01a12.05 12.05 0 0 1-6.14-1.68l-.44-.26-4.59.96.99-4.58-.28-.47a12.03 12.03 0 0 1-1.84-6.36c0-6.65 5.41-12.06 12.07-12.06 3.22 0 6.25 1.26 8.53 3.54a12.01 12.01 0 0 1 3.53 8.52c0 6.66-5.41 12.07-12.06 12.07zm6.62-9.04c-.36-.18-2.14-1.06-2.47-1.18-.33-.12-.57-.18-.81.18-.24.36-.93 1.18-1.14 1.42-.21.24-.42.27-.78.09-.36-.18-1.53-.56-2.91-1.79-1.08-.96-1.8-2.15-2.01-2.51-.21-.36-.02-.56.16-.74.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61h-.69c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 0 1.77 1.29 3.48 1.47 3.72.18.24 2.52 3.84 6.11 5.39.85.37 1.52.59 2.04.75.86.27 1.64.23 2.25.14.69-.1 2.14-.87 2.44-1.72.3-.85.3-1.58.21-1.73-.09-.15-.33-.24-.69-.42z"
        />
      </svg>
    </a>
  );
}
