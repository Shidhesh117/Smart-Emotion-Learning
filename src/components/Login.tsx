import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, User, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

interface LoginProps {
  key?: string;
  onLogin: (name: string, role: 'student' | 'teacher') => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() || isLogin) {
      onLogin(name.trim() || (role === 'teacher' ? 'Professor Sharma' : 'Student'), role);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-violet-50 to-fuchsia-50 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-violet-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-fuchsia-300/30 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[24px] shadow-xl p-8 border border-white relative z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg shadow-violet-500/30 rotate-3 transform hover:rotate-6 transition-transform">
            <Sparkles size={32} />
          </div>
          <h1 className="text-2xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-fuchsia-700">
            Lumina Forge India
          </h1>
          <p className="text-slate-500 text-center text-xs font-semibold uppercase tracking-widest">
            AI-Powered Educational Ecosystem
          </p>
        </div>

        {/* Role Toggle */}
        <div className="bg-slate-100 p-1 rounded-xl flex mb-6 relative">
          <motion.div
            layoutId="role-indicator"
            className="absolute inset-y-1 bg-white rounded-lg shadow-sm w-[calc(50%-4px)]"
            initial={false}
            animate={{ x: role === 'student' ? '0%' : '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => setRole('student')}
            className={`flex-1 py-2 text-sm font-bold relative z-10 transition-colors ${role === 'student' ? 'text-violet-600' : 'text-slate-400'}`}
          >
            Student
          </button>
          <button
            onClick={() => setRole('teacher')}
            className={`flex-1 py-2 text-sm font-bold relative z-10 transition-colors ${role === 'teacher' ? 'text-violet-600' : 'text-slate-400'}`}
          >
            Teacher/Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-violet-400">
                    <User size={18} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-11 pr-3 py-3 bg-white/50 border border-violet-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none"
                    placeholder="Aarav Sharma"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-violet-400">
                <Mail size={18} />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-3 py-3 bg-white/50 border border-violet-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none"
                placeholder="student@iit.ac.in"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-violet-400">
                <Lock size={18} />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-3 py-3 bg-white/50 border border-violet-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center py-3.5 px-4 mt-2 rounded-xl text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 shadow-md shadow-violet-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all gap-2 font-bold text-lg"
          >
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-violet-600 hover:text-fuchsia-600 font-semibold transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
