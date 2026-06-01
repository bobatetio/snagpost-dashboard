import { HeroMockup } from "./HeroMockup";
import { Link } from "react-router";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#0A0A1E]">
      {/* Faint grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "92px 92px",
        }}
      />
      {/* Purple bloom, bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[620px] w-[620px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,77,237,0.55) 0%, rgba(124,77,237,0.22) 38%, transparent 70%)",
        }}
      />
      {/* Soft top-right haze */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(141,114,255,0.22) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 px-8 pb-24 pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:pt-44">
        {/* Left — copy */}
        <div>
          <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-white sm:text-[42px] lg:text-[50px]">
            Never lose a Lead,
            <br />
            Message, or Sale On
            <br />
            Facebook again!
          </h1>
          <p className="mt-7 max-w-[33rem] text-[17px] leading-relaxed text-white/55">
            SocialPulse captures, organizes, and analyzes every post that matters
            right from your browser. Track creators, build folders, and see what's
            working across groups and feeds.
          </p>
          <Link
            to="/signup"
            className="mt-9 inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-brand to-brand-mid px-6 py-2.5 text-[15px] font-semibold text-white shadow-[0_18px_44px_-12px_rgba(124,77,237,0.85)] transition hover:brightness-110"
          >
            <img src="/cta-chrome.png" alt="" className="h-7 w-7 object-contain" />
            Try today
          </Link>
        </div>

        {/* Right — product mockup */}
        <div className="relative">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
