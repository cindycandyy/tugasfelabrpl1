"use client";

import Image from './image.png';
import styles from './page.module.css';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  text: string;
  likes: number;
}

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    if (savedPosts.length > 0) {
      setPosts(savedPosts);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);
  
  const addPost = () => {
    if (newPost.trim()) {
      setPosts([...posts, { id: Date.now(), text: newPost, likes: 0 }]);
      setNewPost("");
    }
  };
  
  const deletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };
  
  const editPost = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };
  
  const saveEdit = (id: number) => {
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, text: editText } : post))
    );
    setEditingId(null);
    setEditText("");
  };
  
  const likePost = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };
  
  return (
    <div className="container">
      <h1>Love Me💖</h1>
      <div className="input-area">
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Tulis sesuatu..."
        />
        <button onClick={addPost}>Post</button>
      </div>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            {editingId === post.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="save-btn" onClick={() => saveEdit(post.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{post.text}</span>
                <div>
                  <button className="like-btn" onClick={() => likePost(post.id)}>❤️ {post.likes}</button>
                  <button className="edit-btn" onClick={() => editPost(post.id, post.text)}>Edit</button>
                  <button className="delete-btn" onClick={() => deletePost(post.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}