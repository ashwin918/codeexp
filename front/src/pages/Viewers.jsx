import React, { useEffect, useState } from 'react';
import { getAllViewers, deleteViewer } from '../api/api';
import './Viewers.css';

const Viewers = () => {
  const [viewers, setViewers] = useState([]);
  const isAdmin = localStorage.getItem('role') === 'admin'; // 🔁 Use role

  useEffect(() => {
    const fetchViewers = async () => {
      const res = await getAllViewers();
      setViewers(res || []);
    };
    fetchViewers();
  }, []);

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (window.confirm('Delete this viewer log?')) {
      await deleteViewer(id);
      setViewers(viewers.filter((v) => v.id !== id));
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  return (
    <div className="viewers-page">
      <h2>👁️ Viewer Logs</h2>
      <div className="viewer-list">
        {viewers.length > 0 ? (
          viewers.map((viewer) => (
            <div key={viewer.id} className="viewer-card">
              <p><strong>IP:</strong> {viewer.ip_address}</p>
              <p><strong>User Agent:</strong> {viewer.user_agent}</p>
              <p><strong>Visited:</strong> {formatDate(viewer.visited_at)}</p>

              {isAdmin && (
                <button onClick={() => handleDelete(viewer.id)} className="delete-btn">
                  🗑️ Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No viewer logs found.</p>
        )}
      </div>
    </div>
  );
};

export default Viewers;
