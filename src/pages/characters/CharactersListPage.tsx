import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchCharacters } from '../../api/characters';
import type { Character, Paginated } from '../../api/types';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import Pagination from '../../components/Pagination';
import StatusBadge from '../../components/StatusBadge';

type LoadState = 'loading' | 'error' | 'ready';

export default function CharactersListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const search = searchParams.get('search') ?? '';

  const [searchInput, setSearchInput] = useState(search);
  const [result, setResult] = useState<Paginated<Character> | null>(null);
  const [state, setState] = useState<LoadState>('loading');

  // Debounce: espera 400ms sin teclear antes de actualizar la URL/búsqueda
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
    fetchCharacters({ page, limit: 10, search: search || undefined })
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
        <h1>Characters</h1>
        <p>Explora los habitantes del multiverso.</p>
      </div>

      <div className="filters-row">
        <input
          placeholder="Buscar por nombre"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {state === 'loading' && <Loader label="Cargando personajes..." />}
      {state === 'error' && <ErrorState onRetry={load} />}

      {state === 'ready' && result && (
        <>
          <div className="card-grid">
            {result.data.map((character) => (
              <Link to={`/characters/${character.id}`} key={character.id} className="entity-card">
                <div className="entity-card__media">
                  {character.imageUrl ? (
                    <img src={character.imageUrl} alt={character.name} />
                  ) : (
                    <span className="entity-card__icon">◎</span>
                  )}
                </div>
                <div className="entity-card__body">
                  <p className="entity-card__title">{character.name}</p>
                  <StatusBadge status={character.status} />
                  <p className="entity-card__meta">{character.species}</p>
                </div>
              </Link>
            ))}
          </div>

          {result.data.length === 0 && (
            <p className="entity-card__meta">No se encontraron personajes.</p>
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