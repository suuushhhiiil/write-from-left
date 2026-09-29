import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import { sendContactMail } from "../mail/mail.service.js";

const requiredFields = ["name", "email", "outreachReason", "timeline", "message"];

export const submitContact = async (req, res) => {
  const payload = {};

  for (const field of requiredFields) {
    const value = String(req.body?.[field] || "").trim();
    if (!value) {
      throw new APIError(400, `${field} is required`);
    }
    payload[field] = value;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(payload.email)) {
    throw new APIError(400, "A valid email is required");
  }

  await sendContactMail(payload);

  return res.status(200).json(new APIResponse(200, "Message sent", null));
};
