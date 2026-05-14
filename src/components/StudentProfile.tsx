import { motion } from 'motion/react';
import { User, Award, BookOpen, Clock, TrendingUp, Cpu, Brain, Zap, Target } from 'lucide-react';

export default function StudentProfile() {
  const stats = [
    { label: 'Global Rank', value: '#1,245', icon: <Award className="text-yellow-500" /> },
    { label: 'Hours Learning', value: '142 Hrs', icon: <Clock className="text-blue-500" /> },
    { label: 'Modules Completed', value: '48', icon: <BookOpen className="text-emerald-500" /> },
    { label: 'Avg Attention', value: '88%', icon: <TrendingUp className="text-violet-500" /> },
  ];

  const recentBadges = [
    { name: 'Matrix Master', desc: 'Completed Advanced Calculus', icon: <Target className="text-rose-500" />, bg: 'bg-rose-50' },
    { name: 'Fast Learner', desc: 'Sustained focus for 3 hours', icon: <Zap className="text-amber-500" />, bg: 'bg-amber-50' },
    { name: 'AI Enthusiast', desc: 'Scored 90%+ in ML basics', icon: <Cpu className="text-indigo-500" />, bg: 'bg-indigo-50' },
    { name: 'Logic King', desc: 'Solved 10 Digital Logic puzzles', icon: <Brain className="text-fuchsia-500" />, bg: 'bg-fuchsia-50' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 rounded-2xl shadow-sm text-white relative overflow-hidden">
        <User className="absolute -right-4 -bottom-4 opacity-10" size={150} />
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
            <User size={48} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold mb-1">STU-1001 Profile</h2>
            <p className="text-violet-100 font-medium tracking-wide">B.Tech Computer Science • 3rd Year</p>
            <div className="mt-3 flex gap-3">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">GATE Aspirant</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">Tier-1 Track</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-black text-slate-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-800 mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {recentBadges.map((badge, idx) => (
              <div key={idx} className={`p-4 rounded-xl flex items-center gap-4 ${badge.bg}`}>
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{badge.name}</h4>
                  <p className="text-xs text-slate-600 font-medium">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-black text-slate-800 mb-4">Emotion & Engagement Journey</h3>
          <div className="flex-1 rounded-xl bg-slate-50 border border-slate-100 border-dashed flex flex-col items-center justify-center min-h-[250px] p-6 text-center">
            <TrendingUp size={48} className="text-slate-300 mb-4" />
            <p className="font-bold text-slate-700">Consistent Focus Detected</p>
            <p className="text-sm text-slate-500 mt-2 max-w-sm font-medium">Your engagement has improved by 15% this week. Your 'Confusion' spikes are typically resolved within 2 minutes during mathematics modules.</p>
            <button className="mt-6 px-6 py-2 bg-violet-100 text-violet-700 font-bold rounded-lg text-sm hover:bg-violet-200 transition-colors">
              View Detailed Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
