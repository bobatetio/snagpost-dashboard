import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { Compass, Bookmark, Folder as FolderIcon, Settings, LogOut, Plus, Users, Sparkles, ChevronDown, Menu } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { ChromePromoCard } from "./ChromePromoCard";
import { NotificationsMenu } from "./NotificationsMenu";
import { MobileMenu } from "./MobileMenu";
import { createFolder, FOLDERS_MAX, signOut, useFolders } from "../data/store";
import { MOCK_GROUPS, MOCK_PROFILES, MOCK_USER } from "../data/mock";

export function AppShell() {
  const folders = useFolders();
  const location = useLocation();
  const navigate = useNavigate();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const newFolderRef = useRef<HTMLInputElement>(null);
  const folderLimitReached = folders.length >= FOLDERS_MAX;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  function submitNewFolder() {
    const trimmed = newFolderName.trim();
    if (!trimmed || folderLimitReached) {
      cancelNewFolder();
      return;
    }
    const created = createFolder(trimmed);
    setNewFolderName("");
    setCreatingFolder(false);
    if (created) navigate(`/folder/${created.id}`);
  }
  function cancelNewFolder() {
    setNewFolderName("");
    setCreatingFolder(false);
  }
  useEffect(() => {
    if (creatingFolder) newFolderRef.current?.focus();
  }, [creatingFolder]);

  useEffect(() => {
    if (!accountMenuOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!accountRef.current?.contains(e.target as Node)) setAccountMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAccountMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [accountMenuOpen]);

  const inLibrary = location.pathname === "/" || location.pathname.startsWith("/library") || location.pathname.startsWith("/post/");
  const inDiscovery = location.pathname.startsWith("/discovery");
  const inBoards = location.pathname.startsWith("/folders") || location.pathname.startsWith("/folder/");
  const inBookmarks = location.pathname.startsWith("/bookmarks");
  const inGroups = location.pathname.startsWith("/groups");
  const activeProfileId = location.pathname.startsWith("/profile/")
    ? decodeURIComponent(location.pathname.split("/profile/")[1] || "")
    : null;

  return (
    <div className="shell">
      <header className="topbar">
        <button
          type="button"
          className="topbar-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
        >
          <Menu size={22} strokeWidth={2} />
        </button>
        <div className="topbar-brand">
          <Wordmark size={18} />
        </div>
        <div className="topbar-spacer" />
        <a
          className="app-header-chrome-cta"
          href="https://chrome.google.com/webstore/category/extensions"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="app-header-chrome-cta-bg" src="/cta-bg.png" alt="" aria-hidden="true" />
          <img className="app-header-chrome-cta-icon" src="/cta-chrome.png" alt="" aria-hidden="true" />
          <span>Add Social Pulse to Chrome</span>
        </a>
        <NotificationsMenu />
        <div className="app-header-account-wrap" ref={accountRef}>
          <button
            type="button"
            className="app-header-account"
            onClick={() => setAccountMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={accountMenuOpen}
          >
            <img className="app-header-avatar" src={MOCK_USER.avatarUrl} alt={MOCK_USER.name} />
            <span className="app-header-account-text">
              <strong>{MOCK_USER.name}</strong>
              <span>@{MOCK_USER.email.split("@")[0]}</span>
            </span>
            <ChevronDown
              size={14}
              strokeWidth={2}
              className="app-header-account-caret"
              data-open={accountMenuOpen || undefined}
            />
          </button>
          {accountMenuOpen && (
            <div className="app-header-account-menu" role="menu">
              <button
                type="button"
                className="app-header-account-item"
                role="menuitem"
                onClick={() => { setAccountMenuOpen(false); navigate("/settings"); }}
              >
                <Settings size={14} strokeWidth={1.75} />
                Settings
              </button>
              <button
                type="button"
                className="app-header-account-item"
                role="menuitem"
                onClick={() => { setAccountMenuOpen(false); signOut(); navigate("/"); }}
              >
                <LogOut size={14} strokeWidth={1.75} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      <aside className="sidebar">
        <nav className="sidebar-nav" aria-label="Primary">
          <NavLink to="/library" className="nav-item" data-active={inLibrary || undefined}>
            <Compass size={16} strokeWidth={1.75} />
            Profiles
            <span className="nav-item-count">{MOCK_PROFILES.length}</span>
          </NavLink>
          <NavLink to="/discovery" className="nav-item" data-active={inDiscovery || undefined}>
            <Sparkles size={16} strokeWidth={1.75} />
            Discovery
          </NavLink>
          <NavLink to="/bookmarks" className="nav-item" data-active={inBookmarks || undefined}>
            <Bookmark size={16} strokeWidth={1.75} />
            Bookmarks
          </NavLink>
          <NavLink to="/groups" className="nav-item" data-active={inGroups || undefined}>
            <Users size={16} strokeWidth={1.75} />
            Groups
            <span className="nav-item-count">{MOCK_GROUPS.length}</span>
          </NavLink>

          <span className="sidebar-section-label sidebar-section-label-row">
            Folders
            <button
              type="button"
              className="sidebar-section-add"
              onClick={() => setCreatingFolder((v) => !v)}
              disabled={folderLimitReached}
              aria-label="Create folder"
              title={folderLimitReached ? `Limit reached (${FOLDERS_MAX})` : "Create folder"}
            >
              <Plus size={12} strokeWidth={2.25} />
            </button>
          </span>
          {creatingFolder && (
            <form
              className="sidebar-new-folder"
              onSubmit={(e) => { e.preventDefault(); submitNewFolder(); }}
            >
              <FolderIcon size={14} strokeWidth={1.75} />
              <input
                ref={newFolderRef}
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Escape") cancelNewFolder(); }}
                onBlur={() => { if (!newFolderName.trim()) cancelNewFolder(); }}
                placeholder="Folder name"
                maxLength={48}
                aria-label="New folder name"
              />
            </form>
          )}
          <NavLink to="/folders" className="nav-item" data-active={inBoards || undefined}>
            <FolderIcon size={16} strokeWidth={1.75} />
            All folders
            <span className="nav-item-count">{folders.length}</span>
          </NavLink>

          <span className="sidebar-section-label">Recent profiles</span>
          {MOCK_PROFILES.map((p) => (
            <NavLink
              key={p.id}
              to={`/profile/${p.id}`}
              className="recent-profile-row"
              data-active={activeProfileId === p.id || undefined}
            >
              <img className="recent-profile-avatar" src={p.avatarUrl} alt="" />
              <span className="recent-profile-name">{p.displayName}</span>
              {p.fromGroup && <span className="recent-profile-group" title="From a Facebook Group">G</span>}
            </NavLink>
          ))}

        </nav>

        <ChromePromoCard />
      </aside>

      <main className="main">
        <Outlet />
      </main>
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </div>
  );
}
