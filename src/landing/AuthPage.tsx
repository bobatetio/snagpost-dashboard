import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import { signIn } from "../data/store";

interface AuthPageProps {
  mode: "signup" | "login";
}

const PERKS = [
  "Capture any Facebook post in one click",
  "Track creators, groups, and folders",
  "Engagement analytics that show what works",
];

export function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend yet — flip the auth flag and enter the dashboard.
    signIn();
    navigate("/library");
  }

  return (
    <div className="landing font-display flex min-h-screen bg-white text-ink">
      {/* Form column */}
      <div className="flex w-full flex-col px-6 py-8 sm:px-12 lg:w-[52%]">
        <Link to="/" className="inline-flex text-[16px] font-semibold tracking-tight">
          SnagPost
        </Link>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-[15px] text-ink-2">
            {isSignup
              ? "Start capturing the posts that matter — free for 14 days."
              : "Log in to pick up where you left off."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            {isSignup && (
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-ink-2">Full name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Cooper"
                  className="rounded-lg border border-black/12 bg-white px-3.5 py-3 text-[15px] outline-none focus:border-brand"
                />
              </label>
            )}
            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-ink-2">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="rounded-lg border border-black/12 bg-white px-3.5 py-3 text-[15px] outline-none focus:border-brand"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-ink-2">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignup ? "Create a password" : "Your password"}
                className="rounded-lg border border-black/12 bg-white px-3.5 py-3 text-[15px] outline-none focus:border-brand"
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              {isSignup ? "Create account" : "Log in"}
              <ArrowRight size={16} strokeWidth={2.25} />
            </button>
          </form>

          <p className="mt-6 text-center text-[13.5px] text-ink-2">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-brand-deep hover:underline">
                  Log in
                </Link>
              </>
            ) : (
              <>
                New to SocialPulse?{" "}
                <Link to="/signup" className="font-semibold text-brand-deep hover:underline">
                  Create an account
                </Link>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-band lg:flex lg:w-[48%]">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_10%,rgba(141,114,255,0.4)_0%,transparent_70%)]" />
        <div className="relative flex flex-col justify-center gap-8 px-12 py-16 text-white">
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight">
              Never lose a viral Facebook post again.
            </h2>
            <p className="mt-3 max-w-sm text-[15px] text-white/70">
              Join creators and teams who study what works — without the endless
              scrolling and screenshots.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-[14px] text-white/85">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand">
                  <Check size={12} strokeWidth={3} />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
