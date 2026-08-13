import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CharactersListPage from './pages/characters/CharactersListPage';
import CharacterDetailPage from './pages/characters/CharacterDetailPage';
import LocationsListPage from './pages/locations/LocationsListPage';
import LocationDetailPage from './pages/locations/LocationDetailPage';
import EpisodesListPage from './pages/episodes/EpisodesListPage';
import EpisodeDetailPage from './pages/episodes/EpisodeDetailPage';

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="page">{children}</main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/characters" replace />} />

          <Route
            path="/characters"
            element={
              <Layout>
                <CharactersListPage />
              </Layout>
            }
          />
          <Route
            path="/characters/:id"
            element={
              <Layout>
                <CharacterDetailPage />
              </Layout>
            }
          />

          <Route
            path="/locations"
            element={
              <Layout>
                <LocationsListPage />
              </Layout>
            }
          />
          <Route
            path="/locations/:id"
            element={
              <Layout>
                <LocationDetailPage />
              </Layout>
            }
          />

          <Route
            path="/episodes"
            element={
              <Layout>
                <EpisodesListPage />
              </Layout>
            }
          />
          <Route
            path="/episodes/:id"
            element={
              <Layout>
                <EpisodeDetailPage />
              </Layout>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
