import BlogCard from "./BlogCard";

const RelatedPosts = ({ blogs = [] }) => {
  if (!blogs.length) return null;

  return (
    <section className="mx-auto mt-20 max-w-6xl border-t border-secondary pt-12">
      <h2 className="font-display text-3xl font-semibold">More to read</h2>
      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.id || blog.slug} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
