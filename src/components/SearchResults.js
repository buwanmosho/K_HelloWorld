import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from './VideoCard';
import './SearchResults.css';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // 每页显示的视频数量
  const PAGE_SIZE = 8;

  // 模拟更多搜索结果数据
  const mockVideos = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    title: `搜索结果视频 ${index + 1}`,
    thumbnail: 'https://via.placeholder.com/280x157',
    channel: `频道 ${index + 1}`,
    views: `${Math.floor(Math.random() * 10)}万次观看`,
    timestamp: `${Math.floor(Math.random() * 30)}天前`,
    description: `这是第 ${index + 1} 个与搜索相关的视频...`
  }));

  useEffect(() => {
    setLoading(true);
    
    // 模拟API搜索请求
    setTimeout(() => {
      // 过滤包含搜索关键词的视频
      const filteredVideos = mockVideos.filter(video => 
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase())
      );

      // 计算总页数
      setTotalPages(Math.ceil(filteredVideos.length / PAGE_SIZE));

      // 获取当前页的视频
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      setResults(filteredVideos.slice(startIndex, endIndex));
      
      setLoading(false);
    }, 500);
  }, [query, currentPage]);

  // 处理页码变化
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ q: query, page: newPage.toString() });
      window.scrollTo(0, 0);
    }
  };

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="search-results">
      <h2>搜索结果: {query}</h2>
      {loading ? (
        <div className="loading">加载中...</div>
      ) : results.length > 0 ? (
        <>
          <div className="results-grid">
            {results.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          
          <div className="pagination">
            <button 
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              上一页
            </button>
            
            {getPageNumbers().map(pageNum => (
              <button
                key={pageNum}
                className={`pagination-btn ${pageNum === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              下一页
            </button>
          </div>
        </>
      ) : (
        <div className="no-results">
          没有找到相关视频
        </div>
      )}
    </div>
  );
}

export default SearchResults; 