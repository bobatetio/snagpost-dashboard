import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import Lottie from "lottie-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function LandingPage() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => io.observe(el));

    // Fallback for elements already in initial viewport
    requestAnimationFrame(() => {
      document
        .querySelectorAll<HTMLElement>("[data-animate]:not(.in)")
        .forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("in");
            io.unobserve(el);
          }
        });
    });

    // Live counter in hero mockup
    const liveCount = document.getElementById("liveCount");
    let current = 247;
    const tickInterval = window.setInterval(() => {
      if (liveCount && Math.random() < 0.5) {
        current += Math.floor(Math.random() * 3) + 1;
        liveCount.textContent = String(current);
      }
    }, 2200);

    return () => {
      io.disconnect();
      window.clearInterval(tickInterval);
    };
  }, []);

  return (
    <div className="landing-root">
      <Header />
      <main>
        <Hero />
        <SubHero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <WhereItWorks />
        <DataPoints />
        <Pricing />
        <FounderNote />
        <CTABanner />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

/* ============================================================
   HEADER
============================================================ */
function Header() {
  const [activeHref, setActiveHref] = useState("#");

  const links = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const sectionIds = ["features", "how", "pricing", "faq"];

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveHref("#");
        return;
      }
      let current = "#";
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= window.innerHeight * 0.5) current = `#${id}`;
        }
      });
      setActiveHref(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-5 pt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <a href="/" className="flex items-center gap-2 justify-self-start">
          <LogoMark />
          <span className="text-[16px] font-semibold tracking-tight">
            SnagPost
          </span>
        </a>

        <nav className="hidden md:flex justify-self-center items-center gap-0.5 rounded-full bg-white border border-[color:var(--line)] px-1.5 py-1.5 shadow-[0_2px_6px_rgba(16,24,48,0.04)]">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={
                activeHref === l.href
                  ? "px-4 py-1.5 text-[14px] rounded-full bg-[color:var(--violet)] text-white font-medium transition-colors"
                  : "px-4 py-1.5 text-[14px] rounded-full text-neutral-700 hover:text-neutral-900 transition-colors"
              }
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <Link
            to="/login"
            className="hidden sm:inline-flex text-[14px] text-neutral-700 hover:text-neutral-900"
          >
            Sign in
          </Link>
          <a
            href="#install"
            className="inline-flex h-10 items-center rounded-full bg-[color:var(--violet)] px-5 text-[14px] font-medium text-white hover:bg-[color:var(--violet-hover)] transition-colors"
          >
            Add to Chrome
          </a>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="grid place-items-center w-7 h-7 rounded-md bg-gradient-to-br from-[color:var(--violet)] to-[color:var(--violet-deep)] text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)]"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </span>
  );
}

/* ============================================================
   HERO
============================================================ */
function Hero() {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const MIN_WIDTH = 672; // max-w-2xl
    const MAX_WIDTH = 1152; // max-w-6xl
    let rafId: number | null = null;
    const updateVideoWidth = () => {
      rafId = null;
      if (!videoRef.current) return;
      const scrolled = window.scrollY;
      const growOver = window.innerHeight * 0.6;
      const progress = Math.min(scrolled / growOver, 1);
      const width = MIN_WIDTH + (MAX_WIDTH - MIN_WIDTH) * progress;
      videoRef.current.style.maxWidth = `${width}px`;
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateVideoWidth);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateVideoWidth();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="hero-bg relative overflow-hidden pt-32 pb-0" style={{ ["--hero-bg-url" as string]: `url('${BASE}/hero-2.png')` }}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-center text-center gap-5">
          <span
            className="eyebrow"
            data-animate
            style={{
              background: "transparent",
              border: "none",
              boxShadow: "none",
              fontSize: "14px",
              padding: "0",
            }}
          >
            <span className="eyebrow-dot" />
            Built by the team behind TokScript
          </span>

          <h1
            data-animate
            data-animate-delay="1"
            className="text-[32px] sm:text-[44px] md:text-[56px] leading-[1.05] font-bold tracking-[-0.03em] text-neutral-900 max-w-4xl mx-auto"
          >
            Stop Guessing What Works on Facebook. Start Seeing It.
          </h1>

          <p
            data-animate
            data-animate-delay="2"
            className="text-[14px] sm:text-[15px] leading-6 text-neutral-700 max-w-xl"
          >
            A Chrome extension that captures every post, like, and share from
            any Facebook profile — straight to a dashboard you can study.
          </p>

          <div
            data-animate
            data-animate-delay="3"
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <a
              href="#install"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 h-12 px-5 rounded-full bg-[color:var(--violet)] text-white font-medium text-[15px] hover:bg-[color:var(--violet-hover)] transition-colors"
            >
              Try SnagPost Now, It&apos;s Free
              <ArrowRight />
            </a>
          </div>

        </div>

        <div
          ref={videoRef}
          className="mt-8 mx-auto"
          style={{ maxWidth: "672px", willChange: "max-width" }}
          data-animate
          data-animate-delay="4"
        >
          <div className="hero-frame">
            <video
              poster={`${BASE}/hero-mockup.png`}
              muted
              playsInline
              loop
              preload="metadata"
              aria-label="SnagPost capturing a Facebook profile"
              className="w-full h-auto block"
              onMouseEnter={(e) => {
                void (e.currentTarget as HTMLVideoElement).play();
              }}
              onMouseLeave={(e) => {
                const v = e.currentTarget as HTMLVideoElement;
                v.pause();
                v.currentTime = 0;
                // Reset the element so the poster re-displays instead of
                // the paused first frame.
                v.load();
              }}
            >
              <source src={`${BASE}/hero-demo.mp4`} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SUB-HERO STATS STRIP
============================================================ */
function useCountUp(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, target, duration]);
  return count;
}

