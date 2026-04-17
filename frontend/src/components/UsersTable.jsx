import { downloadUsersCsv } from '../api/adminApi';

const getUserKey = (user) => user.id || user.email;

const UsersTable = ({ users, selectedUserIds, onToggleUser, onToggleAll, loading }) => {
  const allSelected = users.length > 0 && selectedUserIds.length === users.length;
  const someSelected = selectedUserIds.length > 0 && selectedUserIds.length < users.length;

  const handleExport = () => {
    const selectedUsers = selectedUserIds.length
      ? users.filter((user) => selectedUserIds.includes(getUserKey(user)))
      : users;

    downloadUsersCsv(selectedUsers, 'users_export.csv');
  };

  return (
    <section className="admin-users-section admin-panel-card">
      <div className="admin-panel-header">
        <div>
          <h3>User List</h3>
          <p>Select users to export only the chosen records.</p>
        </div>
        <button type="button" className="auth-btn admin-export" onClick={handleExport}>
          Export Selected
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table admin-users-table">
          <thead>
            <tr>
              <th className="admin-checkbox-cell">
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(node) => {
                      if (node) {
                        node.indeterminate = someSelected;
                      }
                    }}
                    onChange={(event) => onToggleAll(event.target.checked)}
                    aria-label="Select all users"
                  />
                  <span>Select All</span>
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>District</th>
              <th>Signup Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading users...</td>
              </tr>
            ) : users.length ? (
              users.map((user) => {
                const key = getUserKey(user);
                const isSelected = selectedUserIds.includes(key);

                return (
                  <tr key={key} className={isSelected ? 'admin-row-selected' : ''}>
                    <td className="admin-checkbox-cell">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleUser(key)}
                        aria-label={`Select ${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email}
                      />
                    </td>
                    <td>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}</td>
                    <td>{user.email || '-'}</td>
                    <td>{user.mobile || '-'}</td>
                    <td>{user.district || user.address || '-'}</td>
                    <td>{user.created_at ? String(user.created_at).slice(0, 10) : '-'}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">No users available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersTable;
