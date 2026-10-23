import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteBlog, listBlogs, setPublishState } from "../services/blog.service";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const loadBlogs = async () => {
    const items = await listBlogs();
    setBlogs(items);
    setLoaded(true);
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const items = await listBlogs();
        if (!cancelled) setBlogs(items);
      } catch {
        if (!cancelled) setError("Could not load posts.");
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const handlePublishToggle = async (blog) => {
    const nextStatus = blog.status === "published" ? "draft" : "published";
    try {
      setError("");
      await setPublishState(blog.id, nextStatus);
      await loadBlogs();
    } catch {
      setError("Could not update this post.");
    }
  };

  const handleDelete = async (blog) => {
    const confirmed = window.confirm(`Delete “${blog.title}”? This cannot be undone.`);
    if (!confirmed) return;

    try {
      setError("");
      await deleteBlog(blog.id);
      await loadBlogs();
    } catch {
      setError("Could not delete this post.");
    }
  };

  return (
    <section className="p-6 lg:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Blogs</h1>
          <p className="mt-2 text-dark-accent">Edit, publish, or remove posts.</p>
        </div>
        <Link to="/admin/blogs/new" className="btn-primary">
          New post
        </Link>
      </div>

      {error && <p className="mt-4 text-sm text-primary">{error}</p>}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-secondary bg-light">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-secondary text-xs tracking-wider text-dark-accent uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b border-secondary last:border-b-0">
                <td className="px-4 py-4 font-medium">{blog.title}</td>
                <td className="px-4 py-4 capitalize">{blog.status}</td>
                <td className="px-4 py-4 text-dark-accent">{formatDate(blog.createdAt)}</td>
                <td className="px-4 py-4 text-dark-accent">{formatDate(blog.updatedAt)}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/admin/blogs/${blog.id}/edit`}
                      className="rounded-md border border-secondary px-3 py-1 text-xs hover:bg-secondary"
                    >
                      Edit
                    </Link>
                    {blog.status === "published" && (
                      <Link
                        to={`/blogs/${blog.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-secondary px-3 py-1 text-xs hover:bg-secondary"
                      >
                        Open
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => handlePublishToggle(blog)}
                      className="rounded-md border border-secondary px-3 py-1 text-xs hover:bg-secondary"
                    >
                      {blog.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(blog)}
                      className="rounded-md border border-primary px-3 py-1 text-xs text-primary hover:bg-primary hover:text-light"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {loaded && blogs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-dark-accent">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminBlogList;
