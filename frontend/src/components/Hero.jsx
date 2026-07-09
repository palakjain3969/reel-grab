import { useState } from "react";
import TimecodeReadout from "./TimecodeReadout";
import PreviewCard from "./PreviewCard";

function detectPlatform(url) {
  if (/instagram\.com\/(reel|reels)\//i.test(url)) return "instagram";
  if (/(youtube\.com\/watch|youtu\.be\/)/i.test(url)) return "youtube";
  return null;
}

async function resolveLink(url, platform) {
  const res = await fetch("http://localhost:8080/api/resolve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error("Failed to resolve link");
  }

  const data = await res.json();

  return {
    platform,
    title: data.title,
    duration: "", // backend doesn't return this yet, so leave blank for now
  };
}

export default function Hero() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const platform = detectPlatform(url);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!platform) return;
    setStatus("loading");
    setResult(null);
    const data = await resolveLink(url, platform);
    setResult(data);
    setStatus("idle");
  }

  return (
    <section className="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
      <h1 className="font-display font-semibold text-4xl sm:text-5xl text-cream-100 leading-tight">
        Paste a link.
        <br />
        Get the video.
      </h1>
      <p className="mt-4 text-cream-500 max-w-md mx-auto">
        No sign-up, no watermark. Works with public YouTube videos and Instagram
        Reels.
      </p>

      <div className="mt-10 max-w-xl mx-auto">
        <div className="sprockets rounded-t-md" />

        <form
          onSubmit={handleSubmit}
          className="mt-10 max-w-xl mx-auto bg-dark-700 border border-dark-500 rounded-xl px-4 py-4 flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=… or instagram.com/reel/…"
            className="flex-1 bg-dark-800 border border-dark-500 rounded-lg px-4 py-3 text-sm font-mono text-cream-100 placeholder:text-cream-500/70 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-dark-900 font-medium text-sm rounded-lg px-6 py-3 transition-colors whitespace-nowrap"
          >
            {status === "loading" ? "Reading…" : "Grab it"}
          </button>
        </form>
        <div className="sprockets rounded-b-md" />
        <div className="mt-4 flex items-center justify-between px-1">
          <TimecodeReadout running={status === "loading"} />
        </div>
      </div>

      {platform && (
        <p className="mt-3 text-xs font-mono text-teal-400 text-center">
          detected: {platform === "youtube" ? "YouTube" : "Instagram Reels"}
        </p>
      )}
      <PreviewCard result={result} sourceUrl={url} />
    </section>
  );
}
