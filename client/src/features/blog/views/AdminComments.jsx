import { useEffect, useState } from "react";
import { deleteComment, listComments, setCommentStatus } from "../services/blog.service";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const loadComments = async () => {
    const items = await listComments();
    setComments(items);
    setLoaded(true);
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const items = await listComments();
        if (!cancelled) setComments(items);
      } catch {
        if (!cancelled) setError("Could not load comments.");
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setError("");
      await setCommentStatus(id, status);
      await loadComments();
    } catch {
      setError("Could not update this comment.");
    }
  };

  const handleDelete = async (comment) => {
    const confirmed = window.confirm(`Delete comment from ${comment.authorName}?`);
    if (!confirmed) return;
    try {
      setError("");
      await deleteComment(comment.id);
      await loadComments();
    } catch {
      setError("Could not delete this comment.");
    }
  };

  return (
    <section className="p-6 lg:p-10">
      <h1 className="font-display text-3xl font-semibold">Comments</h1>
      <p className="mt-2 text-dark-accent">Approve, reject, or remove comments.</p>
      {error && <p className="mt-4 text-sm text-primary">{error}</p>}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-secondary bg-light">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-secondary text-xs tracking-wider text-dark-accent uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Author</th>
              <th className="px-4 py-3 font-medium">Snippet</th>
              <th className="px-4 py-3 font-medium">Blog</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id} className="border-b border-secondary last:border-b-0">
                <td className="px-4 py-4">
                  <p className="font-medium">{comment.authorName}</p>
                  <p className="text-xs text-dark-accent">{comment.email}</p>
                </td>
                <td className="max-w-xs px-4 py-4 text-dark-accent">
                  <p className="line-clamp-3">{comment.body}</p>
                </td>
                <td className="px-4 py-4">{comment.blogTitle}</td>
                <td className="px-4 py-4 text-dark-accent">{formatDate(comment.createdAt)}</td>
                <td className="px-4 py-4 capitalize">{comment.status}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {comment.status !== "approved" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(comment.id, "approved")}
                        className="rounded-md border border-secondary px-3 py-1 text-xs hover:bg-secondary"
                      >
                        Approve
                      </button>
                    )}
                    {comment.status !== "rejected" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(comment.id, "rejected")}
                        className="rounded-md border border-secondary px-3 py-1 text-xs hover:bg-secondary"
                      >
                        Reject
                      </button>
                    )}
                    {comment.status !== "pending" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(comment.id, "pending")}
                        className="rounded-md border border-secondary px-3 py-1 text-xs hover:bg-secondary"
                      >
                        Unapprove
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(comment)}
                      className="rounded-md border border-primary px-3 py-1 text-xs text-primary hover:bg-primary hover:text-light"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {loaded && comments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-dark-accent">
                  No comments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminComments;
