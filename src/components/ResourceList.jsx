import { useState, useEffect } from 'react';
import './ResourceList.css';

export default function ResourceList() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/resources`);
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        const data = await response.json();
        setResources(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) return <div className="resource-list"><p className="loading">Loading resources...</p></div>;
  if (error) return <div className="resource-list"><p className="error">Error: {error}</p></div>;

  return (
    <div className="resource-list">
      <h2>Resurser</h2>
      {resources.length === 0 ? (
        <p>Inga resurser tillagda ännu.</p>
      ) : (
        <div className="cards-container">
          {resources.map((resource) => (
            <div key={resource.id} className="resource-card">
              <div className="resource-card-body">
                <h3>{resource.name}</h3>
                <p className="resource-meta">
                  {resource.type && `${resource.type}`}
                  {resource.type && resource.description && ' — '}
                  {resource.description && `${resource.description}`}
                </p>
                <p className="capacity">Kapacitet: {resource.capacity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
