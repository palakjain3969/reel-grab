import { useState } from "react";

const PLATFORM_LABEL = {
  youtube: "YouTube",
  instagram: "Instagram Reels",
};

export default function PreviewCard({ result, sourceUrl }) {
  const [downloading, setDownloading] = useState(false);

  if (!result) return null;

  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await fetch("http://localhost:8080/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: sourceUrl }),
      });

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${result.title || "video"}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      alert("Download failed. Check the backend terminal for details.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="mt-6 max-w-xl mx-auto rounded-xl border border-dark-500 bg-dark-700 overflow-hidden text-left">
      <div className="p-4">
        <span className="inline-block text-xs font-mono text-amber-500 border border-amber-600/40 rounded px-1.5 py-0.5">
          {PLATFORM_LABEL[result.platform]}
        </span>
        <h3 className="mt-2 font-medium text-cream-100">{result.title}</h3>
        {result.duration && (
          <p className="text-sm text-cream-500 font-mono mt-1">{result.duration}</p>
        )}
      </div>
      <div className="border-t border-dark-500 p-3 flex gap-2">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-dark-900 font-medium text-sm rounded-lg py-2.5 transition-colors"
        >
          {downloading ? "Downloading…" : "Download MP4"}
        </button>
      </div>
    </div>
  );
}