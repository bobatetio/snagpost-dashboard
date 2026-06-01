import { ArrowRight } from "lucide-react";

export function AffiliateBanner() {
  return (
    <section id="cta" className="relative overflow-hidden bg-band py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(50%_70%_at_20%_50%,rgba(141,114,255,0.25)_0%,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative flex items-end justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=900&auto=format&fit=crop"
            alt=""
            className="h-64 w-full max-w-md rounded-2xl object-cover shadow-2xl"
          />
        </div>
        <div>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Earn 40% Commission!</h2>
          <p className="mt-4 max-w-xl text-base text-white/75">
            Sign up for our affiliate program and earn 40% recurring commission for every
            new SocialPulse user you refer. It's our way of saying thank you for spreading
            the word.
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-band hover:bg-white/90"
          >
            Learn more <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
