import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownOption<T extends string> {
  id: T;
  label: string;
  prefix?: ReactNode;
}

interface DropdownProps<T extends string> {
  label: string;
  value: T;
  options: DropdownOption<T>[];
  onChange: (next: T) => void;
  align?: "left" | "right";
  searchable?: boolean;
}

export function Dropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  align = "left",
  searchable,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const active = options.find((o) => o.id === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const filtered = searchable && query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  return (
    <div className="dropdown" ref={ref}>
      <button type="button" className="dropdown-trigger" onClick={() => setOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={open}>
        <span className="dropdown-trigger-label">{label}:</span>
        {active.prefix}
        <span>{active.label}</span>
        <ChevronDown size={14} strokeWidth={1.75} />
      </button>
      {open && (
        <div className="dropdown-menu" role="listbox" data-align={align}>
          {searchable && (
            <input
              autoFocus
              className="dropdown-search"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          {filtered.map((o) => (
            <button
              key={o.id}
              type="button"
              role="option"
              aria-selected={o.id === value}
              className="dropdown-option"
              data-active={o.id === value}
              onClick={() => { onChange(o.id); setOpen(false); setQuery(""); }}
            >
              {o.prefix}
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
