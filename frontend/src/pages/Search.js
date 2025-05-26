import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim().length < 2) {
      setError('Search query must be at least 2 characters');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`/api/users/search?q=${encodeURIComponent(query.trim())}`);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  const getAvatarUrl = (avatar) => {
    if (!avatar) return null;
    return avatar.startsWith('http') ? avatar : `${avatar}`;
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Search Users</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by username..."
              className="form-input"
              minLength={2}
            />
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading || query.trim().length < 2}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="search-results">
        {users.length === 0 && query && !loading && (
          <div className="no-results">
            <p>No users found matching "{query}"</p>
          </div>
        )}

        {users.map(user => (
          <Link key={user._id} to={`/profile/${user._id}`} className="search-result-item">
            <div className="search-result-avatar">
              {user.avatar ? (
                <img 
                  src={getAvatarUrl(user.avatar)} 
                  alt={user.username}
                />
              ) : (
                <div className="avatar-placeholder">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="search-result-info">
              <h3 className="search-result-username">{user.username}</h3>
              {user.bio && (
                <p className="search-result-bio">{user.bio}</p>
              )}
              <p className="search-result-followers">
                {user.followerCount || 0} followers
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
