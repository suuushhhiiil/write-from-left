const BlogFilters = ({
  query,
  onQueryChange,
  tags,
  selectedTags,
  onToggleTag,
}) => (
  <div className="mt-10 flex flex-col gap-4">
    <label className="sr-only" htmlFor="blog-search">
      Search posts
    </label>
    <input
      id="blog-search"
      type="search"
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
      placeholder="Search posts"
      className="w-full rounded-xl border border-secondary bg-background px-4 py-3 text-sm outline-none focus:border-primary"
    />

    {tags.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const selected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onToggleTag(tag)}
              aria-pressed={selected}
              className={`rounded-full border px-3 py-1 text-[10px] font-medium tracking-widest uppercase transition-colors duration-300 ${
                selected
                  ? "border-primary bg-primary text-light"
                  : "border-secondary bg-secondary/70 text-dark-accent hover:border-primary hover:text-primary"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    )}
  </div>
);

export default BlogFilters;
