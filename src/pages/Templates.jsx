import axios from 'axios';
import { useState } from 'react';

export const Templates = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
      if (e.target.files[0]) {
        setFile(e.target.files[0]);
        setMessage('');
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!file) {
        setMessage('Please select a file first');
        return;
      }
      
      if (!file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
        setMessage('Please select a .docx or .doc file');
        return;
      }
    
      setLoading(true); 
    
      // ✅ Correctly create FormData
      const formData = new FormData();
      formData.append('templateFile', file);  // Make sure the field name matches backend's `upload.single("templateFile")`
    
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REPORT_TEMPLATE}`, 
          formData, 
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    
        console.log(response.data);
        setMessage('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        setMessage('Error uploading file. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
  
    return (
      <div className="file-upload-container bg-gray-100 p-6 rounded-lg shadow-md">
        <h2>Upload DOCX File</h2>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="form-group">
            <input   
              type="file" 
              onChange={handleFileChange} 
              className="bg-white border border-gray-300 rounded p-2 w-full"
              accept=".docx, .doc"
              name="doc"
            />
          </div>
          <button 
            type="submit" 
            className="upload-button my-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    );
  };