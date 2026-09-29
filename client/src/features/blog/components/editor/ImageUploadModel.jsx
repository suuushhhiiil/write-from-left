import Modal from "@/components/common/Modal";

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const ImageUploadModel = ({
  file,
  previewUrl,
  width,
  height,
  alt,
  error,
  isUploading,
  progress,
  onAltChange,
  onCancel,
  onUpload,
}) => {
  return (
    <Modal className="max-w-2xl p-6">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold">Upload image</h2>
          <p className="mt-1 text-sm text-dark-accent">
            Preview the file, add alt text, then upload to Cloudinary.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-secondary bg-secondary/40">
          <img
            src={previewUrl}
            alt={alt || "Preview"}
            className="mx-auto max-h-72 w-full object-contain"
          />
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs tracking-wider text-dark-accent uppercase">File name</dt>
            <dd className="mt-1 break-all">{file.name}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-wider text-dark-accent uppercase">Type</dt>
            <dd className="mt-1">{file.type || "Unknown"}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-wider text-dark-accent uppercase">Size</dt>
            <dd className="mt-1">{formatBytes(file.size)}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-wider text-dark-accent uppercase">Dimensions</dt>
            <dd className="mt-1">
              {width && height ? `${width} × ${height}px` : "Reading..."}
            </dd>
          </div>
        </dl>

        <label className="flex flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
          Alt text
          <input
            value={alt}
            onChange={(event) => onAltChange(event.target.value)}
            placeholder="Describe the image"
            className="rounded-lg border border-secondary bg-background px-4 py-3 text-sm font-normal tracking-normal text-dark outline-none focus:border-primary"
          />
        </label>

        {isUploading && (
          <div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-dark-accent">Uploading {progress}%</p>
          </div>
        )}

        {error && <p className="text-sm text-primary">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isUploading}
            className="rounded-md border border-secondary px-4 py-2 text-sm hover:bg-secondary disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onUpload}
            disabled={isUploading}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploadModel;
