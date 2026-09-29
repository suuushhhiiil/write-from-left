import { v2 as cloudinary } from "cloudinary";

export const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
};

export const collectImagePublicIds = (node) => {
  const ids = [];

  const walk = (current) => {
    if (!current) return;
    if (current.type === "image" && current.attrs?.publicId) {
      ids.push(current.attrs.publicId);
    }
    if (Array.isArray(current.content)) {
      current.content.forEach(walk);
    }
  };

  walk(node);
  return [...new Set(ids)];
};

export const destroyImages = async (publicIds = []) => {
  const ids = [...new Set(publicIds.filter(Boolean))];
  if (ids.length === 0) return;

  configureCloudinary();

  await Promise.all(
    ids.map(async (publicId) => {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error(`Failed to destroy Cloudinary asset ${publicId}`, error);
      }
    }),
  );
};
