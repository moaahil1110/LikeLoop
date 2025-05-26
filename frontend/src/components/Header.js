import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getAvatarUrl = (avatar) => {
    if (!avatar) return '';
    return avatar;
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/feed" className="logo">
          LikeLoop
        </Link>
        
        <nav className="header-nav">
          <Link to="/feed" className="nav-link">
            Feed
          </Link>
          <Link to="/search" className="nav-link">
            Search
          </Link>
          <Link to={`/profile/${user?.id}`} className="nav-link">
            Profile
          </Link>
        </nav>

        <div className="user-menu">
          <Link to={`/profile/${user?.id}`}>
            {user?.avatar ? (
              <img 
                src={getAvatarUrl(user.avatar)} 
                alt={user.username}
                className="avatar-small"
              />
            ) : (
              <div className="avatar-small" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#f0f0f0',
                color: '#666',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
