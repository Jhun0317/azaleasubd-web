"use client";

import { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";

export default function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-3 bg-white text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
    </button>
  );
}
