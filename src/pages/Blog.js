import React, { useState } from 'react';
import './Blog.css'; // Import the CSS file for styling

const blogs = [
  {
    id: 1,
    title: 'How to Run a Successful Bingo Night',
    description: 'Learn tips and tricks for hosting a fun and engaging bingo night.',
    content: 'This is the full content of the blog about running a successful bingo night.',
  },
  {
    id: 2,
    title: 'The History of Pull Tabs',
    description: 'Discover the origins and evolution of pull tabs in gaming.',
    content: 'This is the full content of the blog about the history of pull tabs.',
  },
  {
    id: 3,
    title: 'Top 10 Bingo Supplies for Your Club',
    description: 'A list of essential bingo supplies for your club.',
    content: 'This is the full content of the blog about top bingo supplies.',
  },
];

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null); // State to track the selected blog

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog); // Set the selected blog
  };

  const handleBackClick = () => {
    setSelectedBlog(null); // Reset to show the list of blogs
  };

  return (
    <div className="blog-container">
      {!selectedBlog ? (
        <>
          <h1 className="blog-title">Our Blogs</h1>
          <ul className="blog-list">
            {blogs.map((blog) => (
              <li key={blog.id} className="blog-item">
                <button
                  onClick={() => handleBlogClick(blog)}
                  className="blog-link"
                >
                  <h2>{blog.title}</h2>
                  <p>{blog.description}</p>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="blog-content">
          <h1>{selectedBlog.title}</h1>
          <p>{selectedBlog.content}</p>
          <button onClick={handleBackClick} className="back-button">
            Back to Blogs
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;