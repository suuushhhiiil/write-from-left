import { useCallback, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { editorExtensions } from "@/lib/tiptap";
import EditorToolbar from "./EditorToolbar";
import ImageUploadModel from "./ImageUploadModel";
import { getUploadSignature, uploadSignedImage } from "@/services/media/media.api";

const readFileDetails = (file) =>
  new Promise((resolve, reject) => {
    const previewUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      resolve({
        previewUrl,
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(previewUrl);
      reject(new Error("Could not read image dimensions"));
    };

    image.src = previewUrl;
  });

const BlogEditor = () => {
  const [upload, setUpload] = useState(null);

  const editor = useEditor({
    extensions: editorExtensions,
    content: "",
    editorProps: {
      attributes: {
        class:
          "tiptap bg-white border border-gray-300 rounded-lg p-4 lg:p-18",
      },
    },
  });

  const clearUpload = useCallback(() => {
    setUpload((current) => {
      if (current?.previewUrl) {
        URL.revokeObjectURL(current.previewUrl);
      }
      return null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (upload?.previewUrl) {
        URL.revokeObjectURL(upload.previewUrl);
      }
    };
  }, [upload?.previewUrl]);

  const handleFileSelected = async (file) => {
    try {
      const details = await readFileDetails(file);
      setUpload({
        file,
        alt: "",
        error: "",
        isUploading: false,
        progress: 0,
        ...details,
      });
    } catch (error) {
      setUpload({
        file,
        previewUrl: URL.createObjectURL(file),
        width: null,
        height: null,
        alt: "",
        isUploading: false,
        progress: 0,
        error: error.message,
      });
    }
  };

  const handleUpload = async () => {
    if (!upload?.file || !editor) return;

    setUpload((current) =>
      current
        ? { ...current, isUploading: true, progress: 0, error: "" }
        : current,
    );

    try {
      const signature = await getUploadSignature();
      const uploaded = await uploadSignedImage(
        upload.file,
        signature,
        (progress) => {
          setUpload((current) =>
            current ? { ...current, progress } : current,
          );
        },
      );

      editor
        .chain()
        .focus()
        .setImage({
          src: uploaded.url,
          alt: upload.alt || upload.file.name,
          width: uploaded.width,
          height: uploaded.height,
        })
        .run();

      clearUpload();
    } catch (error) {
      setUpload((current) =>
        current
          ? {
              ...current,
              isUploading: false,
              error:
                error.response?.data?.message ||
                error.message ||
                "Upload failed. Try again.",
            }
          : current,
      );
    }
  };

  if (!editor) return null;

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden">
      <div className="fixed bottom-4 left-[50%] z-100 w-full translate-x-[-50%] rounded-lg px-8 lg:bottom-12 lg:w-fit lg:px-0">
        <EditorToolbar editor={editor} onFileSelected={handleFileSelected} />
      </div>
      <div className="relative w-full">
        <EditorContent editor={editor} />
        {upload && (
          <ImageUploadModel
            file={upload.file}
            previewUrl={upload.previewUrl}
            width={upload.width}
            height={upload.height}
            alt={upload.alt}
            error={upload.error}
            isUploading={upload.isUploading}
            progress={upload.progress}
            onAltChange={(alt) =>
              setUpload((current) => (current ? { ...current, alt } : current))
            }
            onCancel={clearUpload}
            onUpload={handleUpload}
          />
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
