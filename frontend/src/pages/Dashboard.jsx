import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import EditTaskModal from '../components/EditTaskModal';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' ? 'https://mern-test-hakupa11.onrender.com/api/tasks' : `https://mern-test-hakupa11.onrender.com/api/tasks?status=${filter}`;
      const res = await axios.get(url);
      setTasks(res.data.tasks);
    } catch (err) {
      setError('Failed to load tasks. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    setCreating(true);
    try {
      const res = await axios.post('https://mern-test-hakupa11.onrender.com/api/tasks', newTask);
      setTasks([res.data.task, ...tasks]);
      setNewTask({ title: '', description: '' });
      setShowForm(false);
    } catch (err) {
      setError('Failed to create task.');
    } finally {
      setCreating(false);
    }
  };

  const handleStatusToggle = async (id, newStatus) => {
    try {
      const res = await axios.put(`https://mern-test-hakupa11.onrender.com/api/tasks/${id}`, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === id ? res.data.task : t)));
    } catch {
      setError('Failed to update task status.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mern-test-hakupa11.onrender.com/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch {
      setError('Failed to delete task.');
    }
  };

  const handleEditSave = async (id, data) => {
    try {
      const res = await axios.put(`https://mern-test-hakupa11.onrender.com/api/tasks/${id}`, data);
      setTasks(tasks.map((t) => (t._id === id ? res.data.task : t)));
      setEditingTask(null);
    } catch {
      setError('Failed to update task.');
    }
  };

  const pending = tasks.filter((t) => t.status === 'pending').length;
  const completed = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.headerTitle}>✅ Task Manager</h1>
          <p style={styles.headerSub}>Welcome back, {user?.name}!</p>
        </div>
        <button onClick={logout} style={styles.logoutBtn}>🚪 Logout</button>
      </div>

      <div style={styles.content}>
        <div style={styles.statsRow}>
          <div style={{ ...styles.statCard, borderTop: '4px solid #667eea' }}>
            <p style={styles.statNum}>{tasks.length}</p>
            <p style={styles.statLabel}>Total Tasks</p>
          </div>
          <div style={{ ...styles.statCard, borderTop: '4px solid #f59e0b' }}>
            <p style={styles.statNum}>{pending}</p>
            <p style={styles.statLabel}>Pending</p>
          </div>
          <div style={{ ...styles.statCard, borderTop: '4px solid #10b981' }}>
            <p style={styles.statNum}>{completed}</p>
            <p style={styles.statLabel}>Completed</p>
          </div>
        </div>

        {error && (
          <div style={styles.error}>
            {error}
            <button onClick={() => setError('')} style={styles.closeErr}>✕</button>
          </div>
        )}

        <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
          {showForm ? '✕ Cancel' : '+ Add New Task'}
        </button>

        {showForm && (
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>New Task</h3>
            <form onSubmit={handleCreateTask}>
              <input
                type="text"
                placeholder="Task title *"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                style={styles.input}
                required
              />
              <textarea
                placeholder="Description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                style={styles.textarea}
                rows={3}
              />
              <button type="submit" style={styles.submitBtn} disabled={creating}>
                {creating ? 'Creating...' : 'Create Task'}
              </button>
            </form>
          </div>
        )}

        <div style={styles.filterRow}>
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                background: filter === f ? '#667eea' : '#f3f4f6',
                color: filter === f ? '#fff' : '#555',
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={styles.center}>Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={{ fontSize: '48px', margin: 0 }}>📋</p>
            <p>No tasks found. Create one above!</p>
          </div>
        ) : (
          <div>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusToggle={handleStatusToggle}
                onDelete={handleDelete}
                onEdit={setEditingTask}
              />
            ))}
          </div>
        )}
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleEditSave}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#f8f9fc' },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
  },
  headerTitle: { margin: 0, fontSize: '24px', fontWeight: '700' },
  headerSub: { margin: '4px 0 0', opacity: 0.85, fontSize: '14px' },
  logoutBtn: {
    padding: '9px 18px',
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.4)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  content: { maxWidth: '760px', margin: '0 auto', padding: '28px 20px' },
  statsRow: { display: 'flex', gap: '16px', marginBottom: '24px' },
  statCard: {
    flex: 1,
    background: '#fff',
    borderRadius: '12px',
    padding: '18px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
  },
  statNum: { margin: 0, fontSize: '32px', fontWeight: '700', color: '#1a1a2e' },
  statLabel: { margin: '4px 0 0', fontSize: '13px', color: '#888' },
  error: {
    background: '#fee2e2',
    color: '#dc2626',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
  },
  closeErr: { background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', fontWeight: '700' },
  addBtn: {
    padding: '11px 22px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '15px',
    marginBottom: '20px',
  },
  formCard: {
    background: '#fff',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  formTitle: { margin: '0 0 16px', fontSize: '18px', color: '#1a1a2e' },
  input: {
    width: '100%',
    padding: '11px 13px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '15px',
    boxSizing: 'border-box',
    marginBottom: '12px',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    padding: '11px 13px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '15px',
    boxSizing: 'border-box',
    marginBottom: '12px',
    resize: 'vertical',
    outline: 'none',
  },
  submitBtn: {
    padding: '10px 22px',
    background: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '15px',
  },
  filterRow: { display: 'flex', gap: '10px', marginBottom: '20px' },
  filterBtn: {
    padding: '8px 18px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
  center: { textAlign: 'center', color: '#888', padding: '40px' },
  emptyState: { textAlign: 'center', color: '#888', padding: '40px' },
};

export default Dashboard;