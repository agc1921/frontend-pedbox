import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchEpisodeById } from '../../api/episodes';
import type { Episode } from '../../api/types';
import Loader from '../../components/Loader';
import ErrorState from '../../components/ErrorState';

type LoadState = 'loading' | 'error' | 'ready';

export default function EpisodeDetailPage() {
  const { id } = useParams();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [state, setState] = useState<LoadState>('loading');

  const load = () => {
    if (!id) return;
    setState('loading');
    fetchEpisodeById(id)
      .then((data) => {
        setEpisode(data);
        setState('ready');
      })
      .catch(() => setState('error'));
  };

  useEffect(load, [id]);

  return (
    <section className="detail-page">
      <Link to="/episodes" className="back-link">
        ← Volver a episodes
      </Link>

      {state === 'loading' && <Loader label="Cargando episodio..." />}
      {state === 'error' && <ErrorState onRetry={load} />}

      {state === 'ready' && episode && (
        <div className="detail-card">
          <div className="container-detail-card__media">
            <div className="detail-card__media">
              <span className="entity-card__icon">▶</span>
            </div>
          </div>

          <div className="detail-card__header">
            <h1>{episode.name}</h1>
          </div>
          <p className="detail-card__subtitle">
            {episode.episode} · {episode.airDate}
          </p>

          <div className="detail-tags">
            <p className="detail-tags__label">
              Personajes en este episodio ({episode.characters?.length ?? 0})
            </p>
            <div className="tag-list">
              {episode.characters && episode.characters.length > 0 ? (
                episode.characters.map((character) => (
                  <Link to={`/characters/${character.id}`} key={character.id} className="tag">
                    {character.name}
                  </Link>
                ))
              ) : (
                <p className="entity-card__meta">Sin personajes registrados.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
