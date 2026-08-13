export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  characters?: Character[];
}

export interface Episode {
  id: number;
  name: string;
  airDate: string;
  episode: string;
  characters?: Character[];
}

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown' | string;
  species: string;
  type: string;
  gender: string;
  imageUrl?: string;
  origin?: Location | null;
  location?: Location | null;
  episodes?: Episode[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}
