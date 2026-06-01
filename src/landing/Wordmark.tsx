export function Wordmark({ light = false, size = 28 }: { light?: boolean; size?: number }) {
  const box = Math.round(size * 1.55);
  return (
    <span className="inline-flex items-center gap-2.5 font-bold tracking-tight">
      <span
        className="grid place-items-center rounded-[10px] bg-gradient-to-br from-brand to-brand-mid text-white"
        style={{ width: box, height: box }}
        aria-hidden
      >
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24">
          <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <line x1="12" y1="2.5" x2="12" y2="21.5" />
            <line x1="2.5" y1="12" x2="21.5" y2="12" />
            <line x1="5.3" y1="5.3" x2="18.7" y2="18.7" />
            <line x1="18.7" y1="5.3" x2="5.3" y2="18.7" />
          </g>
        </svg>
      </span>
      <span style={{ fontSize: size * 0.92 }} className={light ? "text-white" : "text-ink"}>
        Social<span className={light ? "text-white" : "text-brand"}>Pulse</span>
      </span>
    </span>
  );
}
