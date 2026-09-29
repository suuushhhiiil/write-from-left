import { v2 as cloudinary } from "cloudinary";
import { APIResponse } from "../../utils/APIResponse.js";
import APIError from "../../utils/APIError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createSignature = async (req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = process.env.CLOUDINARY_FOLDER || "write-from-left/blogs";

  if (!cloudName || !apiKey || !apiSecret) {
    throw new APIError(500, "Cloudinary is not configured");
  }

  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    apiSecret,
  );

  return res.status(200).json(
    new APIResponse(200, "Upload signature created", {
      timestamp,
      signature,
      apiKey,
      cloudName,
      folder,
    }),
  );
};
