import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Post = ({ post, onPostUpdate }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getAvatarUrl = (avatar) => {
    if (!avatar) return '';
    return avatar;
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/posts/${post._id}/like`);
      setIsLiked(response.data.isLiked);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`/api/posts/${post._id}/comment`, {
        text: commentText
      });
      
      setComments([...comments, response.data.comment]);
      setCommentText('');
      
      if (onPostUpdate) {
        onPostUpdate(post._id, { commentCount: response.data.commentCount });
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        {post.user?.avatar ? (
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
            {post.user?.username?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="post-user-info">
          <Link to={`/profile/${post.user?._id}`} className="post-username">
            {post.user?.username}
          </Link>
          <div className="post-date">
            {formatDate(post.createdAt)}
          </div>
        </div>
      </div>

      <img 
        src={post.image?.url} 
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

        {post.caption && (
          <div className="post-caption">
            <span className="post-caption-username">{post.user?.username}</span>
            {post.caption}
          </div>
        )}

        {comments.length > 0 && (
          <div className="comments-section">
            {comments.slice(-3).map((comment, index) => (
              <div key={comment._id || index} className="comment">
                <span className="comment-username">
                  {comment.user?.username}
                </span>
                <span className="comment-text">
                  {comment.text}
                </span>
              </div>
            ))}
            {comments.length > 3 && (
              <Link to={`/post/${post._id}`} style={{ 
                fontSize: '14px', 
                color: '#666', 
                textDecoration: 'none' 
              }}>
                View all {comments.length} comments
              </Link>
            )}
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
            disabled={!commentText.trim() || loading}
          >
            {loading ? '...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
