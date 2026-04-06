import React, { useState, useEffect } from 'react';

const MEDAL = ['🥇', '🥈', '🥉'];

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        setLeaderboard(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: error fetching data', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="container py-4">
      <div className="card component-card">
        <div className="card-header bg-danger text-white d-flex align-items-center">
          <span className="me-2">🏆</span>
          <h4 className="mb-0">Leaderboard</h4>
          {!loading && <span className="badge bg-light text-danger ms-auto">{leaderboard.length} records</span>}
        </div>
        <div className="card-body p-0">
          {error && <div className="alert alert-danger m-3">{error}</div>}
          {loading ? (
            <div className="octofit-spinner">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : leaderboard.length === 0 ? (
            <p className="text-muted text-center py-4">No leaderboard data found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id} className={index === 0 ? 'table-warning' : ''}>
                      <td>
                        {index < 3
                          ? <span className="fs-5">{MEDAL[index]}</span>
                          : <span className="badge bg-secondary">{index + 1}</span>}
                      </td>
                      <td><strong>{entry.user}</strong></td>
                      <td>
                        <span className="badge bg-danger fs-6">{entry.score}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
