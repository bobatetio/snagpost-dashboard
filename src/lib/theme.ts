import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "socialpulse.theme.v1";

function readInitial(): Theme {
  // Dark is the default — light is opt-in via the sidebar toggle.
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch { /* fall through */ }
  return "dark";
}

function apply(theme: Theme) {
  const html = document.documentElement;
  if (theme === "light") html.setAttribute("data-theme", "light");
  else html.removeAttribute("data-theme");
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(readInitial);

  useEffect(() => {
    apply(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* ignore */ }
  }, [theme]);

  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}
