import axiosClient from './axiosClient';
import type { Episode, Paginated } from './types';

export interface EpisodesQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}

export const fetchEpisodes = (query: EpisodesQuery = {}) =>
  axiosClient
    .get<Paginated<Episode>>('/episodes', { params: query })
    .then((res) => res.data);

export const fetchEpisodeById = (id: string | number) =>
  axiosClient.get<Episode>(`/episodes/${id}`).then((res) => res.data);