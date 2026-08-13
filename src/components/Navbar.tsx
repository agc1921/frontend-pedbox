import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout, email } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="portal-mark" aria-hidden="true" />
        <div>
          <p className="navbar__title">Rick&mortyPedia</p>
        </div>
      </div>
      <nav className="navbar__links">
        <NavLink to="/characters" className={({ isActive }) => (isActive ? 'active' : '')}>
          Characters
        </NavLink>
        <NavLink to="/locations" className={({ isActive }) => (isActive ? 'active' : '')}>
          Locations
        </NavLink>
        <NavLink to="/episodes" className={({ isActive }) => (isActive ? 'active' : '')}>
          Episodes
        </NavLink>
      </nav>
      <div className="navbar__user">
        {email && <span className="navbar__email">{email}</span>}
        <button className="btn btn--ghost" onClick={handleLogout} type="button">
          Salir
        </button>
      </div>
    </header>
  );
}
