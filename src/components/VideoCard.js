import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';

function VideoCard({ video }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [thumbnail, setThumbnail] = useState('');
  const previewTimeoutRef = useRef(null);
  const videoRef = useRef(null);

  // 从视频中获取缩略图
  useEffect(() => {
    const video = document.createElement('video');
    video.src = video.previewUrl || video.previewUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'metadata';

    const generateThumbnail = () => {
      try {
        video.currentTime = 2; // 跳到第2秒
      } catch (error) {
        console.error('Error setting video time:', error);
      }
    };

    video.addEventListener('loadedmetadata', generateThumbnail);

    video.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
        setThumbnail(thumbnailUrl);
      } catch (error) {
        console.error('Error generating thumbnail:', error);
      } finally {
        video.remove();
      }
    });

    video.addEventListener('error', (e) => {
      console.error('Error loading video:', e);
      video.remove();
    });

    return () => {
      video.remove();
    };
  }, [video.previewUrl]);

  const handleMouseEnter = () => {
    previewTimeoutRef.current = setTimeout(() => {
      setIsHovering(true);
      setIsLoading(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }
    setIsHovering(false);
    setIsLoading(false);
    setCurrentTime(0);
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Link 
      to={`/video/${video.id}`} 
      className="video-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="thumbnail-container">
        <img 
          src={thumbnail || `https://picsum.photos/seed/${video.id}/320/180`} // 使用生成的缩略图，如果失败则使用随机图片
          alt={video.title}
          className={isHovering ? 'thumbnail hidden' : 'thumbnail'}
        />
        {isHovering && (
          <div className="video-preview">
            {isLoading && (
              <div className="preview-loading">
                <div className="loading-spinner"></div>
              </div>
            )}
            <video
              ref={videoRef}
              src={video.previewUrl}
              autoPlay
              muted
              loop
              className="preview-video"
              onLoadedData={handleVideoLoaded}
              onTimeUpdate={handleTimeUpdate}
            />
            <div className="preview-overlay">
              <div className="preview-progress">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: videoRef.current 
                      ? `${(currentTime / videoRef.current.duration) * 100}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
              <div className="preview-time">{formatTime(currentTime)}</div>
            </div>
          </div>
        )}
        <div className="video-duration">{video.duration}</div>
      </div>
      <div className="video-info">
        <div className="channel-avatar">
          <img src={`https://via.placeholder.com/36`} alt={video.channel} />
        </div>
        <div className="video-details">
          <h3 className="video-title">{video.title}</h3>
          <p className="channel-name">{video.channel}</p>
          <p className="video-stats">
            {video.views} • {video.timestamp}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard; 