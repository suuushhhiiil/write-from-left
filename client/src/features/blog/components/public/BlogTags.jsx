const BlogTags = ({ tags = [] }) => {
  if (!tags.length) return null;

  return (
    <div className="mt-1 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-secondary bg-secondary/70 px-3 py-1 text-[10px] font-medium tracking-widest text-dark-accent uppercase"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default BlogTags;
