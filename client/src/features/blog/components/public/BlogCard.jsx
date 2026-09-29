import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { formatBlogDate } from "../../utils/blog.utils";
import BlogCover from "./BlogCover";
import BlogTags from "./BlogTags";

const BlogCard = ({ blog }) => (
  <article className="group flex flex-col gap-4">
    <Link to={`/blogs/${blog.slug}`} className="flex flex-col gap-4 text-left">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <BlogCover blog={blog} />
        </div>
        <span className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-background text-primary shadow-sm transition-colors duration-300 group-hover:bg-primary group-hover:text-light">
          <ArrowUpRight size={16} strokeWidth={2} />
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {blog.publishedAt && (
          <p className="text-xs font-medium tracking-widest text-accent uppercase">
            {formatBlogDate(blog.publishedAt)}
          </p>
        )}
        <h2 className="text-2xl leading-tight font-bold">{blog.title}</h2>
        {blog.excerpt && (
          <p className="text-lg leading-tight font-light text-dark-accent">{blog.excerpt}</p>
        )}
        <BlogTags tags={blog.tags} />
      </div>
    </Link>
  </article>
);

export default BlogCard;
