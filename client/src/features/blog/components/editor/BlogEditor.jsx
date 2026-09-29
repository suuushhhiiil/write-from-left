import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { editorExtensions } from "@/lib/tiptap";
import EditorToolbar from "./EditorToolbar";
import ImageUploadModel from "./ImageUploadModel";
import { collectImagePublicIds } from "../../utils/blog.utils";
import {
  destroyCloudinaryAsset,
  getUploadSignature,
  uploadSignedImage,
} from "@/services/media/media.api";

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

const BlogEditor = forwardRef(({ initialContent, contentKey }, ref) => {
  const [upload, setUpload] = useState(null);
  const sessionPublicIds = useRef(new Set());
  const lastDocIds = useRef([]);

  const editor = useEditor({
    extensions: editorExtensions,
    content: initialContent || "",
    editorProps: {
      attributes: {
        class: "tiptap bg-white border border-gray-300 rounded-lg p-4 lg:p-18",
      },
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      getJSON: () => editor?.getJSON() ?? { type: "doc", content: [] },
      getHTML: () => editor?.getHTML() ?? "",
      markSaved: () => {
        if (!editor) return;
        sessionPublicIds.current.clear();
        lastDocIds.current = collectImagePublicIds(editor.getJSON());
      },
    }),
    [editor],
  );

  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(initialContent || "");
    lastDocIds.current = collectImagePublicIds(initialContent);
    sessionPublicIds.current.clear();
  }, [editor, contentKey, initialContent]);

  useEffect(() => {
    if (!editor) return undefined;

    const onUpdate = () => {
      const currentIds = collectImagePublicIds(editor.getJSON());
      const removed = lastDocIds.current.filter((id) => !currentIds.includes(id));
      lastDocIds.current = currentIds;

      removed.forEach((publicId) => {
        if (!sessionPublicIds.current.has(publicId)) return;
        sessionPublicIds.current.delete(publicId);
        void destroyCloudinaryAsset(publicId).catch((error) => {
          console.error("Failed to destroy unsaved image", error);
        });
      });
    };

    editor.on("update", onUpdate);
    return () => editor.off("update", onUpdate);
  }, [editor]);

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
      current ? { ...current, isUploading: true, progress: 0, error: "" } : current,
    );

    try {
      const signature = await getUploadSignature();
      const uploaded = await uploadSignedImage(upload.file, signature, (progress) => {
        setUpload((current) => (current ? { ...current, progress } : current));
      });

      sessionPublicIds.current.add(uploaded.publicId);

      editor
        .chain()
        .focus()
        .setImage({
          src: uploaded.url,
          alt: upload.alt || upload.file.name,
          width: uploaded.width,
          height: uploaded.height,
          publicId: uploaded.publicId,
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
    <div className="relative w-full">
      <div className="relative pb-20">
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
      <div className="sticky bottom-4 z-100 -mt-16 flex justify-center px-4">
        <div className="w-full lg:w-fit">
          <EditorToolbar editor={editor} onFileSelected={handleFileSelected} />
        </div>
      </div>
    </div>
  );
});

BlogEditor.displayName = "BlogEditor";

export default BlogEditor;
