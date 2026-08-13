interface StatusInfo {
  label: string;
  className: string;
}

const STATUS_MAP: Record<string, StatusInfo> = {
  Alive: { label: 'Alive', className: 'status-dot--alive' },
  Dead: { label: 'Dead', className: 'status-dot--dead' },
  unknown: { label: 'Unknown', className: 'status-dot--unknown' },
};

export default function StatusBadge({ status }: { status: string }) {
  const info = STATUS_MAP[status] ?? STATUS_MAP.unknown;
  return (
    <span className="status-badge">
      <span className={`status-dot ${info.className}`} aria-hidden="true" />
      {info.label}
    </span>
  );
}
