import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchLocations } from '../../api/locations';
import type { Location, Paginated } from '../../api/types';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import Pagination from '../../components/Pagination';

type LoadState = 'loading' | 'error' | 'ready';

export default function LocationsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const search = searchParams.get('search') ?? '';

  const [searchInput, setSearchInput] = useState(search);
  const [result, setResult] = useState<Paginated<Location> | null>(null);
  const [state, setState] = useState<LoadState>('loading');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== search) {
        const next = new URLSearchParams(searchParams);
        if (searchInput) next.set('search', searchInput);
        else next.delete('search');
        next.set('page', '1');
        setSearchParams(next);
      }
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const load = () => {
    setState('loading');
    fetchLocations({ page, limit: 10, search: search || undefined })
      .then((data) => {
        setResult(data);
        setState('ready');
      })
      .catch(() => setState('error'));
  };

  useEffect(load, [page, search]);

  return (
    <section>
      <div className="section-header">
        <h1>Locations</h1>
        <p>Planetas, dimensiones y demás lugares del multiverso.</p>
      </div>

      <div className="filters-row">
        <input
          placeholder="Buscar por nombre"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {state === 'loading' && <Loader label="Cargando locations..." />}
      {state === 'error' && <ErrorState onRetry={load} />}

      {state === 'ready' && result && (
        <>
          <div className="card-grid">
            {result.data.map((location) => (
              <Link to={`/locations/${location.id}`} key={location.id} className="entity-card">
                <div className="entity-card__media">
                  <span className="entity-card__icon">◎</span>
                </div>
                <div className="entity-card__body">
                  <p className="entity-card__title">{location.name}</p>
                  <p className="entity-card__meta">
                    {location.type} · {location.dimension}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {result.data.length === 0 && (
            <p className="entity-card__meta">No se encontraron locations.</p>
          )}

          <Pagination
            page={result.meta.page}
            totalPages={result.meta.totalPages}
            onPageChange={(p) => {
              const next = new URLSearchParams(searchParams);
              next.set('page', String(p));
              setSearchParams(next);
            }}
          />
        </>
      )}
    </section>
  );
}