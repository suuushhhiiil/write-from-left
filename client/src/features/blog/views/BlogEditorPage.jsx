import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogEditor from "../components/editor/BlogEditor";
import { createBlog, getBlog, updateBlog } from "../services/blog.service";
import { slugify } from "../utils/blog.utils";
import {
  destroyCloudinaryAsset,
  getUploadSignature,
  uploadSignedImage,
} from "@/services/media/media.api";

const emptyDoc = { type: "doc", content: [] };

const BlogEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [status, setStatus] = useState("draft");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [cover, setCover] = useState({ url: "", publicId: "" });
  const [savedCoverPublicId, setSavedCoverPublicId] = useState("");
  const [initialContent, setInitialContent] = useState(emptyDoc);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return undefined;

    let cancelled = false;

    const load = async () => {
      try {
        const blog = await getBlog(id);
        if (cancelled || !blog) return;
        setTitle(blog.title || "");
        setSlug(blog.slug || "");
        setSlugTouched(true);
        setStatus(blog.status || "draft");
        setExcerpt(blog.excerpt || "");
        setTags((blog.tags || []).join(", "));
        setCover(blog.cover || { url: "", publicId: "" });
        setSavedCoverPublicId(blog.cover?.publicId || "");
        setInitialContent(blog.content || emptyDoc);
      } catch {
        if (!cancelled) setError("Could not load this post.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleTitleChange = (value) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const handleCoverUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setIsUploadingCover(true);
    setError("");

    try {
      const signature = await getUploadSignature();
      const uploaded = await uploadSignedImage(file, signature);
      if (cover.publicId && cover.publicId !== savedCoverPublicId) {
        await destroyCloudinaryAsset(cover.publicId).catch(() => {});
      }
      setCover({ url: uploaded.url, publicId: uploaded.publicId });
    } catch {
      setError("Cover upload failed.");
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleRemoveCover = async () => {
    if (cover.publicId && cover.publicId !== savedCoverPublicId) {
      await destroyCloudinaryAsset(cover.publicId).catch(() => {});
    }
    setCover({ url: "", publicId: "" });
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setIsSaving(true);
    setError("");
    setMessage("");

    const payload = {
      title: title.trim(),
      slug,
      status,
      excerpt,
      tags,
      cover,
      content: editorRef.current?.getJSON() ?? emptyDoc,
      contentHtml: editorRef.current?.getHTML() ?? "",
    };

    try {
      if (id) {
        const saved = await updateBlog(id, payload);
        setSavedCoverPublicId(saved.cover?.publicId || "");
        setSlug(saved.slug);
        editorRef.current?.markSaved();
        setMessage("Post saved.");
      } else {
        const saved = await createBlog(payload);
        editorRef.current?.markSaved();
        navigate(`/admin/blogs/${saved.id}/edit`, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not save this post.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p className="p-8 text-dark-accent">Loading editor...</p>;
  }

  return (
    <section className="flex min-h-screen flex-col gap-6 bg-gray-100 p-4 lg:p-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-2xl border border-secondary bg-light p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <label className="flex min-w-0 flex-1 flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
            Title
            <input
              value={title}
              onChange={(event) => handleTitleChange(event.target.value)}
              placeholder="Post title"
              className="rounded-lg border border-secondary bg-background px-4 py-3 text-sm font-normal tracking-normal text-dark outline-none focus:border-primary"
            />
          </label>
          <label className="flex min-w-0 flex-1 flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
            Slug
            <input
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              placeholder="post-url-slug"
              className="rounded-lg border border-secondary bg-background px-4 py-3 text-sm font-normal tracking-normal text-dark outline-none focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
            Status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="rounded-lg border border-secondary bg-background px-4 py-3 text-sm font-normal tracking-normal text-dark outline-none focus:border-primary"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
          Excerpt
          <textarea
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            rows={3}
            placeholder="Short summary"
            className="rounded-lg border border-secondary bg-background px-4 py-3 text-sm font-normal tracking-normal text-dark outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
          Tags
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="writing, projects, strategy"
            className="rounded-lg border border-secondary bg-background px-4 py-3 text-sm font-normal tracking-normal text-dark outline-none focus:border-primary"
          />
        </label>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium tracking-wider text-dark-accent uppercase">
            Cover image
          </p>
          {cover.url && (
            <img
              src={cover.url}
              alt="Cover preview"
              className="max-h-56 w-full rounded-xl object-cover"
            />
          )}
          <div className="flex flex-wrap gap-2">
            <label className="btn-secondary cursor-pointer">
              {isUploadingCover ? "Uploading..." : "Upload cover"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                className="hidden"
                onChange={handleCoverUpload}
                disabled={isUploadingCover}
              />
            </label>
            {cover.url && (
              <button
                type="button"
                onClick={handleRemoveCover}
                className="rounded-md border border-primary px-4 py-2 text-sm text-primary"
              >
                Remove cover
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          {message && <p className="text-sm text-dark-accent">{message}</p>}
          {error && <p className="text-sm text-primary">{error}</p>}
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <BlogEditor ref={editorRef} contentKey={id || "new"} initialContent={initialContent} />
      </div>
    </section>
  );
};

export default BlogEditorPage;
