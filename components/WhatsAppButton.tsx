import { contactDetails } from "@/lib/contact";

export default function WhatsAppButton() {
  return (
    <a
      href={contactDetails.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-105 hover:bg-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2340] sm:right-6 sm:bottom-6"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-7 w-7"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.36-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.898 6.994c-.003 5.45-4.437 9.884-9.887 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05.06C5.495.06.16 5.395.157 11.95c-.001 2.096.547 4.142 1.592 5.945L0 24l6.268-1.645a11.882 11.882 0 0 0 5.703 1.448h.005c6.554 0 11.889-5.335 11.892-11.89a11.82 11.82 0 0 0-3.465-8.424" />
      </svg>
    </a>
  );
}
