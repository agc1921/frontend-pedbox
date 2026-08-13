import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchLocationById } from '../../api/locations';
import type { Location } from '../../api/types';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import StatusBadge from '../../components/StatusBadge';

type LoadState = 'loading' | 'error' | 'ready';

export default function LocationDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [state, setState] = useState<LoadState>('loading');

  const load = () => {
    if (!id) return;
    setState('loading');
    fetchLocationById(id)
      .then((data) => {
        setLocation(data);
        setState('ready');
      })
      .catch(() => setState('error'));
  };

  useEffect(load, [id]);

  return (
    <section className="detail-page">
      <Link to="/locations" className="back-link">
        ← Volver a locations
      </Link>

      {state === 'loading' && <Loader label="Cargando location..." />}
      {state === 'error' && <ErrorState onRetry={load} />}

      {state === 'ready' && location && (
        <div className="detail-card">
          <div className="container-detail-card__media">
            <div className="detail-card__media">
              <span className="entity-card__icon">◎</span>
            </div>
          </div>

          <div className="detail-card__header">
            <h1>{location.name}</h1>
          </div>
          <p className="detail-card__subtitle">
            {location.type} · {location.dimension}
          </p>

          <div className="detail-tags">
            <p className="detail-tags__label">
              Residentes ({location.characters?.length ?? 0})
            </p>
            <div className="tag-list">
              {location.characters && location.characters.length > 0 ? (
                location.characters.map((character) => (
                  <Link to={`/characters/${character.id}`} key={character.id} className="tag">
                    <StatusBadge status={character.status} /> {character.name}
                  </Link>
                ))
              ) : (
                <p className="entity-card__meta">Sin residentes registrados.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
