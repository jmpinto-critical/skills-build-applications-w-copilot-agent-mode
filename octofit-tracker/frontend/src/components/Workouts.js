import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: error fetching data', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="container py-4">
      <div className="card component-card">
        <div className="card-header bg-info text-dark d-flex align-items-center">
          <span className="me-2">💪</span>
          <h4 className="mb-0">Workouts</h4>
          {!loading && <span className="badge bg-dark text-info ms-auto">{workouts.length} records</span>}
        </div>
        <div className="card-body p-0">
          {error && <div className="alert alert-danger m-3">{error}</div>}
          {loading ? (
            <div className="octofit-spinner">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : workouts.length === 0 ? (
            <p className="text-muted text-center py-4">No workouts found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Suggested For</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => {
                    const suggestedList = Array.isArray(workout.suggested_for) ? workout.suggested_for : [];
                    return (
                      <tr key={workout.id}>
                        <td><span className="badge bg-secondary">{workout.id}</span></td>
                        <td><strong>{workout.name}</strong></td>
                        <td>{workout.description}</td>
                        <td>
                          {suggestedList.map((s) => (
                            <span key={s} className="badge bg-info text-dark me-1">{s}</span>
                          ))}
                        </td>
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

export default Workouts;
