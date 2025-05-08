// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ChatWindow from './components/ChatWindow';
import UploadDocument from './components/UploadDocument';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for user authentication status when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <h1>AI-Powered Customer Support Chat</h1>

        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/upload" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route path="/" element={<ChatWindow />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/upload"
            element={isAuthenticated ? <UploadDocument /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/upload" />
              ) : (
                <div>
                  <ChatWindow />
                  <a href="/login">
                    <button>Login Here</button>
                  </a>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
