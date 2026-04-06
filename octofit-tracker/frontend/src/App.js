import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import logo from './logo.svg';
import './App.css';

function Home() {
  const features = [
    { title: 'Users', icon: '👤', description: 'Manage athlete profiles and accounts.', link: '/users', color: 'primary' },
    { title: 'Activities', icon: '🏃', description: 'Log and track workout activities.', link: '/activities', color: 'success' },
    { title: 'Teams', icon: '🤝', description: 'Create and manage fitness teams.', link: '/teams', color: 'warning' },
    { title: 'Leaderboard', icon: '🏆', description: 'Compete and climb the rankings.', link: '/leaderboard', color: 'danger' },
    { title: 'Workouts', icon: '💪', description: 'Discover personalised workout plans.', link: '/workouts', color: 'info' },
  ];

  return (
    <>
      <div className="octofit-hero">
        <img src={logo} alt="OctoFit logo" className="hero-logo" />
        <h1>Welcome to OctoFit Tracker</h1>
        <p className="lead">Your all-in-one fitness tracking and team competition platform.</p>
      </div>
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          {features.map((f) => (
            <div className="col-12 col-sm-6 col-lg-4" key={f.title}>
              <div className="card feature-card h-100">
                <div className={`card-header bg-${f.color} text-white`}>
                  <span className="me-2">{f.icon}</span>{f.title}
                </div>
                <div className="card-body d-flex flex-column">
                  <p className="card-text flex-grow-1">{f.description}</p>
                  <NavLink to={f.link} className={`btn btn-outline-${f.color} mt-2`}>
                    View {f.title}
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="logo" width="30" height="30" className="me-2" />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler border-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">👤 Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">🏃 Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">🤝 Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">🏆 Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">💪 Workouts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

      <footer className="octofit-footer">
        &copy; {new Date().getFullYear()} OctoFit Tracker &mdash; Built with GitHub Copilot
      </footer>
    </div>
  );
}

export default App;
