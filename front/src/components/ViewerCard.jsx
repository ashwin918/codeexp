import React from 'react';
import './viewer.css';

const ViewerCard = ({ viewer }) => {
  const { id, name, email, designation, created_at } = viewer;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  return (
    <div className="viewer-card">
      <div className="viewer-header">
        <h3>{name}</h3>
        <span className="designation">{designation}</span>
      </div>
      <p className="viewer-email">{email}</p>
      <div className="viewer-footer">
        <span>ID: {id}</span>
        <span>Joined: {formatDate(created_at)}</span>
      </div>
    </div>
  );
};

export default ViewerCard;
