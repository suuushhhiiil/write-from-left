import { useEffect, useRef, useState } from "react";
import { Image } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const ImageUploadButton = ({ onFileSelected }) => {
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!error) return undefined;
    const timeout = window.setTimeout(() => setError(""), 4000);
    return () => window.clearTimeout(timeout);
  }, [error]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Image must be JPEG, PNG, JPG, or WEBP");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image must be smaller than 5MB");
      return;
    }

    setError("");
    onFileSelected(file);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleButtonClick}
        className="group relative cursor-pointer rounded p-2 text-md outline-none transition hover:bg-gray-200"
        aria-label="Upload image"
      >
        <Image size={20} strokeWidth={1.5} />
        <span className="absolute bottom-[125%] left-[50%] hidden translate-x-[-50%] rounded-md bg-gray-200 px-2 py-1 text-xs whitespace-nowrap text-gray-700 group-hover:block">
          Upload Image
        </span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg,image/png,image/jpg,image/webp"
      />
      {error && (
        <span className="absolute bottom-[125%] left-1/2 z-10 -translate-x-1/2 rounded-md bg-primary px-2 py-1 text-xs whitespace-nowrap text-light">
          {error}
        </span>
      )}
    </div>
  );
};

export default ImageUploadButton;
