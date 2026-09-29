import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { formatBlogDate } from "../../utils/blog.utils";
import BlogCover from "./BlogCover";
import BlogTags from "./BlogTags";

const FeaturedBlogCard = ({ blog }) => (
  <article className="group">
    <Link
      to={`/blogs/${blog.slug}`}
      className="grid grid-cols-1 gap-6 text-left lg:grid-cols-12 lg:items-center lg:gap-10"
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-secondary lg:col-span-7">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <BlogCover blog={blog} priority />
        </div>
        <span className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-background text-primary shadow-sm transition-colors duration-300 group-hover:bg-primary group-hover:text-light">
          <ArrowUpRight size={16} strokeWidth={2} />
        </span>
      </div>

      <div className="flex flex-col gap-3 lg:col-span-5">
        {blog.publishedAt && (
          <p className="text-xs font-medium tracking-widest text-accent uppercase">
            {formatBlogDate(blog.publishedAt)}
          </p>
        )}
        <h2 className="text-3xl leading-tight font-bold lg:text-4xl">{blog.title}</h2>
        {blog.excerpt && (
          <p className="text-lg leading-tight font-light text-dark-accent">{blog.excerpt}</p>
        )}
        <BlogTags tags={blog.tags} />
      </div>
    </Link>
  </article>
);

export default FeaturedBlogCard;
