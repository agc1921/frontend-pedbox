import axiosClient from './axiosClient';
import type { Location, Paginated } from './types';

export interface LocationsQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}

export const fetchLocations = (query: LocationsQuery = {}) =>
  axiosClient
    .get<Paginated<Location>>('/locations', { params: query })
    .then((res) => res.data);

export const fetchLocationById = (id: string | number) =>
  axiosClient.get<Location>(`/locations/${id}`).then((res) => res.data);