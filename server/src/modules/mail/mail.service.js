import nodemailer from "nodemailer";
import APIError from "../../utils/APIError.js";

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new APIError(500, "Mail is not configured");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
    auth: { user, pass },
  });
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const sendContactMail = async ({
  name,
  email,
  outreachReason,
  timeline,
  message,
}) => {
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;

  if (!from || !to) {
    throw new APIError(500, "Mail is not configured");
  }

  const transporter = getTransporter();
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Reaching out about: ${outreachReason}`,
    `Timeline: ${timeline}`,
    "",
    message,
  ].join("\n");

  await transporter.sendMail({
    from,
    to,
    replyTo: email,
    subject: `Message from ${name}`,
    text,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Reaching out about:</strong> ${escapeHtml(outreachReason)}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>
      <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
    `,
  });
};
