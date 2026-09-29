import OptimizedImage from "@/components/common/OptimizedImage";

const BlogCover = ({ blog, className = "", priority = false }) => {
  const url = blog?.cover?.url;
  const title = blog?.title || "Blog cover";

  if (url) {
    return (
      <OptimizedImage
        src={url}
        alt={title}
        priority={priority}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-end bg-linear-to-br from-secondary via-secondary to-background p-6 ${className}`}
    >
      <span className="font-display text-5xl leading-none text-accent/50">Aa</span>
    </div>
  );
};

export default BlogCover;
