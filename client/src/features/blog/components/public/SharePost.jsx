import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";

const SharePost = ({ title }) => {
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const share = async () => {
    try {
      await navigator.share({ title, url: window.location.href });
    } catch (error) {
      if (error?.name === "AbortError") return;
      await copyLink();
    }
  };

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-md border border-primary px-3 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-light"
      >
        {copied ? <Check size={16} strokeWidth={2} /> : <Link2 size={16} strokeWidth={2} />}
        {copied ? "Link copied" : "Copy link"}
      </button>
      {canShare && (
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-2 rounded-md border border-secondary px-3 py-2 text-sm text-dark transition-colors hover:bg-secondary"
        >
          <Share2 size={16} strokeWidth={2} />
          Share
        </button>
      )}
    </div>
  );
};

export default SharePost;
