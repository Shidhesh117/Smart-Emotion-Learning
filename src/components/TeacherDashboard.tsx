import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, TrendingUp, AlertCircle, CheckCircle2, Clock, Eye, Video, Search, Filter, ShieldCheck } from 'lucide-react';

const students = [
  { id: 1, name: 'Aarav Sharma', status: 'Focused', mood: 'Neutral', progress: 85, lastActive: '2 mins ago', alert: false },
  { id: 2, name: 'Ishani Patel', status: 'Confused', mood: 'Doubtful', progress: 42, lastActive: 'Just now', alert: true },
  { id: 3, name: 'Rohan Gupta', status: 'Focused', mood: 'Happy', progress: 60, lastActive: '5 mins ago', alert: false },
  { id: 4, name: 'Ananya Iyer', status: 'Bored', mood: 'Tired', progress: 95, lastActive: '10 mins ago', alert: true },
  { id: 5, name: 'Vikram Singh', status: 'Active', mood: 'Joy', progress: 78, lastActive: '1 min ago', alert: false },
  { id: 6, name: 'Priya Verma', status: 'Focused', mood: 'Neutral', progress: 92, lastActive: '3 mins ago', alert: false },
  { id: 7, name: 'Kabir Khan', status: 'Confused', mood: 'Distracted', progress: 34, lastActive: '8 mins ago', alert: true },
  { id: 8, name: 'Meera Das', status: 'Focused', mood: 'Serious', progress: 88, lastActive: '1 min ago', alert: false },
  { id: 9, name: 'Siddharth Rao', status: 'Focused', mood: 'Neutral', progress: 77, lastActive: '4 mins ago', alert: false },
];

