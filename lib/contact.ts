export const contactDetails = {
  email: "primatechsolutions61@gmail.com",
  emailHref: "mailto:primatechsolutions61@gmail.com",
  phoneDisplay: "03285386067",
  phoneHref: "tel:+923285386067",
  whatsappNumber: "923285386067",
  whatsappHref: "https://wa.me/923285386067",
  ptclDisplay: "051-5120035",
  ptclHref: "tel:+92515120035",
  officeAddress: "Waqar Center, Opposite Poonch House, 1st Floor, Saddar, Rawalpindi",
} as const;

export function buildWhatsAppUrl(message?: string) {
  const whatsappUrl = new URL(contactDetails.whatsappHref);

  if (message) {
    whatsappUrl.searchParams.set("text", message);
  }

  return whatsappUrl.toString();
}
