const Modal = ({ children, className = "" }) => {
  return (
    <div className="absolute inset-0 z-[200] flex items-center justify-center bg-dark/50 p-4">
      <div
        className={`max-h-full w-full overflow-auto rounded-2xl bg-background shadow-2xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
