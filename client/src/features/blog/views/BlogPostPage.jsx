import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPublishedBlog, listPublishedBlogs } from "../services/blog.service";
import { formatBlogDate, readingTimeLabel, relatedBlogs } from "../utils/blog.utils";
import BlogCover from "../components/public/BlogCover";
import BlogTags from "../components/public/BlogTags";
import CommentSection from "../components/public/CommentSection";
import RelatedPosts from "../components/public/RelatedPosts";
import SharePost from "../components/public/SharePost";
import { useHoldRouteLoader } from "@/components/common/Loader";

const BlogPostPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState("loading");
  const [loadedSlug, setLoadedSlug] = useState(slug);

  if (loadedSlug !== slug) {
    setLoadedSlug(slug);
    setBlog(null);
    setRelated([]);
    setStatus("loading");
  }

  useHoldRouteLoader(status === "loading");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [post, published] = await Promise.all([
          getPublishedBlog(slug),
          listPublishedBlogs().catch(() => []),
        ]);
        if (cancelled) return;
        setBlog(post);
        setRelated(relatedBlogs(published, post));
        setStatus("ready");
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

  const meta = [formatBlogDate(blog.publishedAt), readingTimeLabel(blog.contentHtml)]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="lg:px-20 px-4 page-hero-offset pb-24">
      <Link
        to="/blogs"
        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark"
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Back to blogs
      </Link>

      <div className="mx-auto mt-8 max-w-3xl">
        {blog.cover?.url && (
          <div className="aspect-video overflow-hidden rounded-2xl bg-secondary">
            <BlogCover blog={blog} priority />
          </div>
        )}

        <header className="mt-8 flex flex-col gap-4">
          {meta && (
            <p className="text-xs font-medium tracking-widest text-accent uppercase">{meta}</p>
          )}
          <h1 className="font-display text-4xl font-semibold leading-tight lg:text-6xl">
            {blog.title}
          </h1>
          {blog.excerpt && (
            <p className="text-xl leading-snug font-light text-dark-accent">{blog.excerpt}</p>
          )}
          <BlogTags tags={blog.tags} />
          <SharePost title={blog.title} />
        </header>

        {blog.contentHtml ? (
          <div
            className="blog-article mt-10"
            dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
          />
        ) : (
          <p className="mt-10 text-lg font-light text-dark-accent">This post has no content yet.</p>
        )}

        <CommentSection slug={blog.slug} />
      </div>

      <RelatedPosts blogs={related} />
    </article>
  );
};

export default BlogPostPage;
