import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, LayoutDashboard, Library, BookOpen, Gamepad2, Bot, UsersRound, Sparkles, TrendingUp, User, Bell, X } from 'lucide-react';
import WebcamScanner from './WebcamScanner';
import LessonContent from './LessonContent';
import SessionAnalytics from './SessionAnalytics';
import EngineeringHub from './EngineeringHub';
import GatePrep from './GatePrep';
import Games from './Games';
import AiTutor from './AiTutor';
import TeacherDashboard from './TeacherDashboard';
import StudentProfile from './StudentProfile';
import MemeModal from './MemeModal';
import { Emotion, LearningState, mapEmotionToLearningState } from '../types';

interface DashboardProps {
  key?: string;
  userName: string;
  userRole: 'student' | 'teacher';
  onLogout: () => void;
}

type StudentTab = 'profile' | 'adaptive' | 'engineering' | 'gate' | 'games' | 'tutor';
type TeacherTab = 'classroom' | 'analytics' | 'curriculum' | 'students';

export default function Dashboard({ userName, userRole, onLogout }: DashboardProps) {
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(Emotion.Neutral);
  const [emotionHistory, setEmotionHistory] = useState<{ time: string, emotion: Emotion }[]>([]);
  const [activeTab, setActiveTab] = useState<string>(userRole === 'teacher' ? 'classroom' : 'profile');
  const [showBoredPrompt, setShowBoredPrompt] = useState(false);
  const [isMemeModalOpen, setIsMemeModalOpen] = useState(false);
  
  // Throttle the prompt so it doesn't spam
  const [lastPromptTime, setLastPromptTime] = useState(0);

  useEffect(() => {
    // Only track emotion if we are in Student mode and in the adaptive tab
    if (userRole === 'teacher') return;

    if (currentEmotion === Emotion.Sad || currentEmotion === Emotion.Neutral) {
        // Just checking for Boredom equivalents. Real app would be more robust.
        const now = Date.now();
        if (now - lastPromptTime > 60000) { // Ask every 1 min max
           setShowBoredPrompt(true);
        }
    } else if (currentEmotion !== Emotion.Neutral && currentEmotion !== Emotion.Sad) {
        setShowBoredPrompt(false);
    }

    const interval = setInterval(() => {
      setEmotionHistory(prev => {
        const newHistory = [...prev, { 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
          emotion: currentEmotion 
        }];
        return newHistory.slice(-20);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentEmotion, userRole]);

  const learningState: LearningState = mapEmotionToLearningState(currentEmotion);

  const studentNav = [
    { id: 'profile', label: 'My Profile', icon: <User size={20} /> },
    { id: 'adaptive', label: 'Smart Lesson', icon: <LayoutDashboard size={20} /> },
    { id: 'engineering', label: 'Subjects Hub', icon: <Library size={20} /> },
    { id: 'gate', label: 'GATE Prep', icon: <BookOpen size={20} /> },
    { id: 'games', label: 'Skill Games', icon: <Gamepad2 size={20} /> },
    { id: 'tutor', label: 'AI Support', icon: <Bot size={20} /> },
  ];

  const teacherNav = [
    { id: 'classroom', label: 'Live Monitor', icon: <UsersRound size={20} /> },
    { id: 'analytics', label: 'Class Stats', icon: <TrendingUp size={20} /> },
    { id: 'curriculum', label: 'Manage Units', icon: <BookOpen size={20} /> },
    { id: 'students', label: 'Student List', icon: <Library size={20} /> },
  ];

  const navItems = userRole === 'teacher' ? teacherNav : studentNav;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen bg-[#f8f9fc] font-sans overflow-hidden w-full"
    >
      {/* Sidebar Navigation */}
      <div className="w-72 bg-white border-r border-slate-100 flex flex-col shadow-xl z-20 hidden md:flex">
        <div className="p-8 border-b border-slate-50 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-violet-500/30">
             <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-fuchsia-700 leading-tight">
              Lumina
            </h1>
            <p className="text-[10px] font-black text-violet-500 uppercase tracking-[0.2em]">{userRole} Portal</p>
          </div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col gap-2 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-4">Menu Selection</p>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-violet-600 text-white font-black shadow-lg shadow-violet-500/30 translate-x-1' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-bold'
              }`}
            >
              <div className={activeTab === item.id ? 'text-white' : 'text-slate-400'}>
                {item.icon}
              </div>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-slate-50 bg-slate-50/50">
          <div className="flex items-center gap-4 mb-6 px-1">
            <div className="w-12 h-12 rounded-2xl bg-white text-violet-700 flex items-center justify-center font-black text-xl border-2 border-violet-100 shadow-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
               <p className="text-sm font-black text-slate-800 truncate">{userName}</p>
               <p className="text-[10px] font-bold text-violet-500 uppercase tracking-wider">
                  {userRole === 'teacher' ? 'Faculty Admin' : 'Merit Scholar (GATE)'}
               </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 text-xs font-black uppercase tracking-widest text-slate-600 bg-white border-2 border-slate-100 rounded-2xl hover:bg-rose-50 hover:border-rose-100 hover:text-rose-600 transition-all hover:scale-[1.02]"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
        {/* Mobile Header elements... (keep similar but with userRole) */}
        <div className="md:hidden bg-white border-b border-slate-100 p-5 flex justify-between items-center sticky top-0 z-30">
           <div>
             <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
               Lumina
             </h1>
             <p className="text-[9px] font-bold text-violet-500 uppercase tracking-widest">{userRole} view</p>
           </div>
          <button onClick={onLogout} className="p-3 text-slate-400 hover:text-rose-600 bg-slate-50 rounded-xl"><LogOut size={20}/></button>
        </div>
        
        {/* Mobile Nav Scroller */}
        <div className="md:hidden bg-white border-b border-slate-50 flex overflow-x-auto px-5 py-3 gap-3 hide-scrollbar relative z-30">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === item.id 
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20' 
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto w-full">
           <div className="p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                className="w-full"
              >
                {/* STUDENT VIEWS */}
                {userRole === 'student' && (
                  <>
                    {activeTab === 'profile' && <StudentProfile />}
                    {activeTab === 'adaptive' && (
                      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                        <div className="xl:col-span-3 flex flex-col min-h-[600px]">
                          <LessonContent learningState={learningState} />
                        </div>
                        <div className="xl:col-span-1 flex flex-col gap-6">
                          <WebcamScanner minimal onEmotionDetected={setCurrentEmotion} currentEmotion={currentEmotion} />
                          <div className="hidden xl:block">
                            <SessionAnalytics history={emotionHistory} />
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'engineering' && <EngineeringHub />}
                    {activeTab === 'gate' && <GatePrep />}
                    {activeTab === 'games' && <Games />}
                    {activeTab === 'tutor' && <AiTutor />}
                  </>
                )}

                {/* TEACHER VIEWS */}
                {userRole === 'teacher' && (
                  <>
                    {activeTab === 'classroom' && <TeacherDashboard />}
                    {activeTab === 'analytics' && (
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm min-h-[500px]">
                         <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                           <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                              <TrendingUp size={28} />
                           </div>
                           <div>
                             <h2 className="text-2xl font-black text-slate-800">Performance Analytics</h2>
                             <p className="text-slate-500 font-medium">Topic-wise engagement and confusion metrics.</p>
                           </div>
                         </div>
                         <table className="w-full text-left bg-slate-50 rounded-xl overflow-hidden">
                           <thead className="bg-slate-100/50 text-slate-500 text-sm">
                             <tr>
                               <th className="px-6 py-4 font-bold">Topic</th>
                               <th className="px-6 py-4 font-bold">Avg Attention</th>
                               <th className="px-6 py-4 font-bold">Confusion Spikes</th>
                               <th className="px-6 py-4 font-bold">Status</th>
                             </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100">
                             <tr>
                               <td className="px-6 py-4 font-bold text-slate-700">Digital Logic Circuits</td>
                               <td className="px-6 py-4 text-emerald-600 font-bold">92%</td>
                               <td className="px-6 py-4">Low (2 spikes)</td>
                               <td className="px-6 py-4"><span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Excellent</span></td>
                             </tr>
                             <tr>
                               <td className="px-6 py-4 font-bold text-slate-700">Advanced Calculus</td>
                               <td className="px-6 py-4 text-rose-600 font-bold">64%</td>
                               <td className="px-6 py-4">High (15 spikes)</td>
                               <td className="px-6 py-4"><span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold">Attention Needed</span></td>
                             </tr>
                             <tr>
                               <td className="px-6 py-4 font-bold text-slate-700">Database Normalization</td>
                               <td className="px-6 py-4 text-blue-600 font-bold">81%</td>
                               <td className="px-6 py-4">Medium (5 spikes)</td>
                               <td className="px-6 py-4"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Good</span></td>
                             </tr>
                           </tbody>
                         </table>
                      </div>
                    )}
                    {activeTab === 'curriculum' && (
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm min-h-[500px]">
                         <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                           <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                              <BookOpen size={28} />
                           </div>
                           <div>
                             <h2 className="text-2xl font-black text-slate-800">Curriculum Resources</h2>
                             <p className="text-slate-500 font-medium">Manage uploaded modules and track syllabus completion.</p>
                           </div>
                           <button onClick={() => alert('Simulating file upload prompt... Module added!')} className="ml-auto px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md shadow-amber-200 transition-colors">Upload New</button>
                         </div>
                         <div className="space-y-4">
                           {['Data Structures Notes', 'Calculus Assignment 1', 'Electronics Video Lecture'].map((item, i) => (
                             <div key={i} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-200 transition-colors">
                               <div className="flex gap-4 items-center">
                                 <Library className="text-slate-400" />
                                 <span className="font-bold text-slate-700">{item}</span>
                               </div>
                               <button onClick={() => alert(`Opening settings for ${item}`)} className="text-amber-600 hover:text-white font-bold text-sm bg-amber-50 hover:bg-amber-600 px-4 py-2 rounded-lg transition-colors">Edit / Manage</button>
                             </div>
                           ))}
                         </div>
                      </div>
                    )}
                    {activeTab === 'students' && (
                       <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm min-h-[500px]">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                           <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center">
                              <UsersRound size={28} />
                           </div>
                           <div>
                             <h2 className="text-2xl font-black text-slate-800">Student Database</h2>
                             <p className="text-slate-500 font-medium">Manage student profiles, enrollment IDs, and track performance.</p>
                           </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[
                            { name: 'Aarav Sharma', id: 'CS-2024-01', rank: '#1', focus: 'High' },
                            { name: 'Ishani Patel', id: 'CS-2024-02', rank: '#42', focus: 'Medium' },
                            { name: 'Rohan Gupta', id: 'CS-2024-03', rank: '#12', focus: 'High' },
                            { name: 'Ananya Iyer', id: 'CS-2024-04', rank: '#8', focus: 'Very High' },
                            { name: 'Kabir Khan', id: 'CS-2024-05', rank: '#89', focus: 'Low' },
                          ].map(student => (
                            <div key={student.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50 flex items-center gap-4">
                              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center font-bold">
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-800">{student.name}</h4>
                                <p className="text-xs text-slate-500">{student.id} • Rank {student.rank}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                     </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
           </div>
        </div>
      </div>
      
      {/* Bored Prompt */}
      <AnimatePresence>
        {showBoredPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[100] bg-white p-6 rounded-3xl shadow-2xl border border-indigo-100 max-w-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Bell size={24} className="animate-bounce" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-black text-slate-800 mb-1">Attention Dropping!</h4>
                <p className="text-sm font-medium text-slate-500 mb-4">Our sensors detected you might be feeling bored or tired. Need quick entertainment to refresh your mind?</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setShowBoredPrompt(false);
                      setIsMemeModalOpen(true);
                      setLastPromptTime(Date.now());
                    }} 
                    className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors"
                  >
                    Yes, break please!
                  </button>
                  <button 
                    onClick={() => {
                      setShowBoredPrompt(false);
                      setLastPromptTime(Date.now());
                    }} 
                    className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-colors"
                  >
                    I'm attentive
                  </button>
                </div>
              </div>
              <button onClick={() => setShowBoredPrompt(false)} className="text-slate-400 hover:text-slate-600 absolute top-4 right-4">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MemeModal 
        isOpen={isMemeModalOpen} 
        onClose={() => setIsMemeModalOpen(false)} 
        onPlayGame={() => {
          setIsMemeModalOpen(false);
          setActiveTab('games');
        }}
      />
    </motion.div>
  );
}

