import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { MockPanel } from "./MockPanel";

type Variant = "feed" | "folders" | "profiles" | "leads";

export interface AltSectionProps {
  flip?: boolean;
  title: string;
  bullets: { title: string; body: string }[];
  cta: string;
  variant: Variant;
}

export function AlternatingSection({ flip, title, bullets, cta, variant }: AltSectionProps) {
  return (
    <section className="bg-white py-20">
      <div
        className={`mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-brand/15 via-transparent to-transparent blur-2xl" />
          <MockPanel variant={variant} />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">{title}</h2>
          <div className="mt-6 space-y-4">
            {bullets.map((b, i) => (
              <div key={b.title} className="flex gap-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-wash text-[12px] font-bold text-brand-deep">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-ink">{b.title}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/signup"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-110"
          >
            {cta} <ArrowRight size={15} strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
