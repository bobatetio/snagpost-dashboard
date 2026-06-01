import { useState } from "react";
import { Link } from "react-router";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="auth2-page">
      {/* ── Left panel ── */}
      <div className="auth2-left">
        <div className="auth2-logo">
          <Link to="/"><span className="auth2-logomark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </span></Link>
        </div>

        <div className="auth2-form-wrap">
          {sent ? (
            <>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "#EEF1F8", display: "grid", placeItems: "center", marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#233987" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h1 className="auth2-title">Check your email</h1>
              <p className="auth2-sub">We sent a password reset link to <strong>{email}</strong>. Click the link to choose a new password.</p>
              <Link to="/login" className="auth2-submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", marginTop: 24 }}>
                Back to sign in
              </Link>
            </>
          ) : (
            <>
              <h1 className="auth2-title">Forgot password?</h1>
              <p className="auth2-sub">Enter your email and we'll send you a reset link.</p>

              <form onSubmit={handleSubmit} className="auth2-form">
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
                <button type="submit" className="auth2-submit">Send reset link</button>
              </form>

              <p className="auth2-switch" style={{ marginTop: 16 }}>
                Remember your password? <Link to="/login" className="auth2-switch-link">Sign in</Link>
              </p>
            </>
          )}
        </div>

        <p className="auth2-footer">2026 SnagPost, All rights reserved</p>
      </div>

      {/* ── Right panel ── */}
      <div className="auth2-right">
        <div className="auth2-right-content">
          <h2 className="auth2-right-title">The smartest way to research<br />Facebook creators</h2>
          <p className="auth2-right-sub">Capture every post, like, and share from any profile — straight to a dashboard you can study.</p>
          <div className="auth2-mockup-wrap">
            <img src={`${BASE}/hero-panel.jpg`} alt="SnagPost dashboard" className="auth2-mockup" />
          </div>
        </div>
        <div className="auth2-brands">
          {["TokScript", "Facebook", "Chrome", "Claude AI", "ChatGPT"].map(b => (
            <span key={b} className="auth2-brand">{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
