import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: error fetching data', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="container py-4">
      <div className="card component-card">
        <div className="card-header bg-warning text-dark d-flex align-items-center">
          <span className="me-2">🤝</span>
          <h4 className="mb-0">Teams</h4>
          {!loading && <span className="badge bg-dark text-warning ms-auto">{teams.length} records</span>}
        </div>
        <div className="card-body p-0">
          {error && <div className="alert alert-danger m-3">{error}</div>}
          {loading ? (
            <div className="octofit-spinner">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : teams.length === 0 ? (
            <p className="text-muted text-center py-4">No teams found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>Members</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => {
                    const memberList = Array.isArray(team.members) ? team.members : [];
                    return (
                      <tr key={team.id}>
                        <td><span className="badge bg-secondary">{team.id}</span></td>
                        <td><strong>{team.name}</strong></td>
                        <td>
                          {memberList.map((m) => (
                            <span key={m} className="badge bg-warning text-dark me-1">{m}</span>
                          ))}
                        </td>
                        <td><span className="badge bg-dark">{memberList.length}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
