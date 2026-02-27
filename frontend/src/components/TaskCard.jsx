import React, { useState } from 'react';

const TaskCard = ({ task, onStatusToggle, onDelete, onEdit }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isCompleted = task.status === 'completed';

  return (
    <div style={{ ...styles.card, borderLeft: isCompleted ? '4px solid #10b981' : '4px solid #667eea' }}>
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <span
            style={{
              ...styles.status,
              background: isCompleted ? '#d1fae5' : '#ede9fe',
              color: isCompleted ? '#059669' : '#7c3aed',
            }}
          >
            {isCompleted ? '✅ Completed' : '⏳ Pending'}
          </span>
        </div>

        <h3 style={{ ...styles.title, textDecoration: isCompleted ? 'line-through' : 'none' }}>
          {task.title}
        </h3>

        {task.description && <p style={styles.description}>{task.description}</p>}

        <p style={styles.date}>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
      </div>

      <div style={styles.actions}>
        <button
          onClick={() => onStatusToggle(task._id, isCompleted ? 'pending' : 'completed')}
          style={styles.toggleBtn}
        >
          {isCompleted ? 'Mark Pending' : 'Mark Complete'}
        </button>

        <button onClick={() => onEdit(task)} style={styles.editBtn}>
          ✏️ Edit
        </button>

        {confirmDelete ? (
          <div style={styles.confirmRow}>
            <span style={{ fontSize: '13px', color: '#dc2626' }}>Sure?</span>
            <button onClick={() => onDelete(task._id)} style={styles.confirmYes}>Yes</button>
            <button onClick={() => setConfirmDelete(false)} style={styles.confirmNo}>No</button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} style={styles.deleteBtn}>
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    marginBottom: '16px',
  },
  header: { marginBottom: '14px' },
  titleRow: { marginBottom: '8px' },
  status: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  title: { margin: '8px 0', fontSize: '18px', color: '#1a1a2e' },
  description: { color: '#666', fontSize: '14px', margin: '4px 0' },
  date: { color: '#aaa', fontSize: '12px', margin: '4px 0 0' },
  actions: { display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' },
  toggleBtn: {
    padding: '7px 14px',
    background: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
  },
  editBtn: {
    padding: '7px 14px',
    background: '#f59e0b',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
  },
  deleteBtn: {
    padding: '7px 14px',
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
  },
  confirmRow: { display: 'flex', alignItems: 'center', gap: '6px' },
  confirmYes: {
    padding: '5px 10px',
    background: '#dc2626',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  confirmNo: {
    padding: '5px 10px',
    background: '#6b7280',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '13px',
  },
};

export default TaskCard;