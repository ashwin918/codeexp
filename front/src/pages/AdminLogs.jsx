import React, { useEffect, useState } from 'react';
import { getAllAdminLogs } from '../api/api';
import AdminLogCard from '../components/AdminLogCard';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await getAllAdminLogs();
      setLogs(res || []);
    };

    fetchLogs();
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h2>Admin Activity Logs</h2>
      {logs.length > 0 ? (
        logs.map((log) => <AdminLogCard key={log.id} log={log} />)
      ) : (
        <p>No admin logs available.</p>
      )}
    </div>
  );
};

export default AdminLogs;
