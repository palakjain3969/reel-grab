import { useEffect, useState } from "react";

export default function TimecodeReadout({ running }) {
  const [frames, setFrames] = useState(0);

  useEffect(() => {
    if (!running) {
      setFrames(0);
      return;
    }
    const id = setInterval(() => {
      setFrames((f) => f + 3);
    }, 40);
    return () => clearInterval(id);
  }, [running]);

  const totalSeconds = Math.floor(frames / 24);
  const ff = String(frames % 24).padStart(2, "0");
  const ss = String(totalSeconds % 60).padStart(2, "0");
  const mm = String(Math.floor(totalSeconds / 60) % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-2 font-mono text-sm text-teal-400">
      <span className={running ? "w-1.5 h-1.5 rounded-full bg-teal-400 rec-dot" : "w-1.5 h-1.5 rounded-full bg-dark-500"} />
      <span>{mm}:{ss}:{ff}</span>
      <span className="text-cream-500">{running ? "reading link…" : "idle"}</span>
    </div>
  );
}