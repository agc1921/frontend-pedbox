interface LoaderProps {
  label?: string;
}

export default function Loader({ label = 'Cargando...' }: LoaderProps) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="portal-ring" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
