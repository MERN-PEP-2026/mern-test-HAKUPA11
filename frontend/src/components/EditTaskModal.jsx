import React, { useState, useEffect } from 'react';

const EditTaskModal = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState({ title: '', description: '', status: 'pending' });

  useEffect(() => {
    if (task) {
      setFormData({ title: task.title, description: task.description || '', status: task.status });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task._id, formData);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>✏️ Edit Task</h3>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={styles.textarea}
              rows={3}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={styles.input}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div style={styles.buttons}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.saveBtn}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: '#fff',
    borderRadius: '16px',
    padding: '32px',
    width: '100%',
    maxWidth: '460px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  title: { margin: '0 0 24px', fontSize: '22px', color: '#1a1a2e' },
  formGroup: { marginBottom: '18px' },
  label: { display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: '#555' },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  buttons: { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' },
  cancelBtn: {
    padding: '10px 20px',
    background: '#f3f4f6',
    color: '#555',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
  saveBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
};

export default EditTaskModal;