import React from 'react';
import { deleteAdminLog } from '../api/api';
import './adminlog.css';

const AdminLogCard = ({ log }) => {
  const { id, admin_id, action, log_time } = log;
  const isAdmin = localStorage.getItem('email') === 'admin@email.com';

  const handleDelete = async () => {
    if (window.confirm('Delete this log?')) {
      await deleteAdminLog(id);
      window.location.reload();
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  return (
    <div className="admin-log-card">
      <div className="admin-log-header">
        <h4>Action #{id}</h4>
        <span className="log-date">{formatDate(log_time)}</span>
      </div>
      <p className="log-action">{action}</p>
      <div className="admin-log-footer">
        Admin ID: {admin_id}
        {isAdmin && <button onClick={handleDelete} className="delete-log">🗑️</button>}
      </div>
    </div>
  );
};

export default AdminLogCard;
