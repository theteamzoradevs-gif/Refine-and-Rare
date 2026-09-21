import { Resend } from "resend";

export async function sendEnquiryEmail(input: {
  name: string;
  phone: string;
  email: string;
  message: string;
  serviceTitle?: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("RESEND_API_KEY not set — skipping email send.");
    return { skipped: true as const };
  }

  const resend = new Resend(apiKey);
  const to = process.env.ENQUIRY_TO_EMAIL || "rajasharma9226@gmail.com";
  const from =
    process.env.ENQUIRY_FROM_EMAIL ||
    "Refine & Rare <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `New enquiry from ${input.name}`,
    html: `
      <h2>New website enquiry</h2>
      <p><strong>Name:</strong> ${input.name}</p>
      <p><strong>Phone:</strong> ${input.phone}</p>
      <p><strong>Email:</strong> ${input.email}</p>
      <p><strong>Service:</strong> ${input.serviceTitle || "General"}</p>
      <p><strong>Message:</strong></p>
      <p>${input.message.replace(/\n/g, "<br/>")}</p>
    `,
  });

  return { skipped: false as const };
}