export default function TeacherDashboard() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const [resolvedAlerts, setResolvedAlerts] = useState<string[]>([]);
  const [classCompleted, setClassCompleted] = useState(false);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter ? s.status === activeFilter || s.mood === activeFilter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 flex flex-col h-full bg-slate-50 p-1 rounded-3xl">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Present in Lab</p>
            <p className="text-xl font-black text-slate-800">42/60</p>
          </div>
        </div>
        <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
          <div>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avg Attention</p>
             <p className="text-xl font-black text-slate-800">84%</p>
          </div>
        </div>
        <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Critical Help</p>
            <p className="text-xl font-black text-slate-800">03</p>
          </div>
        </div>
        <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Proctor Score</p>
            <p className="text-xl font-black text-slate-800">92%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Proctoring Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
             <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Video size={20} className="text-indigo-600" /> Live Classroom Feed
             </h3>
             <div className="flex gap-2 relative">
                <AnimatePresence>
                  {showSearch && (
                    <motion.input 
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 150, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      type="text" 
                      placeholder="Search student..." 
                      className="px-3 py-1 border border-slate-200 rounded-lg text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  )}
                </AnimatePresence>
                <button onClick={() => setShowSearch(!showSearch)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"><Search size={16}/></button>
                <button onClick={() => setShowFilterMenu(!showFilterMenu)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"><Filter size={16}/></button>
                
                {showFilterMenu && (
                  <div className="absolute top-10 right-0 bg-white border border-slate-200 shadow-xl rounded-xl p-2 z-10 w-40 flex flex-col gap-1">
                    <button onClick={() => { setActiveFilter(null); setShowFilterMenu(false); }} className="text-left px-3 py-2 text-sm hover:bg-slate-50 rounded-lg font-bold text-slate-600">All</button>
                    <button onClick={() => { setActiveFilter('Confused'); setShowFilterMenu(false); }} className="text-left px-3 py-2 text-sm hover:bg-rose-50 rounded-lg font-bold text-rose-600">Confused</button>
                    <button onClick={() => { setActiveFilter('Bored'); setShowFilterMenu(false); }} className="text-left px-3 py-2 text-sm hover:bg-amber-50 rounded-lg font-bold text-amber-600">Bored</button>
                    <button onClick={() => { setActiveFilter('Focused'); setShowFilterMenu(false); }} className="text-left px-3 py-2 text-sm hover:bg-emerald-50 rounded-lg font-bold text-emerald-600">Focused</button>
                  </div>
                )}
             </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
             {filteredStudents.length === 0 ? (
               <p className="text-sm font-bold text-slate-400 col-span-3 text-center py-10">No students found matching your criteria.</p>
             ) : (
               filteredStudents.map((student) => (
                <motion.div 
                 key={student.id}
                 whileHover={{ scale: 1.02 }}
                 className="bg-white rounded-2xl border border-slate-200 shadow-sm relative group p-4 flex flex-col justify-between"
               >
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <p className="text-xs text-slate-400 font-bold mb-1">ID: STU-{1000 + student.id}</p>
                       <p className="text-sm font-black text-slate-800">{student.name}</p>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className={`w-3 h-3 rounded-full mb-2 ${student.alert ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                       <span className="text-[10px] font-bold text-slate-500">{student.lastActive}</span>
                    </div>
                 </div>
                 
                 <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-1 font-semibold uppercase">Current State</p>
                    <div className="flex gap-2">
                       <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md">
                          {student.status}
                       </span>
                       <span className={`px-2 py-1 text-xs font-bold rounded-md ${student.mood === 'Confused' || student.mood === 'Distracted' ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'}`}>
                          {student.mood}
                       </span>
                    </div>
                 </div>

                 <div className="">
                    <div className="flex justify-between items-center mb-1">
                       <p className="text-[10px] font-bold uppercase text-slate-400">Module Progress</p>
                       <span className="text-[10px] font-black text-indigo-600">{student.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500" style={{ width: `${student.progress}%` }}></div>
                    </div>
                 </div>
               </motion.div>
             )))}
          </div>
        </div>

        {/* Real-time Alerts & Observational Data */}
        <div className="space-y-6">
           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                 <h3 className="font-black text-slate-800 text-sm flex items-center gap-2 text-rose-500">
                    <AlertCircle size={18} /> High Priority Alerts
                 </h3>
                 <span className="bg-rose-100 text-rose-600 text-[10px] px-2 py-0.5 rounded-full font-bold">LIVE</span>
              </div>
              <div className="p-4 flex-1 space-y-4 overflow-y-auto">
                 {!resolvedAlerts.includes('alert1') && (
                   <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                      <div className="flex justify-between mb-2">
                         <p className="text-xs font-bold text-rose-700">Abnormal Eye Movement</p>
                         <span className="text-[10px] text-rose-400 font-bold">12:42 PM</span>
                      </div>
                      <p className="text-[11px] text-rose-800 font-medium mb-3">Ishani Patel showing sustained confusion on "Matrix Rank" module.</p>
                      <button onClick={() => setResolvedAlerts([...resolvedAlerts, 'alert1'])} className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-[10px] font-bold shadow-sm shadow-rose-200 transition-colors">Intervene Now</button>
                   </div>
                 )}

                 {!resolvedAlerts.includes('alert2') && (
                   <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                      <div className="flex justify-between mb-2">
                         <p className="text-xs font-bold text-amber-700">Low Engagement Detection</p>
                         <span className="text-[10px] text-amber-400 font-bold">12:40 PM</span>
                      </div>
                      <p className="text-[11px] text-amber-800 font-medium mb-3">Ananya Iyer shifted to "Bored" state since last 5 minutes.</p>
                      <button onClick={() => setResolvedAlerts([...resolvedAlerts, 'alert2'])} className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-[10px] font-bold shadow-sm shadow-amber-200 transition-colors">Prompt Interaction</button>
                   </div>
                 )}

                 <div className="p-4 border border-slate-100 rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><Clock size={16}/></div>
                       <div>
                          <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">Class Overview</p>
                          <p className="text-[10px] text-slate-500 font-medium italic">General class mood is "Optimistic"</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div 
                 onClick={() => setClassCompleted(true)}
                 className={`p-4 ${classCompleted ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white flex items-center justify-between cursor-pointer transition-colors`}
              >
                 <p className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={14} /> {classCompleted ? 'Class Completed' : 'Mark Class Completed'}
                 </p>
                 <Eye size={16} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
