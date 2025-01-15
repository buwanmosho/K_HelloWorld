import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './VideoPage.css';

function VideoPage() {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: '用户1',
      avatar: 'https://via.placeholder.com/32',
      content: '非常好的视频！',
      timestamp: '2天前',
      likes: 15
    },
    {
      id: 2,
      user: '用户2',
      avatar: 'https://via.placeholder.com/32',
      content: '学到了很多，感谢分享',
      timestamp: '1天前',
      likes: 8
    }
  ]);

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      user: '当前用户',
      avatar: 'https://via.placeholder.com/32',
      content: comment,
      timestamp: '刚刚',
      likes: 0
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  const handleLike = (videoId) => {
    // TODO: 实现点赞功能
    console.log('点赞视频:', videoId);
  };

  const handleShare = () => {
    // TODO: 实现分享功能
    console.log('分享视频');
  };

  return (
    <div className="video-page">
      <div className="video-container">
        <div className="video-player">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            width="100%"
            height="100%"
            controls
            playing
          />
        </div>
        <div className="video-details">
          <h1>视频标题</h1>
          <div className="video-stats">
            <span>10万次观看</span>
            <span>2024年3月1日</span>
            <div className="video-actions">
              <button onClick={() => handleLike(id)}>
                <i className="fas fa-thumbs-up"></i> 点赞
              </button>
              <button onClick={handleShare}>
                <i className="fas fa-share"></i> 分享
              </button>
            </div>
          </div>
          <div className="channel-info">
            <img src="https://via.placeholder.com/48" alt="频道头像" />
            <div className="channel-details">
              <h3>频道名称</h3>
              <p>100万订阅</p>
            </div>
            <button className="subscribe-btn">订阅</button>
          </div>
          <div className="video-description">
            <p>这是视频描述...</p>
          </div>

          {/* 评论区 */}
          <div className="comments-section">
            <h3>评论</h3>
            <form onSubmit={handleComment} className="comment-form">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="添加评论..."
              />
              <button type="submit">发布</button>
            </form>
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <img src={comment.avatar} alt={comment.user} className="comment-avatar" />
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-user">{comment.user}</span>
                      <span className="comment-timestamp">{comment.timestamp}</span>
                    </div>
                    <p>{comment.content}</p>
                    <div className="comment-actions">
                      <button>
                        <i className="fas fa-thumbs-up"></i> {comment.likes}
                      </button>
                      <button>回复</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage; 