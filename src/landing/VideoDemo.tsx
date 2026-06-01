import { Play } from "lucide-react";
import { MockPanel } from "./MockPanel";

export function VideoDemo() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-brand-soft p-6 shadow-[0_30px_60px_-30px_rgba(80,60,200,0.35)]">
          <div className="relative">
            <MockPanel variant="feed" />
            <button
              type="button"
              className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 p-5 shadow-xl ring-1 ring-black/5 backdrop-blur transition hover:scale-105"
              aria-label="Play product walkthrough"
            >
              <Play size={26} strokeWidth={2} className="ml-1 text-brand" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
