import { useEffect, useMemo, useRef, useState } from "react";
import blogsContent from "../content/blogs.js";
import { listPublishedBlogs } from "../services/blog.service";
import {
  collectPublishedTags,
  filterPublishedBlogs,
} from "../utils/blog.utils";
import BlogCard from "../components/public/BlogCard";
import BlogFilters from "../components/public/BlogFilters";
import FeaturedBlogCard from "../components/public/FeaturedBlogCard";
import useBlogsMotion from "../hooks/useBlogsMotion";
import { useHoldRouteLoader } from "@/components/common/Loader";

const BlogsPage = () => {
  const blogsRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useHoldRouteLoader(!loaded);
  useBlogsMotion(blogsRef);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const items = await listPublishedBlogs();
        if (!cancelled) setBlogs(Array.isArray(items) ? items : []);
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

  const tags = useMemo(() => collectPublishedTags(blogs), [blogs]);
  const filtered = useMemo(
    () => filterPublishedBlogs(blogs, { query, selectedTags }),
    [blogs, query, selectedTags],
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const filtersActive = Boolean(query.trim()) || selectedTags.length > 0;

  const handleToggleTag = (tag) => {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  };

  return (
    <section className="blogs lg:px-20 px-4 page-hero-offset pb-20 min-h-screen" ref={blogsRef}>
      <div className="blogs-hero-container lg:grid lg:grid-cols-12 flex flex-col items-start gap-6 lg:gap-8">
        <div className="lg:col-span-6 flex flex-col gap-2 overflow-hidden">
          <h1 className="variable-hero-text blogs-hero-title text-5xl font-semibold font-display py-2">
            {blogsContent.hero.title}
          </h1>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 flex flex-col lg:pt-3">
          <p className="text-2xl">{blogsContent.hero.heading}</p>
          <p className="text-2xl font-display italic text-accent leading-tight font-light">
            {blogsContent.hero.description}
          </p>
          <p className="leading-tight font-light mt-4">{blogsContent.hero.intro}</p>
        </div>
      </div>

      {error && <p className="mt-10 text-sm text-primary">{error}</p>}

      {loaded && blogs.length > 0 && (
        <BlogFilters
          query={query}
          onQueryChange={setQuery}
          tags={tags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
        />
      )}

      {loaded && blogs.length === 0 && !error && (
        <p className="mt-14 text-lg font-light text-dark-accent">No published posts yet.</p>
      )}

      {loaded && blogs.length > 0 && filtered.length === 0 && filtersActive && (
        <p className="mt-14 text-lg font-light text-dark-accent">No posts match.</p>
      )}

      {featured && (
        <div className="mt-14">
          <FeaturedBlogCard blog={featured} />
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-2">
          {rest.map((blog) => (
            <BlogCard key={blog.id || blog.slug} blog={blog} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogsPage;
