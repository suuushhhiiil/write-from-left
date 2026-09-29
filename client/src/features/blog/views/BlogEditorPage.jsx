import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogEditor from "../components/editor/BlogEditor";
import { getBlog } from "../services/blog.service";

const BlogEditorPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("draft");

  useEffect(() => {
    if (!id) return undefined;
    let cancelled = false;

    const load = async () => {
      const blog = await getBlog(id);
      if (cancelled || !blog) return;
      setTitle(blog.title);
      setStatus(blog.status);
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <section className="flex min-h-screen flex-col gap-6 bg-gray-100 p-4 lg:p-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-2xl border border-secondary bg-light p-4 lg:flex-row lg:items-end">
        <label className="flex min-w-0 flex-1 flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Post title"
            className="rounded-lg border border-secondary bg-background px-4 py-3 text-sm text-dark outline-none focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
          Status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-lg border border-secondary bg-background px-4 py-3 text-sm text-dark outline-none focus:border-primary"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <p className="text-xs text-dark-accent lg:max-w-48">
          Document save is not wired yet. Images still upload to Cloudinary.
        </p>
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <BlogEditor />
      </div>
    </section>
  );
};

export default BlogEditorPage;
