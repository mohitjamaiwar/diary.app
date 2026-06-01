import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EntryDetail.css';

function EntryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchEntry();
  }, [id]);

  const fetchEntry = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/entries/${id}`);
      setEntry(response.data);
      setError(null);
    } catch (err) {
      setError('Entry not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      setDeleting(true);
      await axios.delete(`http://localhost:5000/api/entries/${id}`);
      navigate('/');
    } catch (err) {
      setError('Failed to delete entry');
      console.error(err);
      setDeleting(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  if (error) return <div className="error-message">{error}</div>;

  if (!entry) return <div className="error-message">Entry not found</div>;

  return (
    <div className="entry-detail-container">
      <article className="entry-detail">
        <h2>{entry.title}</h2>
        <p className="entry-date">
          {new Date(entry.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="entry-body">
          {entry.content}
        </div>

        <div className="entry-actions">
          <button
            onClick={() => navigate('/')}
            className="back-btn"
          >
            ← Back to Home
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="delete-btn"
          >
            {deleting ? 'Deleting...' : '🗑️ Delete Entry'}
          </button>
        </div>
      </article>
    </div>
  );
}

export default EntryDetail;
