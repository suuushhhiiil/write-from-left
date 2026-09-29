import axios from "axios";
import api from "@/lib/axios";

const cloudinaryClient = axios.create();

export const getUploadSignature = async () => {
  const { data } = await api.post("/media/signature");
  return data.data;
};

export const uploadSignedImage = async (file, signaturePayload, onProgress) => {
  const { timestamp, signature, apiKey, cloudName, folder } = signaturePayload;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", folder);

  const { data } = await cloudinaryClient.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData,
    {
      onUploadProgress: (event) => {
        if (!onProgress || !event.total) return;
        onProgress(Math.round((event.loaded / event.total) * 100));
      },
    },
  );

  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
  };
};

export const destroyCloudinaryAsset = async (publicId) => {
  if (!publicId) return;
  await api.post("/media/destroy", { publicId });
};

