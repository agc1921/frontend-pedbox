import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchEpisodes } from '../../api/episodes';
import type { Episode, Paginated } from '../../api/types';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import Pagination from '../../components/Pagination';

type LoadState = 'loading' | 'error' | 'ready';

export default function EpisodesListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const search = searchParams.get('search') ?? '';

  const [searchInput, setSearchInput] = useState(search);
  const [result, setResult] = useState<Paginated<Episode> | null>(null);
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
    fetchEpisodes({ page, limit: 10, search: search || undefined })
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
        <h1>Episodes</h1>
        <p>La cronología completa de Rick y Morty.</p>
      </div>

      <div className="filters-row">
        <input
          placeholder="Buscar por nombre"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {state === 'loading' && <Loader label="Cargando episodios..." />}
      {state === 'error' && <ErrorState onRetry={load} />}

      {state === 'ready' && result && (
        <>
          <div className="card-grid">
            {result.data.map((episode) => (
              <Link to={`/episodes/${episode.id}`} key={episode.id} className="entity-card">
                <div className="entity-card__media">
                  <span className="entity-card__icon">▶</span>
                </div>
                <div className="entity-card__body">
                  <p className="entity-card__title">{episode.name}</p>
                  <p className="entity-card__meta">
                    {episode.episode} · {episode.airDate}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {result.data.length === 0 && (
            <p className="entity-card__meta">No se encontraron episodios.</p>
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