import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPublishedBlog } from "../services/blog.service";
import { formatBlogDate } from "../utils/blog.utils";
import BlogCover from "../components/public/BlogCover";
import BlogTags from "../components/public/BlogTags";
import { useHoldRouteLoader } from "@/components/common/Loader";

const BlogPostPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [status, setStatus] = useState("loading");
  const [loadedSlug, setLoadedSlug] = useState(slug);

  if (loadedSlug !== slug) {
    setLoadedSlug(slug);
    setBlog(null);
    setStatus("loading");
  }

  useHoldRouteLoader(status === "loading");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const post = await getPublishedBlog(slug);
        if (!cancelled) {
          setBlog(post);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("notfound");
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === "loading") {
    return (
      <section className="lg:px-20 px-4 page-hero-offset pb-20">
        <p className="text-lg font-light text-dark-accent">Loading post…</p>
      </section>
    );
  }

  if (status === "notfound" || !blog) {
    return (
      <section className="lg:px-20 px-4 page-hero-offset pb-20">
        <p className="text-lg font-light text-dark-accent">This post could not be found.</p>
        <Link
          to="/blogs"
          className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Back to blogs
        </Link>
      </section>
    );
  }

  return (
    <article className="lg:px-20 px-4 page-hero-offset pb-20">
      <Link
        to="/blogs"
        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark"
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Back to blogs
      </Link>

      <div className="mt-8 max-w-4xl">
        {blog.cover?.url && (
          <div className="aspect-video overflow-hidden rounded-2xl bg-secondary">
            <BlogCover blog={blog} priority />
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          {blog.publishedAt && (
            <p className="text-xs font-medium tracking-widest text-accent uppercase">
              {formatBlogDate(blog.publishedAt)}
            </p>
          )}
          <h1 className="font-display text-4xl font-semibold leading-tight lg:text-6xl">
            {blog.title}
          </h1>
          <BlogTags tags={blog.tags} />
        </div>

        {blog.contentHtml ? (
          <div
            className="blog-content tiptap mt-10"
            dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
          />
        ) : (
          <p className="mt-10 text-lg font-light text-dark-accent">This post has no content yet.</p>
        )}
      </div>
    </article>
  );
};

export default BlogPostPage;
