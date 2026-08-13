import axiosClient from './axiosClient';
import type { Character, Paginated } from './types';

export interface CharactersQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}

export const fetchCharacters = (query: CharactersQuery = {}) =>
  axiosClient
    .get<Paginated<Character>>('/characters', { params: query })
    .then((res) => res.data);

export const fetchCharacterById = (id: string | number) =>
  axiosClient.get<Character>(`/characters/${id}`).then((res) => res.data);