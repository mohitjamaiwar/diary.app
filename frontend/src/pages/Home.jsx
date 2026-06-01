import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/entries');
      setEntries(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch entries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-container">
      <h2>My Diary Entries</h2>
      {entries.length === 0 ? (
        <p className="empty-state">No entries yet. <Link to="/create">Create one now!</Link></p>
      ) : (
        <div className="entries-grid">
          {entries.map((entry) => (
            <Link to={`/entry/${entry.id}`} key={entry.id} className="entry-card">
              <h3>{entry.title}</h3>
              <p className="entry-date">
                {new Date(entry.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p className="entry-content">
                {entry.content.substring(0, 100)}...
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