function StatItem({ target, suffix, label, triggered }: { target: number; suffix: string; label: string; triggered: boolean }) {
  const count = useCountUp(target, 1800, triggered);
  return (
    <div className="flex flex-col items-center text-center gap-1.5">
      <span className="text-white font-bold text-[48px] leading-none tracking-tight">
        {count}{suffix}
      </span>
      <span className="text-white/90 text-[10px] uppercase tracking-[0.06em] font-medium">
        {label}
      </span>
    </div>
  );
}

function SubHero() {
  const stats = [
    { target: 10,  suffix: "+",  label: "Data points per post" },
    { target: 60,  suffix: "s",  label: "Avg time to extract profile data" },
    { target: 100, suffix: "%",  label: "Runs in your own browser" },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTriggered(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="pt-20 pb-10 bg-white">
      <div className="mx-auto max-w-6xl px-5">
        <div
          ref={ref}
          className="mx-auto w-full rounded-[28px] overflow-hidden flex items-center gap-6 px-10 py-10"
          style={{
            backgroundImage: `url('${BASE}/subhero bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Left label */}
          <p className="text-white font-bold text-[20px] leading-[1.35] w-[200px] shrink-0">
            Used By Facebook Creators, Marketers, And Agencies.
          </p>

          {/* Divider */}
          <div className="w-px self-stretch bg-white/30 shrink-0 my-1" />

          {/* Stats */}
          <div className="flex flex-1 items-center justify-around gap-4">
            {stats.map((s) => (
              <StatItem key={s.label} {...s} triggered={triggered} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHY SNAGPOST
============================================================ */

/* ============================================================
   LOTTIE CARD — fetches JSON at runtime so the file is never
   read into the editor/AI context
============================================================ */
function LottieCard({ path, fallbackImg, className = "w-full" }: { path: string; fallbackImg?: string; className?: string }) {
  const [data, setData] = useState<object | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setData(null);
    setFailed(false);
    fetch(path)
      .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((json) => { json.op = json.op - 1; setData(json); })
      .catch(() => setFailed(true));
  }, [path]);
  if (!data) {
    if (fallbackImg) return <img src={fallbackImg} className={`${className} block`} alt="" />;
    return null;
  }
  return <Lottie animationData={data} loop autoplay className={`${className} block`} style={{ height: className.includes("h-full") ? "100%" : "auto" }} />;
}

/* ============================================================
   SCROLL CARD WRAPPER
============================================================ */
function ScrollCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.75, 1], [64, 0, 0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.75, 1], [0.96, 1, 1, 0.97]);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale }}>
      {children}
    </motion.div>
  );
}

/* ============================================================
   FEATURES (bento)
============================================================ */
function Features() {
  return (
    <section id="features" className="py-20" style={{ background: "linear-gradient(180deg, #ffffff 0%, #eef5fc 100%)" }}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-4" data-animate>
          <span className="eyebrow">
            <span className="eyebrow-dot" /> Features
          </span>
        </div>
        <h2
          data-animate
          data-animate-delay="1"
          className="text-[36px] sm:text-[48px] leading-[1.05] font-semibold tracking-[-0.02em] text-center max-w-3xl mx-auto"
        >
          Built for the way creators
          <br />
          actually work on Facebook.
        </h2>

        <div className="mt-12 flex flex-col gap-8">
          {[
            {
              tag: "Auto-capture",
              title: "Captures every post as you scroll",
              body: "The extension detects each post as it loads on any Facebook profile, pulling the engagement data, post type, caption, and date automatically, without you clicking a single button.",
              img: `${BASE}/Auto-capture.png`,
              imgAlt: "Auto-capture feature",
              lottie: `${BASE}/Auto-capture.json`,
              lottieClass: "w-[68%]",
            },
            {
              tag: "Push to dashboard",
              title: "Instantly send any profile you love to your dashboard",
              body: "Export any profile to the dashboard and rank posts by likes, comments, shares, or video plays, so the best-performing content surfaces immediately instead of staying buried.",
              img: `${BASE}/Push to dashboard.png`,
              imgAlt: "Push to dashboard feature",
              lottie: `${BASE}/Push-to-dashboard.json`,
            },
            {
              tag: "Viral intel",
              title: "Shows you what's going viral across all profiles",
              body: "See which posts blew up far beyond a creator's normal numbers. The Discovery feed pulls outliers from every profile you've tracked, giving you a live window into exactly what Facebook is rewarding right now — updated constantly.",
              img: `${BASE}/Viral intel.png`,
              imgAlt: "Viral intel feature",
              lottie: `${BASE}/viral-intel.json`,
              lottieClass: "w-[80%]",
            },
            {
              tag: "AI-ready",
              title: "Exports your data straight\ninto your favourite AI tools",
              titleClass: "whitespace-pre-line",
              body: "Download any profile's post data as JSON, Markdown, or Excel, formatted so you can paste it directly into Claude, ChatGPT, or Gemini and get a content strategy without any cleanup work.",
              img: `${BASE}/AI-ready.png`,
              imgAlt: "AI-ready exports feature",
              lottie: `${BASE}/AI-ready.json`,
            },
            {
              tag: "Quick save",
              title: "Saves the profiles and posts you want to revisit",
              body: "Bookmark individual posts or entire profiles from anywhere in the dashboard, and they'll always be just one click away whenever you need to reference them.",
              img: `${BASE}/Quick save.png`,
              imgAlt: "Quick save feature",
              lottie: `${BASE}/Quick-save.json`,
              lottieClass: "w-[80%]",
            },
          ].map((f, i) => (
            <ScrollCard key={f.tag}>
              <div
                className="w-full rounded-[28px] overflow-hidden grid md:grid-cols-2 md:h-[420px]"
                style={{
                  background:
                    "linear-gradient(180deg, #ECF3FC 0%, #F5F8FD 55%, #FFFFFF 100%)",
                  boxShadow:
                    "inset 0 0 0 3px #FFFFFF, inset 0 2px 10px rgba(35,57,135,0.07), 0 10px 30px -8px rgba(35,57,135,0.10), 0 2px 6px rgba(35,57,135,0.05)",
                }}
              >
                <div className={`p-8 md:p-10 flex flex-col justify-center ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                  <span className="inline-block w-fit text-[11px] font-semibold tracking-[0.08em] uppercase text-[color:var(--violet)] mb-3">
                    {f.tag}
                  </span>
                  <h3 className={`text-[26px] sm:text-[30px] font-bold tracking-tight leading-[1.15] ${"titleClass" in f ? (f as any).titleClass : ""}`}>
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-7 text-neutral-600 max-w-md">
                    {f.body}
                  </p>
                </div>
                <div className={`pl-6 md:pl-8 pt-6 md:pt-0 pr-10 flex items-center justify-center overflow-hidden h-full ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                  {"lottie" in f ? (
                    <LottieCard path={(f as any).lottie} fallbackImg={(f as any).img} className={(f as any).lottieClass} />
                  ) : (
                    <img
                      src={(f as any).img}
                      alt={(f as any).imgAlt}
                      className="w-full h-auto block"
                    />
                  )}
                </div>
              </div>
            </ScrollCard>
          ))}
        </div>

        {/* Features section CTA */}
        <div
          className="mt-14 flex flex-col items-center text-center"
          data-animate
        >
          <p className="text-[14.5px] text-neutral-600 mb-5">
            Free Chrome extension · Sixty seconds to set up
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#install"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 h-12 px-5 rounded-full bg-[color:var(--violet)] text-white font-medium text-[15px] hover:bg-[color:var(--violet-hover)] transition-colors"
            >
              Try SnagPost Now
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   DASHBOARD COMPOSITE MOCKUP (sidebar + profiles in one panel)
============================================================ */

/* ============================================================
   SMART TOOLS — Heatmap + Compare
============================================================ */
function HowItWorks() {
  const STEPS = [
    {
      img: `${BASE}/step-1.png`,
      doodle: `${BASE}/doodle-step-1.png`,
      title: "Install the extension",
      body: "Install free in 30 seconds — any Chromium browser works, no card required.",
      doodleAt: "top" as const,
      doodleAlign: "justify-start",
    },
    {
      img: `${BASE}/step-2.png`,
      doodle: `${BASE}/doodle-step-2.png`,
      title: "Open Facebook",
      body: "Open Facebook — SnagPost sits quietly in your browser toolbar, always ready.",
      doodleAt: "bottom" as const,
      doodleAlign: "justify-center",
    },
    {
      img: `${BASE}/step-3.png`,
      doodle: `${BASE}/doodle-step-3.png`,
      title: "Capture any post",
      body: "Click any post to capture it — or sync an entire profile's feed at once.",
      doodleAt: "top" as const,
      doodleAlign: "justify-end",
    },
  ];

  return (
    <section
      id="how"
      className="relative overflow-hidden bg-[#0A1535] pt-12 pb-20 md:pt-16 md:pb-32"
    >
      {/* Purple bloom at the section base — same image as the hero */}
      <img
        src={`${BASE}/hero-blur.png`}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none [filter:hue-rotate(-46deg)]"
      />
      {/* Soft blue blur near the top of the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[60%] -translate-x-1/2 rounded-full bg-[#1F7DDC]/25 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="mb-4" data-animate>
            <span className="eyebrow eyebrow-on-dark">
              <span className="eyebrow-dot" /> How it works
            </span>
          </div>
          <h2
            data-animate
            data-animate-delay="1"
            className="text-[36px] sm:text-[48px] leading-[1.05] font-semibold tracking-[-0.02em] text-center max-w-3xl mx-auto text-white"
          >
            From post to board in seconds.
          </h2>
          <p
            data-animate
            data-animate-delay="2"
            className="mt-4 text-center text-[15.5px] leading-7 max-w-2xl mx-auto text-white/60"
          >
            Install the extension, open Facebook, and start capturing — no
            setup, nothing to learn.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start md:gap-6">
          {STEPS.map((step, i) => {
            const doodle = (
              <div className={`flex ${step.doodleAlign}`}>
                <img
                  src={step.doodle}
                  alt=""
                  className="w-20 brightness-0 invert"
                />
              </div>
            );
            const card = (
              <div
                className="relative aspect-[325/279] overflow-hidden rounded-[28px]"
                style={{
                  background:
                    "linear-gradient(180deg, #15254F 0%, #0E1B3D 55%, #0B1735 100%)",
                  boxShadow:
                    "inset 0 0 0 1.5px rgba(255,255,255,0.06), inset 0 2px 10px rgba(0,0,0,0.25), 0 10px 30px -8px rgba(7,11,30,0.55), 0 2px 6px rgba(7,11,30,0.30)",
                }}
              >
                <div className="absolute inset-[10px] overflow-hidden rounded-[18px]">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="h-full w-full object-cover object-left-top"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1735] via-[#0B1735]/85 to-transparent px-6 pb-6 pt-20">
                  <h3 className="text-[16px] font-semibold leading-[1.6] text-[#f7f8f8]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[14px] font-medium leading-[1.7] text-[#cdcdcd]">
                    {step.body}
                  </p>
                </div>
              </div>
            );
            return (
              <div
                key={step.title}
                className="flex flex-col gap-2"
                data-animate
                data-animate-delay={String(i + 1)}
              >
                {step.doodleAt === "top" ? (
                  <>
                    {doodle}
                    {card}
                  </>
                ) : (
                  <>
                    {card}
                    {doodle}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
============================================================ */
const allTestimonials = [
  {
    text: "Pulled a competitor's entire 2025 timeline in two minutes. Spotted three formats we weren't running. Built a content plan in an afternoon.",
    name: "Amara Okafor",
    role: "Head of Social, Trellis",
    image: "https://i.pravatar.cc/120?img=47",
  },
  {
    text: "The Discovery feed is unfair. It's like a content moodboard that updates itself with proven hits every single week.",
    name: "Dieter Hofmann",
    role: "Creator strategist",
    image: "https://i.pravatar.cc/120?img=33",
  },
  {
    text: "We were paying $179/mo for a tool that only gave us follower counts. SnagPost gives us actual post performance for free.",
    name: "Priya Iyer",
    role: "Growth lead, Auralis",
    image: "https://i.pravatar.cc/120?img=26",
  },
  {
    text: "Hand Claude the JSON export and ask for patterns — five minutes later you have a content brief that would have taken a week.",
    name: "Marcus Lehrer",
    role: "Independent strategist",
    image: "https://i.pravatar.cc/120?img=12",
  },
  {
    text: "Studied 8 profiles in our category in an hour. The day/time heatmap alone changed our schedule for the better.",
    name: "Yui Tanabe",
    role: "Social lead, Polysift",
    image: "https://i.pravatar.cc/120?img=19",
  },
  {
    text: "I run a small agency. SnagPost replaced a junior analyst's first three days of every new client onboarding. Easily worth it.",
    name: "Lina Rosado",
    role: "Founder, Glydex Social",
    image: "https://i.pravatar.cc/120?img=8",
  },
  {
    text: "Finally a Facebook research tool that doesn't require proxies or fake accounts. Just install and go.",
    name: "James Whitfield",
    role: "Performance marketer",
    image: "https://i.pravatar.cc/120?img=52",
  },
  {
    text: "The export to Markdown and straight into ChatGPT workflow is genuinely one of the most useful things I've added to my stack.",
    name: "Sofia Mendes",
    role: "Content director, Vanta",
    image: "https://i.pravatar.cc/120?img=44",
  },
  {
    text: "Our whole team uses it now. We run competitive audits in the time it used to take one person just to gather the data.",
    name: "Kwame Asante",
    role: "Social media manager",
    image: "https://i.pravatar.cc/120?img=60",
  },
];

function TestimonialsColumn({
  testimonials,
  duration = 15,
  className = "",
}: {
  testimonials: typeof allTestimonials;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-4"
      >
        {[...Array(2)].map((_, di) => (
          <Fragment key={di}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-6 rounded-[20px] border border-[color:var(--line)] bg-white shadow-[0_4px_24px_rgba(35,57,135,0.06)] max-w-sm w-full"
              >
                <p className="text-[14px] leading-7 text-neutral-700">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover bg-neutral-200"
                  />
                  <div>
                    <div className="text-[13px] font-semibold tracking-tight">{name}</div>
                    <div className="text-[12px] text-neutral-500">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
}

function Testimonials() {
  const col1 = allTestimonials.slice(0, 3);
  const col2 = allTestimonials.slice(3, 6);
  const col3 = allTestimonials.slice(6, 9);

  return (
    <section className="py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-4 flex justify-center" data-animate>
          <span className="eyebrow">
            <span className="eyebrow-dot" /> Loved by creators
          </span>
        </div>
        <h2
          data-animate
          data-animate-delay="1"
          className="text-[36px] sm:text-[48px] leading-[1.05] font-semibold tracking-[-0.02em] text-center"
        >
          What happens when you stop
          <br />
          guessing and start tracking.
        </h2>
      </div>

      <div
        className="mt-12 flex gap-4 justify-center"
        style={{ height: 600, maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}
      >
        <TestimonialsColumn testimonials={col1} duration={18} />
        <TestimonialsColumn testimonials={col2} duration={22} className="hidden md:block" />
        <TestimonialsColumn testimonials={col3} duration={16} className="hidden lg:block" />
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
============================================================ */
function FAQ() {
  const items = [
    {
      q: "Is this against Facebook's terms of service?",
      a: "SnagPost runs in your browser using your own logged-in session. No API access, no proxies, no automated requests. It reads what's already on your screen as you scroll — the same data you'd see manually.",
    },
    {
      q: "Will my account get banned?",
      a: "No unusual activity is triggered. The extension reads what's already rendered as you scroll. It's a structured note-taker, not a scraper hitting Facebook's servers.",
    },
    {
      q: "What gets captured per post?",
      a: "Post type (text, photo, video, reel, link, album), likes, comments, shares, video plays, the full caption, and exact date and time posted.",
    },
    {
      q: "Does it work on Facebook Groups?",
      a: "Profiles ship first. Groups is next on the roadmap. Lifetime members get it automatically when it ships, at no extra cost.",
    },
    {
      q: "How is this different from other tools?",
      a: "Most Facebook research tools either need complex setups with proxies and aged accounts, or just give you follower counts. SnagPost captures actual post-level engagement using your existing session — it's faster, cheaper, and the only tool with a built-in outlier feed.",
    },
    {
      q: "Can I get a refund?",
      a: "Yes. 14-day no-questions-asked refund on Pro and Lifetime. Install the extension first, try it on a real profile, then upgrade.",
    },
  ];

  return (
    <section id="faq" className="py-20 section-soft">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-4" data-animate>
          <span className="eyebrow">
            <span className="eyebrow-dot" /> FAQ
          </span>
        </div>
        <h2
          data-animate
          data-animate-delay="1"
          className="text-[36px] sm:text-[48px] leading-[1.05] font-semibold tracking-[-0.02em] max-w-3xl"
        >
          Questions? We&apos;ve
          <br />
          already answered.
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="p-6 h-fit" data-animate>
            <h3 className="text-[16px] font-semibold tracking-tight whitespace-nowrap">
              Have a question we didn&apos;t cover?
            </h3>
            <p className="mt-2 text-[13px] leading-6 text-neutral-600">
              Email a human. We answer within a business day.
            </p>
            <a href="mailto:support@snagpost.com" className="btn-primary mt-4">
              Contact us
            </a>
          </aside>
          <div
            className="md:col-span-2 card divide-soft"
            style={{ border: 'none' }}
            data-animate
            data-animate-delay="1"
          >
            {items.map((it, i) => (
              <FAQItem key={it.q} item={it} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  item,
  defaultOpen,
}: {
  item: { q: string; a: string };
  defaultOpen?: boolean;
}) {
  return (
    <details className="group" {...(defaultOpen ? { open: true } : {})}>
      <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-5">
        <span className="text-[14.5px] font-medium pr-4">{item.q}</span>
        <span
          aria-hidden
          className="grid place-items-center w-6 h-6 rounded-full transition-transform group-open:rotate-45"
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path
              d="M5 1v8M1 5h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </summary>
      <div className="px-6 pb-5 text-[13.5px] leading-7 text-neutral-600">
        {item.a}
      </div>
    </details>
  );
}



/* ============================================================
   WHERE IT WORKS
============================================================ */
function WhereItWorks() {
  const cards = [
    {
      title: "Personal profiles",
      body: "Every post and metric from any personal Facebook profile.",
    },
    {
      title: "Facebook Groups",
      body: "Posts and engagement from any public or private group you're in.",
    },
    {
      title: "Business profiles",
      body: "Full post-level data from any business page.",
    },
    {
      title: "Creator profiles",
      body: "Track what formats and cadences are winning in your niche.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col md:flex-row gap-12 items-stretch">

          {/* Left column */}
          <div className="flex-1 flex flex-col">
            {/* Headline */}
            <span className="eyebrow self-start mb-4">
              <span className="eyebrow-dot" /> Where it works
            </span>
            <h2 className="text-[32px] sm:text-[40px] font-bold leading-[1.1] tracking-tight text-neutral-900 mb-3">
              Capture from any account type on Facebook.
            </h2>
            <p className="text-[14px] leading-6 text-neutral-500 mb-8 max-w-sm">
              Personal profiles, business pages, groups, and creator accounts — if it's on Facebook, SnagPost captures it.
            </p>
            <a
              href="#install"
              className="inline-flex w-fit items-center gap-2 h-11 px-6 rounded-full bg-[color:var(--violet)] text-white font-medium text-[14px] hover:bg-[color:var(--violet-hover)] transition-colors mb-10"
            >
              Try SnagPost now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>

            {/* 2x2 numbered cards */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
              {cards.map((c) => (
                <div
                  key={c.title}
                  className="rounded-[20px] p-5 flex flex-col gap-3"
                  style={{
                    background: "linear-gradient(180deg, #ECF3FC 0%, #F5F8FD 55%, #FFFFFF 100%)",
                  }}
                >
                  <h3 className="text-[15px] font-bold tracking-tight text-neutral-900 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-[12.5px] leading-5 text-neutral-500">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — Lottie */}
          <div className="w-full md:w-[48%] shrink-0 rounded-[28px] overflow-hidden self-stretch">
            <LottieCard path={`${BASE}/Where it works.json`} className="w-full h-full object-cover" />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DATA POINTS
============================================================ */
function DPIcon({ d, d2 }: { d: string; d2?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
      {d2 && <path d={d2} />}
    </svg>
  );
}

function DataPointChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-full shrink-0 bg-white">
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "#1A3A6B" }}>
        {icon}
      </div>
      <span className="text-neutral-800 text-[13px] font-medium whitespace-nowrap">{label}</span>
    </div>
  );
}

function MarqueeRow({ items, reverse }: { items: { icon: React.ReactNode; label: string }[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}>
      <div
        className="flex gap-3"
        style={{
          width: "max-content",
          animation: `${reverse ? "marquee-right" : "marquee-left"} 35s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <DataPointChip key={i} icon={item.icon} label={item.label} />
        ))}
      </div>
    </div>
  );
}

function DataPoints() {
  const row1 = [
    { icon: <DPIcon d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />, label: "Likes" },
    { icon: <DPIcon d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />, label: "Comments" },
    { icon: <DPIcon d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />, label: "Shares" },
    { icon: <DPIcon d="M5 3l14 9-14 9V3z" />, label: "Video plays" },
    { icon: <DPIcon d="M3 3h18v18H3zM3 9h18M9 21V9" />, label: "Post type" },
    { icon: <DPIcon d="M17 10H3M21 6H3M21 14H3M13 18H3" />, label: "Caption text" },
    { icon: <DPIcon d="M3 4h18v18H3zM16 2v4M8 2v4M3 10h18" />, label: "Date posted" },
    { icon: <DPIcon d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" d2="M12 6v6l4 2" />, label: "Time posted" },
  ];

  const row2 = [
    { icon: <DPIcon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />, label: "Followers & following" },
    { icon: <DPIcon d="M21 5c0 1.657-4.03 3-9 3S3 6.657 3 5m18 0c0-1.657-4.03-3-9-3S3 3.343 3 5m18 0v14c0 1.657-4.03 3-9 3s-9-1.343-9-3V5" />, label: "Total posts collected" },
    { icon: <DPIcon d="M18 20V10M12 20V4M6 20v-6" />, label: "Posts per day of week" },
    { icon: <DPIcon d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z" />, label: "Content type breakdown" },
    { icon: <DPIcon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />, label: "Top performing post types" },
    { icon: <DPIcon d="M23 6L13.5 15.5l-5-5L1 18M17 6h6v6" />, label: "Average engagement" },
    { icon: <DPIcon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />, label: "Outlier posts" },
    { icon: <DPIcon d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12M12 2a6 6 0 1 0 0 12A6 6 0 0 0 12 2z" />, label: "Top performing content" },
  ];

  return (
    <section className="py-20 bg-white">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-5">
        <div
          className="relative w-full rounded-[28px] overflow-hidden flex flex-col pt-12 pb-10"
          style={{
            backgroundImage: `url('${BASE}/what-you-get-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark fade overlay on left */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />

          {/* Top — headline */}
          <div className="relative px-10 flex flex-col gap-3 mb-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] uppercase text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" /> What you get
            </span>
            <h2 className="text-[26px] sm:text-[30px] font-bold leading-[1.15] tracking-tight text-white">
              Every data point, captured for you.
            </h2>
            <p className="text-[13.5px] leading-6 text-white/70 max-w-lg">
              Likes, shares, captions, post times, follower counts — every metric Facebook shows, automatically collected.
            </p>
          </div>

          {/* Bottom — scrolling tickers */}
          <div className="relative flex flex-col gap-3">
            <MarqueeRow items={row1} />
            <MarqueeRow items={row2} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRICING
============================================================ */
function Pricing() {
  const free = ["Chrome extension", "Live sidebar capture", "Up to 100 posts per scan", "Dashboard preview"];
  const lifetime = [
    "One-time payment, no renewals",
    "Price locked at launch rate",
    "All future features included",
    "Facebook Groups when it ships",
    "Priority email support",
  ];
  const pro = [
    "Unlimited profile scans",
    "Full dashboard access",
    "Discovery feed (top 1%)",
    "AI exports (JSON, MD, XLSX)",
    "Bookmarks &amp; saved searches",
  ];

  return (
    <section id="pricing" className="py-20 bg-[#0A1535]">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-4" data-animate>
          <span className="eyebrow-on-dark eyebrow">
            <span className="eyebrow-dot" /> Pricing
          </span>
        </div>
        <h2
          data-animate
          data-animate-delay="1"
          className="text-[36px] sm:text-[48px] leading-[1.05] font-semibold tracking-[-0.02em] max-w-3xl text-white"
        >
          Free to install.
          <br />
          Honest when ready.
        </h2>
        <p
          data-animate
          data-animate-delay="2"
          className="mt-4 text-[15px] leading-7 text-white/60 max-w-xl"
        >
          Start for free with no card required. Upgrade when you're ready.
        </p>

        <div id="install" className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <PriceCard
            name="Free"
            tag="For trying it out"
            price="$0"
            unit=""
            pitch="No card. No expiration."
            cta="Try SnagPost Now"
            ctaStyle="ghost"
            features={free}
          />
          <PriceCard
            name="Lifetime"
            tag="Pay once, use forever"
            price="$139"
            unit="once"
            pitch="Pays for itself in 16 months"
            cta="Get Lifetime"
            ctaStyle="violet"
            features={lifetime}
            featured
          />
          <PriceCard
            name="Pro"
            tag="For active users"
            price="$9"
            unit="/month"
            pitch="Cancel anytime"
            cta="Start Pro"
            ctaStyle="ghost"
            features={pro}
          />
        </div>

      </div>
    </section>
  );
}

function PriceCard({
  name,
  tag,
  price,
  unit,
  pitch,
  cta,
  ctaStyle,
  features,
  featured,
}: {
  name: string;
  tag: string;
  price: string;
  unit: string;
  pitch: string;
  cta: string;
  ctaStyle: "ghost" | "violet";
  features: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-[28px] p-7 flex flex-col relative ${
        featured ? "ring-2 ring-[color:var(--violet)] -translate-y-1" : ""
      }`}
      style={{
        background: "linear-gradient(180deg, #ECF3FC 0%, #F5F8FD 55%, #FFFFFF 100%)",
        boxShadow: "inset 0 0 0 3px #FFFFFF, inset 0 2px 10px rgba(35,57,135,0.07), 0 10px 30px -8px rgba(35,57,135,0.10), 0 2px 6px rgba(35,57,135,0.05)",
      }}
      data-animate
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[color:var(--violet)] to-[color:var(--violet-deep)] text-white text-[10px] font-semibold tracking-[0.08em] uppercase shadow-[0_4px_12px_rgba(123,102,224,0.35)]">
          Best value
        </span>
      )}
      <div className="text-[15px] font-semibold tracking-tight">{name}</div>
      <div className="text-[12.5px] text-neutral-500 mt-1">{tag}</div>
      <div className="mt-5 flex items-baseline gap-2">
        <span
          className={`text-[48px] font-semibold leading-none tracking-[-0.03em] ${
            featured
              ? "bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--violet)] to-[color:var(--violet-deep)]"
              : ""
          }`}
        >
          {price}
        </span>
        {unit && (
          <span className="text-[13px] text-neutral-500 font-medium">
            {unit}
          </span>
        )}
      </div>
      <div className="text-[12.5px] text-neutral-500 mt-1">{pitch}</div>
      <a
        href="#"
        className={`${ctaStyle === "violet" ? "btn-violet" : "btn-ghost"} mt-6 w-full justify-center`}
      >
        {cta}
      </a>
      <div className="mt-6 pt-5 border-t border-[color:var(--line)] text-[11px] uppercase tracking-[0.08em] font-semibold text-neutral-500">
        Includes
      </div>
      <ul className="mt-3 space-y-2.5 text-[13px] text-neutral-700">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <CheckBubble />
            <span dangerouslySetInnerHTML={{ __html: f }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   FOUNDER NOTE
============================================================ */
function FounderNote() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-5xl px-5 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 items-start">
        <div
          data-animate
          className="aspect-square rounded-2xl overflow-hidden"
        >
          <img
            src={`${BASE}/Michael.jpeg`}
            alt="Michael Sanchez, founder of SnagPost"
            className="w-full h-full object-cover"
          />
        </div>
        <div data-animate data-animate-delay="1">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> A note from the founder
          </span>
          <h2 className="mt-4 text-[48px] sm:text-[64px] leading-[1] tracking-[-0.03em] serif-italic">
            Why we built this.
          </h2>
          <div className="mt-5 space-y-4 text-[14.5px] leading-7 text-neutral-700">
            <p>
              TikTok has TokScript — we shipped that three years ago and it now
              powers content research for 25,000+ creators. YouTube has VidIQ.
              Instagram has half a dozen tools. Facebook had nothing serious,
              despite being the platform paying out the most creator money this
              year.
            </p>
            <p>
              So we built it. SnagPost pulls the data Facebook hides, captures
              everything our team needs to study what's actually working,
              and exports it cleanly to the tools you already use.
            </p>
            <p>
              If you do anything on Facebook professionally, this is the tool I
              wish I&apos;d had three years ago. Free to install. Pay nothing
              until you want the dashboard. 14-day money-back.
            </p>
          </div>
          <div className="mt-5 text-[13px]">
            <strong className="font-semibold">Michael Sanchez</strong>
            <span className="text-neutral-500">
              {" "}
              · Founder, SnagPost &amp; TokScript
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA BANNER
============================================================ */
function CTABanner() {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-[28px] bg-[#0A1535] text-white">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 80% at 20% 100%, rgba(91,125,255,0.40) 0%, rgba(91,125,255,0) 70%), radial-gradient(40% 80% at 90% 0%, rgba(154,175,255,0.30) 0%, rgba(154,175,255,0) 70%)",
            }}
          />
          <svg
            className="absolute -bottom-2 left-0 right-0 w-full opacity-50"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#233987" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#9aafff" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <path
              d="M0 80 C 200 40, 400 120, 600 80 S 1000 40, 1200 80 L1200 120 L0 120 Z"
              fill="url(#wave)"
            />
          </svg>

          <div className="relative grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-14 md:pr-6">
              <h2 className="text-[36px] sm:text-[48px] leading-[1.05] font-semibold tracking-[-0.02em]">
                Stop guessing.
                <br />
                Start scraping.
              </h2>
              <p className="mt-4 text-[14.5px] leading-6 text-white/70 max-w-md">
                Free Chrome extension. No credit card. Works on any Facebook
                profile. Sixty seconds to set up.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#install"
                  className="inline-flex w-full sm:w-auto justify-center h-11 items-center gap-2 rounded-full bg-white text-neutral-900 px-5 text-[14px] font-medium hover:bg-neutral-100 transition-colors"
                >
                  Try SnagPost Now
                </a>
                <a
                  href="#pricing"
                  className="inline-flex w-full sm:w-auto justify-center h-11 items-center rounded-full border border-white/20 text-white px-5 text-[14px] font-medium hover:bg-white/10 transition-colors"
                >
                  See pricing
                </a>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-white/60">
                <span className="inline-flex items-center gap-1.5">
                  <Tick color="#a7f3d0" /> 14-day money-back
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Tick color="#a7f3d0" /> No credit card to start
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Tick color="#a7f3d0" /> Cancel anytime
                </span>
              </div>
            </div>
            <div className="self-end md:pl-6 md:pt-12">
              <img
                src={`${BASE}/stop-guessing.png`}
                alt="Stop guessing, start scraping"
                width={1671}
                height={1308}
                className="block w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
============================================================ */
function Footer() {
  return (
    <footer className="bg-[#0A1535] text-white">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <LogoMark />
              <span className="text-[15px] font-semibold tracking-tight text-white">
                SnagPost
              </span>
            </div>
            <p className="mt-3 text-[13px] leading-6 text-white/60 max-w-[260px]">
              The Chrome extension for studying Facebook. Built by the team
              behind TokScript, used by 25,000+ creators across TikTok.
            </p>
          </div>
          <FooterCol
            title="Product"
            links={["Features", "How it works", "Compare", "Pricing", "FAQ"]}
          />
          <FooterCol
            title="Company"
            links={["About", "Blog", "TokScript", "Contact"]}
          />
          <FooterCol
            title="Legal"
            links={["Terms", "Privacy", "Refunds"]}
          />
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-white/45">
          <span>© {new Date().getFullYear()} SnagPost by TokTools</span>
          <span>Not affiliated with or endorsed by Meta Platforms.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-[12px] uppercase tracking-[0.12em] text-white/50 mb-3">
        {title}
      </div>
      <ul className="space-y-2 text-[13px]">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-white/75 hover:text-white transition-colors"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   ICONS
============================================================ */
function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function Tick({ color }: { color?: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "#16a34a"}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function CheckBubble() {
  return (
    <span className="grid place-items-center w-4 h-4 rounded-full bg-[color:var(--violet-soft)] text-[color:var(--violet)] shrink-0 mt-0.5">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="m2 5 2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
