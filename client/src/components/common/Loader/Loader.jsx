const Loader = ({ label = "Loading...", progress = null }) => {
  if (progress) {
    return (
      <div
        className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-3 bg-background text-dark-accent"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress.percent}
        aria-label="Loading page images"
      >
        <p className="font-display text-5xl font-semibold tabular-nums">{progress.percent}%</p>
        <p className="tabular-nums">
          {progress.loaded} / {progress.total}
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background text-dark-accent"
      role="status"
    >
      {label}
    </div>
  );
};

export default Loader;
