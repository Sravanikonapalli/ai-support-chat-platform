// components/UploadDocument.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import '../styles.css';

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const navigate = useNavigate(); 
  const token = localStorage.getItem('authToken');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadedFileName('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://ai-support-chat-platform-1.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message) {
        setMessage('File uploaded successfully!');
        setUploadedFileName(file.name);
        setFile(null);
      }
    } catch (error) {
      setMessage('Error uploading file. Please try again.');
      console.error('Error uploading document:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');  
    localStorage.removeItem('authToken'); 
    navigate('/');
    console.log('Navigating to ChatWindow');  
  };

  return (
    <div className="upload-document">
      <h2>Upload a Document</h2>

      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt,.jpg,.png"
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Document'}
      </button>

      {message && <p>{message}</p>}
      {uploadedFileName && <p>Uploaded File: <strong>{uploadedFileName}</strong></p>}

      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UploadDocument;
