import axiosClient from './axiosClient';

export interface AuthResponse {
  access_token: string;
}

export const registerRequest = (email: string, password: string) =>
  axiosClient
    .post<AuthResponse>('/auth/register', { email, password })
    .then((res) => res.data);

export const loginRequest = (email: string, password: string) =>
  axiosClient
    .post<AuthResponse>('/auth/login', { email, password })
    .then((res) => res.data);
