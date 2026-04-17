import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  fetchAdminAnalytics,
  fetchAdminUsers,
  fetchAdminUsersCount,
} from '../api/adminApi';
import { fetchDistrictVideos, saveDistrictVideo } from '../api/videosApi';
import { useAuth } from '../context/authStore';
import UsersTable from '../components/UsersTable';
import { useOutletContext } from 'react-router-dom';

const getUserKey = (user) => user.id || user.email;
const DISTRICTS = ['Salem', 'Dharmapuri', 'Krishnagiri', 'Namakkal'];

const AdminDashboard = () => {
  const { isAuthenticated, userRole, currentUser } = useAuth();
  const { activeTab } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [counts, setCounts] = useState({ total_users: 0, new_users: 0 });
  const [analytics, setAnalytics] = useState({
    users_by_district: [],
    users_by_age_group: [],
    signup_count_by_date: [],
  });
  const [videoForms, setVideoForms] = useState(
    DISTRICTS.map((district) => ({ district, video_url: '' })),
  );
  const [videoSaveState, setVideoSaveState] = useState({});
  const [videoMessage, setVideoMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        const [usersRes, countRes, analyticsRes] = await Promise.all([
          fetchAdminUsers(),
          fetchAdminUsersCount(),
          fetchAdminAnalytics(),
        ]);

        const videosRes = await fetchDistrictVideos();

        setUsers(usersRes?.users || []);
        setSelectedUserIds([]);
        setCounts({
          total_users: countRes?.total_users || 0,
          new_users: countRes?.new_users || 0,
        });
        setAnalytics({
          users_by_district: analyticsRes?.users_by_district || [],
          users_by_age_group: analyticsRes?.users_by_age_group || [],
          signup_count_by_date: analyticsRes?.signup_count_by_date || [],
        });
        setVideoForms(videosRes);
      } catch (err) {
        setError(err?.response?.data?.detail || 'Failed to load admin dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const selectedCount = selectedUserIds.length;

  const handleToggleUser = (userKey) => {
    setSelectedUserIds((current) =>
      current.includes(userKey) ? current.filter((id) => id !== userKey) : [...current, userKey],
    );
  };

  const handleToggleAll = (checked) => {
    if (checked) {
      setSelectedUserIds(users.map(getUserKey));
      return;
    }

    setSelectedUserIds([]);
  };

  const handleVideoChange = (district, value) => {
    setVideoForms((current) => current.map((entry) => (
      entry.district === district ? { ...entry, video_url: value } : entry
    )));
  };

  const handleVideoSave = async (district) => {
    const target = videoForms.find((entry) => entry.district === district);
    if (!target) {
      return;
    }

    setVideoMessage('');
    setVideoSaveState((current) => ({ ...current, [district]: 'saving' }));
    try {
      await saveDistrictVideo(target);
      setVideoSaveState((current) => ({ ...current, [district]: 'saved' }));
      setVideoMessage(`Saved ${district} video successfully.`);
    } catch (err) {
      setVideoSaveState((current) => ({ ...current, [district]: 'error' }));
      setVideoMessage(err?.response?.data?.detail || `Failed to save ${district} video.`);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="admin-dashboard-panel">
      <header className="admin-head">
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h1>Smart Explorer Admin Dashboard</h1>
          <p>Welcome {currentUser?.email || 'admin'}.</p>
        </div>
        {activeTab === 'users' ? (
          <p className="admin-selection-note">{selectedCount > 0 ? `${selectedCount} selected` : 'No users selected'}</p>
        ) : null}
      </header>

      {error ? <p className="login-error">{error}</p> : null}

      {activeTab === 'overview' ? (
        <section className="admin-panel-view admin-panel-view-active">
          <div className="admin-cards" aria-busy={loading}>
            <article className="admin-card">
              <h3>Total Users</h3>
              <p>{loading ? '...' : counts.total_users}</p>
            </article>
            <article className="admin-card">
              <h3>New Users Today</h3>
              <p>{loading ? '...' : counts.new_users}</p>
            </article>
          </div>

          <div className="admin-summary-grid">
            <article className="admin-summary-card">
              <span>Loaded users</span>
              <strong>{loading ? '...' : users.length}</strong>
            </article>
            <article className="admin-summary-card">
              <span>District groups</span>
              <strong>{analytics.users_by_district.length}</strong>
            </article>
            <article className="admin-summary-card">
              <span>Trend points</span>
              <strong>{analytics.signup_count_by_date.length}</strong>
            </article>
          </div>
        </section>
      ) : null}

      {activeTab === 'charts' ? (
        <section className="admin-panel-view admin-panel-view-active admin-charts">
          <article className="admin-chart-card">
            <h3>District-wise Users</h3>
            <div className="admin-chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.users_by_district}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="district" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#ffc107" name="Users" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="admin-chart-card">
            <h3>Signup Trend</h3>
            <div className="admin-chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.signup_count_by_date}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#ff8f00" strokeWidth={3} name="Signups" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>
      ) : null}

      {activeTab === 'users' ? (
        <section className="admin-panel-view admin-panel-view-active">
          <UsersTable
            users={users}
            selectedUserIds={selectedUserIds}
            onToggleUser={handleToggleUser}
            onToggleAll={handleToggleAll}
            loading={loading}
          />
        </section>
      ) : null}

      {activeTab === 'videos' ? (
        <section className="admin-panel-view admin-panel-view-active">
          <article className="admin-videos-panel">
            <div className="admin-panel-header">
              <div>
                <h3>District Videos</h3>
                <p>Set YouTube URLs for Salem, Dharmapuri, Krishnagiri, and Namakkal.</p>
              </div>
            </div>

            <div className="admin-videos-grid">
              {videoForms.map((entry) => (
                <div key={entry.district} className="admin-video-card">
                  <label htmlFor={`video-${entry.district}`}>{entry.district}</label>
                  <input
                    id={`video-${entry.district}`}
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={entry.video_url}
                    onChange={(event) => handleVideoChange(entry.district, event.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-btn"
                    onClick={() => handleVideoSave(entry.district)}
                    disabled={videoSaveState[entry.district] === 'saving'}
                  >
                    {videoSaveState[entry.district] === 'saving' ? 'Saving...' : 'Save Video'}
                  </button>
                </div>
              ))}
            </div>

            {videoMessage ? <p className="admin-video-feedback">{videoMessage}</p> : null}
          </article>
        </section>
      ) : null}
    </section>
  );
};

export default AdminDashboard;
