import { transporter } from "../config/mailer.js";

export async function sendEmail({ to, subject, text, html }) {
  return transporter.sendMail({
    from: '"Subscription Tracker" muhammaduzairali3@gmail.com',
    to,
    subject,
    text,
    html
  });
}