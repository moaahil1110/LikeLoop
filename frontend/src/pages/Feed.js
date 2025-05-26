import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [newPost, setNewPost] = useState({
    image: null,
    caption: '',
    imagePreview: null
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      setError('');
      setNewPost({
        ...newPost,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleCaptionChange = (e) => {
    setNewPost({
      ...newPost,
      caption: e.target.value
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    
    if (!newPost.image) {
      setError('Please select an image');
      return;
    }

    setCreatePostLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', newPost.image);
    formData.append('caption', newPost.caption);

    try {
      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Add new post to the beginning of the posts array
      setPosts([response.data.post, ...posts]);
      
      // Reset form
      setNewPost({
        image: null,
        caption: '',
        imagePreview: null
      });
      
      // Reset file input
      const fileInput = document.getElementById('image-upload');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.response?.data?.message || 'Failed to create post');
    } finally {
      setCreatePostLoading(false);
    }
  };

  const handlePostUpdate = (postId, updates) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post._id === postId ? { ...post, ...updates } : post
      )
    );
  };

  const clearImagePreview = () => {
    setNewPost({
      image: null,
      caption: '',
      imagePreview: null
    });
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading feed...</p>
      </div>
    );
  }

  return (
    <div className="feed-container">
      {/* Create Post Form */}
      <div className="create-post">
        <h2 className="create-post-title">Share a moment</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleCreatePost}>
          <div className="file-input-container">
            {newPost.imagePreview ? (
              <div style={{ position: 'relative' }}>
                <img 
                  src={newPost.imagePreview} 
                  alt="Preview" 
                  className="image-preview"
                />
                <button
                  type="button"
                  onClick={clearImagePreview}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ×
                </button>
              </div>
            ) : (
              <label htmlFor="image-upload" className="file-input-label">
                <div>
                  📷
                  <p>Click to select an image</p>
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Max file size: 5MB
                  </p>
                </div>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="file-input"
                />
              </label>
            )}
          </div>

          <div className="form-group">
            <textarea
              value={newPost.caption}
              onChange={handleCaptionChange}
              placeholder="Write a caption..."
              className="form-textarea"
              maxLength={2000}
            />
            <div style={{ fontSize: '12px', color: '#666', textAlign: 'right', marginTop: '5px' }}>
              {newPost.caption.length}/2000
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={!newPost.image || createPostLoading}
          >
            {createPostLoading ? 'Sharing...' : 'Share Post'}
          </button>
        </form>
      </div>

      {/* Posts Feed */}
      {posts.length === 0 ? (
        <div className="text-center" style={{ padding: '40px', color: '#666' }}>
          <h3>No posts yet</h3>
          <p>Be the first to share a photo!</p>
        </div>
      ) : (
        posts.map(post => (
          <Post 
            key={post._id} 
            post={post} 
            onPostUpdate={handlePostUpdate}
          />
        ))
      )}
    </div>
  );
};

export default Feed;
