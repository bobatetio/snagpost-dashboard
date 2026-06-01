import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signIn } from "../data/store";

interface AuthPageProps {
  mode: "signup" | "login";
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signIn();
      navigate("/library");
    }, 800);
  }

  return (
    <div className="auth2-page">
      {/* ── Left panel ── */}
      <div className="auth2-left">
        <div className="auth2-logo">
          <Link to="/"><LogoMark /></Link>
        </div>

        <div className="auth2-form-wrap">
          <h1 className="auth2-title">{isSignup ? "Get Started Now" : "Welcome Back"}</h1>
          <p className="auth2-sub">Enter your credentials to access your account</p>

          {/* Social buttons */}
          <div className="auth2-social-row">
            <button type="button" className="auth2-social-btn">
              <GoogleIcon /> Log in with Google
            </button>
            <button type="button" className="auth2-social-btn">
              <FacebookIcon /> Log in with Facebook
            </button>
          </div>

          <div className="auth2-or"><span>or</span></div>

          <form onSubmit={handleSubmit} className="auth2-form">
            {isSignup && (
              <div className="auth2-field">
                <label className="auth2-label">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Rafiqur Rahman"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="auth2-input"
                />
              </div>
            )}

            <div className="auth2-field">
              <label className="auth2-label">Email address</label>
              <input
                type="email"
                required
                placeholder="rafiqur51@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="auth2-input"
              />
            </div>

            <div className="auth2-field">
              <div className="auth2-label-row">
                <label className="auth2-label">Password</label>
                <Link to="/forgot-password" className="auth2-forgot">Forgot password?</Link>
              </div>
              <div className="auth2-input-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="min 8 chars"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="auth2-input"
                  minLength={8}
                />
                <button type="button" className="auth2-eye" onClick={() => setShowPass(v => !v)} aria-label="Toggle password">
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <label className="auth2-check-row">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="auth2-checkbox" required />
              <span className="auth2-check-label">
                I agree to the <a href="#" className="auth2-terms-link">Terms &amp; Privacy</a>
              </span>
            </label>

            <button type="submit" className="auth2-submit" disabled={loading}>
              {loading ? "Please wait…" : isSignup ? "Create Account" : "Login"}
            </button>
          </form>

          <p className="auth2-switch">
            {isSignup ? (
              <>Already have an account? <Link to="/login" className="auth2-switch-link">Sign in</Link></>
            ) : (
              <>Don&apos;t have an account? <Link to="/signup" className="auth2-switch-link">Sign up</Link></>
            )}
          </p>
        </div>

        <p className="auth2-footer">2026 SnagPost, All rights reserved</p>
      </div>

      {/* ── Right panel ── */}
      <div className="auth2-right">
        <div className="auth2-bg-layer" style={{ backgroundImage: `url('${BASE}/Image%20Content.png')` }} />
        <div className="auth2-bg-layer auth2-bg-layer--2" style={{ backgroundImage: `url('${BASE}/Image%20Content.png')` }} />
        <div className="auth2-right-content">
          <h2 className="auth2-right-title">
            The smartest way to research<br />Facebook creators
          </h2>
          <p className="auth2-right-sub">
            Capture every post, like, and share from any profile — straight to a dashboard you can study.
          </p>
          <div className="auth2-mockup-wrap">
            <img
              src={`${BASE}/hero-panel.jpg`}
              alt="SnagPost dashboard"
              className="auth2-mockup"
            />
          </div>
        </div>
        <AuthMarquee />
      </div>
    </div>
  );
}

/* ── Icons ── */
function LogoMark() {
  return (
    <span className="auth2-logomark">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </span>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}


function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

/* ── Scrolling data-point marquee (mirrors the landing page "What you get" section) ── */
function ChipIcon({ d, d2 }: { d: string; d2?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />{d2 && <path d={d2} />}
    </svg>
  );
}

const ROW1 = [
  { icon: <ChipIcon d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />, label: "Likes" },
  { icon: <ChipIcon d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />, label: "Comments" },
  { icon: <ChipIcon d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />, label: "Shares" },
  { icon: <ChipIcon d="M5 3l14 9-14 9V3z" />, label: "Video plays" },
  { icon: <ChipIcon d="M3 3h18v18H3zM3 9h18M9 21V9" />, label: "Post type" },
  { icon: <ChipIcon d="M17 10H3M21 6H3M21 14H3M13 18H3" />, label: "Caption text" },
  { icon: <ChipIcon d="M3 4h18v18H3zM16 2v4M8 2v4M3 10h18" />, label: "Date posted" },
  { icon: <ChipIcon d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" d2="M12 6v6l4 2" />, label: "Time posted" },
];

const ROW2 = [
  { icon: <ChipIcon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />, label: "Followers" },
  { icon: <ChipIcon d="M21 5c0 1.657-4.03 3-9 3S3 6.657 3 5m18 0c0-1.657-4.03-3-9-3S3 3.343 3 5m18 0v14c0 1.657-4.03 3-9 3s-9-1.343-9-3V5" />, label: "Total posts" },
  { icon: <ChipIcon d="M18 20V10M12 20V4M6 20v-6" />, label: "Posts by day" },
  { icon: <ChipIcon d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z" />, label: "Content breakdown" },
  { icon: <ChipIcon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />, label: "Top post types" },
  { icon: <ChipIcon d="M23 6L13.5 15.5l-5-5L1 18M17 6h6v6" />, label: "Avg engagement" },
  { icon: <ChipIcon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />, label: "Outlier posts" },
  { icon: <ChipIcon d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12M12 2a6 6 0 1 0 0 12A6 6 0 0 0 12 2z" />, label: "Top content" },
];

export function AuthMarquee() {
  const makeChips = (items: typeof ROW1) =>
    [...items, ...items].map((item, i) => (
      <div key={i} className="auth2-chip">
        <span className="auth2-chip-icon">{item.icon}</span>
        <span className="auth2-chip-label">{item.label}</span>
      </div>
    ));

  return (
    <div className="auth2-marquee-wrap">
      <div className="auth2-marquee-row">
        <div className="auth2-marquee-track auth2-marquee-track--left">{makeChips(ROW1)}</div>
      </div>
      <div className="auth2-marquee-row">
        <div className="auth2-marquee-track auth2-marquee-track--right">{makeChips(ROW2)}</div>
      </div>
    </div>
  );
}
