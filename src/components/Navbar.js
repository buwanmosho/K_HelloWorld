import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        视频网站
      </Link>
      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="搜索视频..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="navbar-actions">
        <button>上传</button>
        <button>登录</button>
      </div>
    </nav>
  );
}

export default Navbar; 