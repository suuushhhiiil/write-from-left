import { useEffect, useState } from "react";
import { createPostComment, listPostComments } from "../../services/blog.service";
import { formatBlogDate } from "../../utils/blog.utils";

const inputClassName =
  "w-full rounded-lg border border-secondary bg-light px-4 py-3 text-sm text-dark outline-none transition-colors duration-300 placeholder:text-dark-accent/70 focus:border-primary";

const emptyForm = { authorName: "", email: "", body: "" };

const CommentSection = ({ slug }) => {
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const items = await listPostComments(slug);
        if (!cancelled) setComments(Array.isArray(items) ? items : []);
      } catch {
        if (!cancelled) setLoadError("Could not load comments.");
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");
    setIsSubmitting(true);

    try {
      await createPostComment(slug, {
        authorName: form.authorName.trim(),
        email: form.email.trim(),
        body: form.body.trim(),
      });
      setForm(emptyForm);
      setStatus("Held for review. It will appear once it is approved.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not send this comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-16 border-t border-secondary pt-12">
      <h2 className="font-display text-3xl font-semibold">Comments</h2>

      {loadError && <p className="mt-4 text-sm text-primary">{loadError}</p>}

      {loaded && !loadError && comments.length === 0 && (
        <p className="mt-4 text-lg font-light text-dark-accent">No comments yet.</p>
      )}

      {comments.length > 0 && (
        <ul className="mt-6 flex flex-col gap-6">
          {comments.map((comment) => (
            <li key={comment.id} className="border-b border-secondary pb-6 last:border-b-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">{comment.authorName}</p>
                {comment.createdAt && (
                  <p className="text-xs font-medium tracking-widest text-accent uppercase">
                    {formatBlogDate(comment.createdAt)}
                  </p>
                )}
              </div>
              <p className="mt-2 text-lg font-light leading-relaxed whitespace-pre-wrap">
                {comment.body}
              </p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
        <h3 className="font-display text-2xl font-semibold">Leave a comment</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
            Name
            <input
              name="authorName"
              value={form.authorName}
              onChange={handleChange}
              maxLength={80}
              required
              autoComplete="name"
              className={`${inputClassName} font-normal tracking-normal normal-case`}
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className={`${inputClassName} font-normal tracking-normal normal-case`}
            />
          </label>
        </div>
        <label className="flex flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
          Comment
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            rows={5}
            maxLength={2000}
            required
            className={`${inputClassName} font-normal tracking-normal normal-case`}
          />
        </label>
        <p className="text-sm font-light text-dark-accent">
          Your email stays private. Comments appear after they are approved.
        </p>
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
          {isSubmitting ? "Sending..." : "Send comment"}
        </button>
        {status && <p className="text-sm text-dark-accent">{status}</p>}
        {error && <p className="text-sm text-primary">{error}</p>}
      </form>
    </section>
  );
};

export default CommentSection;
