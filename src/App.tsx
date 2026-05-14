import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<'student' | 'teacher'>('student');

  const handleLogin = (name: string, role: 'student' | 'teacher') => {
    setUserName(name);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900 font-sans">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <Login key="login" onLogin={handleLogin} />
        ) : (
          <Dashboard key="dashboard" userName={userName} userRole={userRole} onLogout={handleLogout} />
        )}
      </AnimatePresence>
    </div>
  );
}
