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
      className="fixed bottom-5 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:bg-[#1ebe57] sm:bottom-6 sm:right-6"
      aria-label="Chat on WhatsApp"
      title="WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M19.11 17.53c-.28-.14-1.64-.81-1.89-.9-.25-.09-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.46h-.53c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.29s.98 2.65 1.12 2.83c.14.18 1.93 2.95 4.67 4.14.65.28 1.16.45 1.56.57.65.21 1.25.18 1.72.11.52-.08 1.64-.67 1.87-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
        <path d="M16.02 3C9.39 3 4 8.39 4 15.02c0 2.12.55 4.19 1.61 6.02L4 29l8.14-1.57c1.76.96 3.74 1.47 5.76 1.47h.01c6.63 0 12.02-5.39 12.02-12.02C29.93 8.39 24.65 3 16.02 3zm0 21.87h-.01c-1.78 0-3.52-.48-5.04-1.38l-.36-.21-4.83.93.99-4.71-.24-.38a9.86 9.86 0 01-1.51-5.22c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 012.9 7c0 5.46-4.44 9.9-9.9 9.9z" />
      </svg>
    </a>
  );
}
