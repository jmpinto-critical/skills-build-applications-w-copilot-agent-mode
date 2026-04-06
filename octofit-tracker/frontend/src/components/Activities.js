import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: error fetching data', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="container py-4">
      <div className="card component-card">
        <div className="card-header bg-success text-white d-flex align-items-center">
          <span className="me-2">🏃</span>
          <h4 className="mb-0">Activities</h4>
          {!loading && <span className="badge bg-light text-success ms-auto">{activities.length} records</span>}
        </div>
        <div className="card-body p-0">
          {error && <div className="alert alert-danger m-3">{error}</div>}
          {loading ? (
            <div className="octofit-spinner">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : activities.length === 0 ? (
            <p className="text-muted text-center py-4">No activities found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Activity Type</th>
                    <th>Duration (min)</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td><span className="badge bg-secondary">{activity.id}</span></td>
                      <td><strong>{activity.user}</strong></td>
                      <td><span className="badge bg-success-subtle text-success-emphasis">{activity.activity_type}</span></td>
                      <td>{activity.duration} min</td>
                      <td>{activity.date}</td>
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

export default Activities;
