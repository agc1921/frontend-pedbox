interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Parece que hubo un fallo interdimensional. Intenta de nuevo.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="error-state" role="alert">
      <p className="error-state__title">No pudimos cargar los datos</p>
      <p className="error-state__message">{message}</p>
      {onRetry && (
        <button className="btn btn--primary" onClick={onRetry} type="button">
          Reintentar
        </button>
      )}
    </div>
  );
}
