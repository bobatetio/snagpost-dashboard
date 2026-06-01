import { useEffect, useRef, useState } from "react";
import { Bell, BellRing, Heart, Users, Sparkles, MessageCircle, Check } from "lucide-react";
import { useNavigate } from "react-router";
import { MOCK_NOTIFICATIONS } from "../data/mock";
import type { AppNotification } from "../lib/types";

const KIND_ICON: Record<AppNotification["kind"], typeof Bell> = {
  new_post: MessageCircle,
  group_activity: Users,
  bookmark: Heart,
  digest: Sparkles,
  system: BellRing,
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unread = items.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function open_(href: string | undefined, id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setOpen(false);
    if (href) navigate(href);
  }

  return (
    <div className="notif-wrap" ref={wrapRef}>
      <button
        type="button"
        className="app-header-icon-btn"
        aria-label="Notifications"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Bell size={15} strokeWidth={2} />
        {unread > 0 && <span className="app-header-dot" />}
      </button>

      {open && (
        <div className="notif-panel" role="menu" aria-label="Notifications">
          <header className="notif-head">
            <h3>Notifications</h3>
            {unread > 0 && (
              <button type="button" className="notif-mark-all" onClick={markAllRead}>
                <Check size={12} strokeWidth={2.25} />
                Mark all as read
              </button>
            )}
          </header>

          {items.length === 0 ? (
            <div className="notif-empty">You're all caught up.</div>
          ) : (
            <ul className="notif-list">
              {items.map((n) => {
                const Icon = KIND_ICON[n.kind];
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      className="notif-row"
                      data-unread={!n.read || undefined}
                      onClick={() => open_(n.href, n.id)}
                    >
                      {n.avatarUrl ? (
                        <img className="notif-avatar" src={n.avatarUrl} alt="" />
                      ) : (
                        <span className="notif-avatar notif-avatar-icon" data-kind={n.kind}>
                          <Icon size={14} strokeWidth={2} />
                        </span>
                      )}
                      <div className="notif-body">
                        <span className="notif-title">{n.title}</span>
                        <span className="notif-text">{n.body}</span>
                      </div>
                      <span className="notif-time">{timeAgo(n.timestamp)}</span>
                      {!n.read && <span className="notif-dot" aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
