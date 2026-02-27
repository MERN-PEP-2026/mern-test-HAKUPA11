import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [page, setPage] = useState('login');

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p style={{ color: '#667eea', fontSize: '18px' }}>Loading...</p>
      </div>
    );
  }

  if (user) return <Dashboard />;

  if (page === 'register') return <Register onNavigate={setPage} />;
  return <Login onNavigate={setPage} />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;