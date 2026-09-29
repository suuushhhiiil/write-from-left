const Loader = ({ label = "Loading..." }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-dark-accent">
      {label}
    </div>
  );
};

export default Loader;
