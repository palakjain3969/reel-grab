const steps = [
  { code: "A", label: "Copy the link", detail: "From the YouTube or Instagram app, tap share and copy the link." },
  { code: "B", label: "Paste it above", detail: "ReelGrab reads the link and finds the video automatically." },
  { code: "C", label: "Download", detail: "Save the MP4, or pull the audio only, straight to your device." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="max-w-3xl mx-auto px-6 py-16 border-t border-dark-600">
      <h2 className="font-display font-semibold text-xl text-cream-100 mb-8">
        How it works
      </h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {steps.map((s) => (
          <div key={s.code}>
            <span className="font-mono text-xs text-amber-500 border border-amber-600/40 rounded-full w-6 h-6 flex items-center justify-center">
              {s.code}
            </span>
            <h3 className="mt-3 font-medium text-cream-100">{s.label}</h3>
            <p className="mt-1 text-sm text-cream-500 leading-relaxed">{s.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}