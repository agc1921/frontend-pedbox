import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCharacterById } from '../../api/characters';
import type { Character } from '../../api/types';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';
import StatusBadge from '../../components/StatusBadge';

type LoadState = 'loading' | 'error' | 'ready';

export default function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [state, setState] = useState<LoadState>('loading');

  const load = () => {
    if (!id) return;
    setState('loading');
    fetchCharacterById(id)
      .then((data) => {
        setCharacter(data);
        setState('ready');
      })
      .catch(() => setState('error'));
  };

  useEffect(load, [id]);

  return (
    <section className="detail-page">
      <Link to="/characters" className="back-link">
        ← Volver a characters
      </Link>

      {state === 'loading' && <Loader label="Cargando personaje..." />}
      {state === 'error' && <ErrorState onRetry={load} />}

      {state === 'ready' && character && (
        <div className="detail-card">
          <div className="container-detail-card__media">
            <div className="detail-card__media">
              {character.imageUrl ? (
                <img src={character.imageUrl} alt={character.name} />
              ) : (
                <span className="entity-card__icon">◎</span>
              )}
            </div>
          </div>


          <div className="detail-card__header">
            <h1>{character.name}</h1>
            <StatusBadge status={character.status} />
          </div>
          <p className="detail-card__subtitle">
            {character.species} · {character.gender}
          </p>

          <dl className="detail-list">
            <div>
              <dt>Origen</dt>
              <dd>{character.origin?.name ?? 'Desconocido'}</dd>
            </div>
            <div>
              <dt>Ubicación actual</dt>
              <dd>{character.location?.name ?? 'Desconocida'}</dd>
            </div>
          </dl>

          {character.episodes && character.episodes.length > 0 && (
            <div className="detail-tags">
              <p className="detail-tags__label">Episodios ({character.episodes.length})</p>
              <div className="tag-list">
                {character.episodes.map((ep) => (
                  <span className="tag" key={ep.id}>
                    {ep.episode} · {ep.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
