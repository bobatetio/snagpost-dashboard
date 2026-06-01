import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { Compass, Sparkles, Bookmark, Users, Folder, Bell, Settings, LogOut, X } from "lucide-react";
import { signOut, useFolders } from "../data/store";
import { MOCK_GROUPS, MOCK_PROFILES, MOCK_USER } from "../data/mock";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PRIMARY = [
  { to: "/library", label: "Profiles", icon: Compass },
  { to: "/discovery", label: "Discovery", icon: Sparkles },
  { to: "/bookmarks", label: "Saved", icon: Bookmark },
  { to: "/groups", label: "Groups", icon: Users },
  { to: "/folders", label: "Folders", icon: Folder },
];

/* Slide-in mobile drawer. Replaces every nav element in the top bar:
 * user identity → primary nav → recent profiles → utilities (notifications,
 * settings, sign out). Lock body scroll while open. */
export function MobileMenu({ open, onClose }: Props) {
  const folders = useFolders();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className="mobile-menu-scrim"
        data-open={open || undefined}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="mobile-menu"
        data-open={open || undefined}
        aria-hidden={!open}
        role="dialog"
        aria-label="Main menu"
      >
        <header className="mobile-menu-head">
          <div className="mobile-menu-user">
            <img className="mobile-menu-avatar" src={MOCK_USER.avatarUrl} alt="" />
            <div className="mobile-menu-user-text">
              <strong>{MOCK_USER.name}</strong>
              <span>{MOCK_USER.email}</span>
            </div>
          </div>
          <button
            type="button"
            className="mobile-menu-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </header>

        <nav className="mobile-menu-nav" aria-label="Primary">
          {PRIMARY.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `mobile-menu-item${isActive ? " active" : ""}`}
            >
              <Icon size={18} strokeWidth={1.75} />
              <span>{label}</span>
              {to === "/groups" && <span className="mobile-menu-count">{MOCK_GROUPS.length}</span>}
              {to === "/folders" && <span className="mobile-menu-count">{folders.length}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mobile-menu-section-label">Recent profiles</div>
        <div className="mobile-menu-recent">
          {MOCK_PROFILES.slice(0, 5).map((p) => (
            <NavLink
              key={p.id}
              to={`/profile/${p.id}`}
              className="mobile-menu-recent-row"
            >
              <img src={p.avatarUrl} alt="" />
              <span>{p.displayName}</span>
            </NavLink>
          ))}
        </div>

        <footer className="mobile-menu-foot">
          <button type="button" className="mobile-menu-util">
            <Bell size={17} strokeWidth={1.75} />
            <span>Notifications</span>
          </button>
          <NavLink to="/settings" className="mobile-menu-util">
            <Settings size={17} strokeWidth={1.75} />
            <span>Settings</span>
          </NavLink>
          <button
            type="button"
            className="mobile-menu-util mobile-menu-util-danger"
            onClick={() => { onClose(); signOut(); navigate("/"); }}
          >
            <LogOut size={17} strokeWidth={1.75} />
            <span>Sign out</span>
          </button>
        </footer>
      </aside>
    </>
  );
}
