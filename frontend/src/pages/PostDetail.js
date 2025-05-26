import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        const postData = response.data.post;
        setPost(postData);
        setIsLiked(postData.isLiked || false);
        setLikeCount(postData.likeCount || 0);
        setComments(postData.comments || []);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/posts/${id}/like`);
      setIsLiked(response.data.isLiked);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentLoading(true);
    try {
      const response = await axios.post(`/api/posts/${id}/comment`, {
        text: commentText
      });
      
      setComments([...comments, response.data.comment]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await axios.delete(`/api/posts/${id}`);
      navigate('/feed');
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post');
    }
  };

  const formatDate = (date) => {
    const postDate = new Date(date);
    return postDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAvatarUrl = (avatar) => {
    if (!avatar) return '';
    return avatar;
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="feed-container">
        <div className="error-message">
          {error}
        </div>
        <Link to="/feed" className="btn-secondary" style={{ marginTop: '20px', display: 'inline-block' }}>
          Back to Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="feed-container">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="post">
        <div className="post-header">
          {post?.user?.avatar ? (
            <img 
              src={getAvatarUrl(post.user.avatar)} 
              alt={post.user.username}
              className="post-avatar"
            />
          ) : (
            <div className="post-avatar" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#f0f0f0',
              color: '#666',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {post?.user?.username?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="post-user-info">
            <Link to={`/profile/${post?.user?._id}`} className="post-username">
              {post?.user?.username}
            </Link>
            <div className="post-date">
              {formatDate(post?.createdAt)}
            </div>
          </div>
          
          {post?.user?._id === currentUser?.id && (
            <button 
              onClick={handleDeletePost}
              style={{
                background: 'none',
                border: 'none',
                color: '#666',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '5px'
              }}
              title="Delete post"
            >
              🗑️
            </button>
          )}
        </div>

        <img 
          src={post?.image?.url} 
          alt="Post content" 
          className="post-image"
        />

        <div className="post-content">
          <div className="post-actions">
            <button 
              onClick={handleLike} 
              className={`action-btn ${isLiked ? 'liked' : ''}`}
            >
              {isLiked ? '♥' : '♡'} {likeCount}
            </button>
            <span className="action-btn">
              💬 {comments.length}
            </span>
          </div>

          {post?.caption && (
            <div className="post-caption">
              <span className="post-caption-username">{post.user?.username}</span>
              {post.caption}
            </div>
          )}

          <div className="comments-section">
            <h3 style={{ marginBottom: '15px', fontSize: '16px' }}>Comments</h3>
            
            {comments.length === 0 ? (
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
                No comments yet. Be the first to comment!
              </p>
            ) : (
              <div style={{ marginBottom: '20px' }}>
                {comments.map((comment, index) => (
                  <div key={comment._id || index} className="comment">
                    <Link 
                      to={`/profile/${comment.user?._id}`}
                      className="comment-username"
                      style={{ color: '#000', textDecoration: 'none' }}
                    >
                      {comment.user?.username}
                    </Link>
                    <span className="comment-text">
                      {comment.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleComment} className="comment-form">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="comment-input"
                maxLength={500}
              />
              <button 
                type="submit" 
                className="comment-btn"
                disabled={!commentText.trim() || commentLoading}
              >
                {commentLoading ? '...' : 'Post'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/feed" className="btn-secondary">
          Back to Feed
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
