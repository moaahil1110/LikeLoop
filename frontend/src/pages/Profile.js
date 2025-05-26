import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    bio: ''
  });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const isOwnProfile = currentUser?.id === id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/profile/${id}`);
        setProfile(response.data.user);
        setEditForm({
          username: response.data.user.username,
          bio: response.data.user.bio || ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`/api/posts/user/${id}`);
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchProfile();
    fetchUserPosts();
  }, [id]);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.put('/api/users/profile', editForm);
      setProfile({ ...profile, ...response.data.user });
      
      // Update current user context if editing own profile
      if (isOwnProfile) {
        updateUser(response.data.user);
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setUploadingAvatar(true);
    setError('');

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.post('/api/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setProfile({ ...profile, avatar: response.data.avatar });
      
      // Update current user context
      if (isOwnProfile) {
        updateUser({ avatar: response.data.avatar });
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setError(error.response?.data?.message || 'Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const getAvatarUrl = (avatar) => {
    if (!avatar) return '';
    return avatar;
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="profile-container">
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="profile-header">
        <div style={{ position: 'relative' }}>
          {profile?.avatar ? (
            <img 
              src={getAvatarUrl(profile.avatar)} 
              alt={profile.username}
              className="profile-avatar"
            />
          ) : (
            <div className="profile-avatar" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#f0f0f0',
              color: '#666',
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              {profile?.username?.charAt(0).toUpperCase()}
            </div>
          )}
          
          {isOwnProfile && (
            <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <label htmlFor="avatar-upload" style={{
                background: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '16px'
              }}>
                {uploadingAvatar ? '...' : '📷'}
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          )}
        </div>

        <div className="profile-info">
          {isEditing ? (
            <form onSubmit={handleEditProfile}>
              <div className="form-group">
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="form-input"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="form-textarea"
                  placeholder="Write a bio..."
                  maxLength={150}
                />
              </div>
              <div className="profile-actions">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h1 className="profile-username">{profile?.username}</h1>
              
              <div className="profile-stats">
                <div className="profile-stat">
                  <span className="profile-stat-number">{posts.length}</span> posts
                </div>
                <div className="profile-stat">
                  <span className="profile-stat-number">{profile?.followerCount || 0}</span> followers
                </div>
                <div className="profile-stat">
                  <span className="profile-stat-number">{profile?.followingCount || 0}</span> following
                </div>
              </div>

              {profile?.bio && (
                <div className="profile-bio">
                  {profile.bio}
                </div>
              )}

              {isOwnProfile && (
                <div className="profile-actions">
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="profile-posts">
        {posts.length === 0 ? (
          <div className="text-center" style={{ 
            gridColumn: '1 / -1', 
            padding: '40px', 
            color: '#666' 
          }}>
            <h3>No posts yet</h3>
            {isOwnProfile ? (
              <p>Share your first photo to get started!</p>
            ) : (
              <p>{profile?.username} hasn't shared any photos yet.</p>
            )}
          </div>
        ) : (
          posts.map(post => (
            <Link key={post._id} to={`/post/${post._id}`} className="profile-post">
              <img 
                src={post.image?.url} 
                alt="Post"
                className="profile-post-image"
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
