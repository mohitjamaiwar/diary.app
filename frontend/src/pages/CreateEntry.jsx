import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateEntry.css';

function CreateEntry() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await axios.post('http://localhost:5000/api/entries', {
        title: title.trim(),
        content: content.trim(),
      });

      navigate('/');
    } catch (err) {
      setError('Failed to create entry');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-entry-container">
      <h2>Create New Entry</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="entry-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter entry title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="200"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Creating...' : 'Create Entry'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEntry;
