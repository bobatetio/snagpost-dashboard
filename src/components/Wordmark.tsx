interface WordmarkProps {
  size?: number;
}

export function Wordmark({ size = 18 }: WordmarkProps) {
  const markSize = Math.round(size * 1.45);
  return (
    <span className="wordmark">
      <span className="wordmark-mark" style={{ width: markSize, height: markSize }} aria-hidden="true">
        <svg width={Math.round(markSize * 0.55)} height={Math.round(markSize * 0.55)} viewBox="0 0 14 14" fill="none">
          <path
            d="M3.5 2.25h7c.41 0 .75.34.75.75v8.5a.5.5 0 0 1-.79.41L7 9.5l-3.46 2.41a.5.5 0 0 1-.79-.41V3c0-.41.34-.75.75-.75Z"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="wordmark-text" style={{ fontSize: size }}>
        <span className="post">Social</span>
        <span className="grab">Pulse</span>
      </span>
    </span>
  );
}
