export const Icon = ({ name, size = 16, stroke = 1.5, ...rest }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", ...rest };
  switch (name) {
    case "compass": return <svg {...props}><circle cx="12" cy="12" r="9.5" /><polygon points="16,8 13,13 8,16 11,11" fill="currentColor" stroke="none" /></svg>;
    case "arrow-right": return <svg {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>;
    case "arrow-left": return <svg {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="11 6 5 12 11 18" /></svg>;
    case "check": return <svg {...props}><polyline points="4 12 10 18 20 6" /></svg>;
    case "cpu": return <svg {...props}><rect x="5" y="5" width="14" height="14" rx="1" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="2" x2="9" y2="5" /><line x1="15" y1="2" x2="15" y2="5" /><line x1="9" y1="19" x2="9" y2="22" /><line x1="15" y1="19" x2="15" y2="22" /><line x1="2" y1="9" x2="5" y2="9" /><line x1="2" y1="15" x2="5" y2="15" /><line x1="19" y1="9" x2="22" y2="9" /><line x1="19" y1="15" x2="22" y2="15" /></svg>;
    case "satellite": return <svg {...props}><path d="M5 5l5 5" /><path d="M14 14l5 5" /><path d="M3 11a8 8 0 0 1 8 8" /><path d="M3 7a12 12 0 0 1 12 12" /><rect x="13" y="3" width="8" height="8" rx="1" transform="rotate(45 17 7)" /></svg>;
    case "shield": return <svg {...props}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><polyline points="9 12 11.5 14.5 15.5 10.5" /></svg>;
    case "share": return <svg {...props}><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="5" r="2.5" /><circle cx="18" cy="19" r="2.5" /><line x1="8" y1="11" x2="16" y2="6.5" /><line x1="8" y1="13" x2="16" y2="17.5" /></svg>;
    case "refresh": return <svg {...props}><polyline points="3 4 3 9 8 9" /><polyline points="21 20 21 15 16 15" /><path d="M3 9a9 9 0 0 1 15-3.5L21 8" /><path d="M21 15a9 9 0 0 1-15 3.5L3 16" /></svg>;
    case "download": return <svg {...props}><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /><line x1="12" y1="3" x2="12" y2="15" /><polyline points="7 10 12 15 17 10" /></svg>;
    case "star": return <svg {...props}><polygon points="12 3 14.7 9.3 21.5 9.9 16.4 14.6 17.9 21 12 17.7 6.1 21 7.6 14.6 2.5 9.9 9.3 9.3" /></svg>;
    case "search": return <svg {...props}><circle cx="11" cy="11" r="6.5" /><line x1="20" y1="20" x2="16" y2="16" /></svg>;
    case "send": return <svg {...props}><path d="M3 12l18-8-7 18-3-8-8-2z" /></svg>;
    case "lock": return <svg {...props}><rect x="5" y="11" width="14" height="10" rx="1" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
    case "scale": return <svg {...props}><path d="M12 4v17" /><path d="M5 21h14" /><path d="M5 8l3 9h-6z" fill="currentColor" fillOpacity=".15" /><path d="M16 8l3 9h-6z" fill="currentColor" fillOpacity=".15" /><path d="M5 8h14" /></svg>;
    case "globe": return <svg {...props}><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="9" ry="4" /><line x1="12" y1="3" x2="12" y2="21" /></svg>;
    case "leaf": return <svg {...props}><path d="M4 20c0-8 6-14 16-14 0 10-6 16-14 16-1 0-2-1-2-2z" /><path d="M4 20l10-10" /></svg>;
    case "bolt": return <svg {...props}><polygon points="13 2 4 14 11 14 10 22 19 10 13 10 14 2" fill="currentColor" stroke="none" /></svg>;
    case "bank": return <svg {...props}><polyline points="3 9 12 4 21 9" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="6" y1="10" x2="6" y2="18" /><line x1="10" y1="10" x2="10" y2="18" /><line x1="14" y1="10" x2="14" y2="18" /><line x1="18" y1="10" x2="18" y2="18" /><line x1="3" y1="20" x2="21" y2="20" /></svg>;
    case "clock": return <svg {...props}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" /></svg>;
    case "target": return <svg {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>;
    case "chip": return <svg {...props}><rect x="6" y="3" width="12" height="18" rx="1" /><line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="9" y1="15" x2="15" y2="15" /></svg>;
    case "drop": return <svg {...props}><path d="M12 3c4 5 7 8 7 12a7 7 0 1 1-14 0c0-4 3-7 7-12z" /></svg>;
    default: return null;
  }
};

export const BrandMark = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4FA6FF" strokeWidth="1.5">
    <circle cx="12" cy="12" r="8" />
    <polygon points="15,9 12,12 9,15 12,12" fill="#4FA6FF" stroke="none" />
    <polygon points="9,9 12,12 15,15 12,12" fill="#2E8DFF" stroke="none" opacity="0.5" />
    <circle cx="12" cy="12" r="1.2" fill="#04081A" />
  </svg>
);

export const Spark = ({ values = [], width = 80, height = 22, color = "var(--ac-bright)" }) => {
  if (!values.length) return null;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  const points = values.map((v, i) => `${(i * stepX).toFixed(1)},${(height - ((v - min) / range) * (height - 4) - 2).toFixed(1)}`).join(" ");
  return (
    <svg width={width} height={height}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};
