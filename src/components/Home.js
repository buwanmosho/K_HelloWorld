import React from 'react';
import VideoCard from './VideoCard';
import './Home.css';

function Home() {
  const videos = [
    {
      id: 1,
      title: '美丽的自然风光',
      previewUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      channel: '自然探索',
      views: '1.2万次观看',
      timestamp: '3天前',
      duration: '3:45'
    },
    {
      id: 2,
      title: '城市生活记录',
      previewUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      channel: '城市印象',
      views: '5000次观看',
      timestamp: '1周前',
      duration: '2:30'
    },
    {
      id: 3,
      title: '美食制作教程',
      previewUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      channel: '美食频道',
      views: '8.9万次观看',
      timestamp: '2周前',
      duration: '5:15'
    },
    {
      id: 4,
      title: '旅行日记',
      previewUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      channel: '环球旅行',
      views: '2.5万次观看',
      timestamp: '1个月前',
      duration: '4:20'
    }
  ];

  return (
    <div className="home">
      <div className="videos-grid">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Home; 