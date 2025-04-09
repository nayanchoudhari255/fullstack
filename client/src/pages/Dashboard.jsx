
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { User, Mail, CreditCard, Calendar, Settings, Bell, LogOut } from 'lucide-react';
import '../styles/dashboard.css';

const DashboardPage = () => {
  const { user, logout } = useAuth(); // ✅ Added logout function
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('No authentication token found.');
          return;
        }

        const { data } = await axios.get('https://tshirt-custom-backend.onrender.com', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch profile', err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // ✅ Logout function
  const handleLogout = () => {
    logout(); // Clear user session
    window.location.href = "/login"; // Redirect to login
  };

  // ✅ Additional user stats
  const userStats = profile
    ? {
        joinDate: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A",
        lastLogin: new Date().toLocaleDateString(),
        accountType: profile.accountType || "Standard",
        notifications: profile.notifications || 0,
      }
    : null;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">User Dashboard</h2>

      {loading ? (
        <div className="loading-container">
          <p className="loading-text">Loading profile information...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="error-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      ) : profile ? (
        <div className="space-y-6">
          {/* ✅ User Profile Card */}
          <div className="card">
            <div className="profile-container">
              <div className="profile-icon-container">
                <User className="profile-icon" />
              </div>
              <div className="profile-content">
                <h3 className="profile-name">{profile.name}</h3>
                <p className="profile-detail">
                  <Mail className="profile-detail-icon" />
                  {profile.email}
                </p>
                <p className="profile-detail">
                  <CreditCard className="profile-detail-icon" />
                  Account ID: {profile._id}
                </p>
                <p className="profile-detail">
                  <Calendar className="profile-detail-icon" />
                  Member since: {userStats.joinDate}
                </p>
              </div>
              <div className="profile-badge">{userStats.accountType}</div>
            </div>
          </div>

          {/* ✅ Account Stats */}
          <div className="stats-grid">
            <div className="card card-small">
              <h4 className="stat-heading">Account Status</h4>
              <p className="stat-value-active">Active</p>
            </div>
            <div className="card card-small">
              <h4 className="stat-heading">Last Login</h4>
              <p className="stat-value-default">{userStats.lastLogin}</p>
            </div>
            <div className="card card-small">
              <h4 className="stat-heading">Notifications</h4>
              <p className="stat-value-highlight">{userStats.notifications} new</p>
            </div>
          </div>

          {/* ✅ Quick Actions */}
          <div className="card">
            <h3 className="actions-heading">Quick Actions</h3>
            <div className="actions-grid">
              <button className="action-button">
                <Settings className="action-icon" />
                <span className="action-label"><a href="#">Settings</a></span>
              </button>
              <button className="action-button">
                <Bell className="action-icon" />
                <span className="action-label"><a href="#">Notifications</a></span>
              </button>
              <button className="action-button">
                <CreditCard className="action-icon" />
                <span className="action-label"><a href="#">Billing</a></span>
              </button>
              <button className="action-button" onClick={handleLogout}>
                <LogOut className="action-icon" />
                <span className="action-label">Logout</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="warning-container">
          <p className="warning-message">No profile data available. Please log in again.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
