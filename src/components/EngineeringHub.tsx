import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Video, ChevronRight, Download, X, Library, PlayCircle } from 'lucide-react';

const curriculum = [
  {
    year: '1st Year (Fundamental)',
    subjects: [
      { 
        name: 'Engineering Mathematics', 
        type: 'core', 
        pdfSrc: 'https://people.math.harvard.edu/~shlomo/docs/Linear_Algebra.pdf', 
        topics: [
           { name: 'Matrices & Determinants', videoId: '7K1sB05pE0A' },
           { name: 'Calculus Fundamentals', videoId: 'Wu3A1OwY83A' },
           { name: 'Vector Calculus', videoId: 'eO2-Yk60r60' }
        ]
      }, 
      { 
        name: 'Basic Electrical & Electronics', 
        type: 'core', 
        pdfSrc: 'https://inst.eecs.berkeley.edu/~ee16a/sp20/lecture/lec1.pdf', 
        topics: [
           { name: 'KCL & KVL Laws', videoId: 'WjxTWiYk_i4' },
           { name: 'AC Circuits', videoId: 'bF3-KMoT1dY' }
        ]
      },
      { 
        name: 'Engineering Physics', 
        type: 'core', 
        pdfSrc: 'https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/c516598b04ea0da040ec16df8ca3debd_MIT8_01F16_Lec01.pdf', 
        topics: [
           { name: 'Quantum Mechanics', videoId: 'zmhJgK_V84w' },
           { name: 'Laser Theory', videoId: 'g6Lp5kQc4Lg' }
        ]
      },
    ]
  },
  {
    year: '2nd Year (Core CS/ECE)',
    subjects: [
      { 
        name: 'Data Structures (C++)', 
        type: 'cs', 
        pdfSrc: 'https://people.cs.vt.edu/shaffer/Book/C++3elatest.pdf', 
        topics: [
           { name: 'Arrays & Pointers', videoId: 'zWeBvgx2A1w' },
           { name: 'Linked Lists', videoId: 'M0mx8S05v60' },
           { name: 'Trees & Graphs', videoId: 'I5JcEEJg_uA' }
        ]
      },
      { 
        name: 'Digital Electronics', 
        type: 'cs/ece', 
        pdfSrc: 'https://web.stanford.edu/class/ee108a/handouts/lecture01.pdf', 
        topics: [
           { name: 'Logic Gates & Boolean Algebra', videoId: 'JQBRqk8gCAc' },
           { name: 'Combinational Circuits', videoId: 'o2jBhw8119I' }
        ]
      },
      { 
        name: 'Discrete Mathematics', 
        type: 'cs', 
        pdfSrc: 'https://cims.nyu.edu/~regev/teaching/discrete_math_fall_2005/ho1.pdf', 
        topics: [
           { name: 'Set Theory & Logic', videoId: 'pTB0EiLXUC8' },
           { name: 'Graph Theory Fundamentals', videoId: 'P_j-L9Z8rEg' }
        ]
      },
    ]
  },
  {
    year: '3rd Year (Advanced CS)',
    subjects: [
      { 
        name: 'DBMS - SQL & NoSQL', 
        type: 'cs', 
        pdfSrc: 'https://pages.cs.wisc.edu/~dbbook/openAccess/Minibase/minibase.pdf', 
        topics: [
           { name: 'ER Diagrams & Relational Model', videoId: 'HXV3zeJZ1EQ' },
           { name: 'SQL Query Optimization', videoId: 'h0bJ_EALbV4' },
           { name: 'Database Normalization', videoId: 'GFQaEYEc8_8' }
        ]
      },
      { 
        name: 'Computer Networks', 
        type: 'cs', 
        pdfSrc: 'https://gaia.cs.umass.edu/kurose_ross/ppt/chapter1.pdf', 
        topics: [
           { name: 'OSI & TCP/IP Model', videoId: 'IPvYjXCsTg8' },
           { name: 'Network Layer Routing', videoId: 'qk-cT67LoxA' }
        ]
      },
      { 
        name: 'Operating Systems', 
        type: 'cs', 
        pdfSrc: 'https://pages.cs.wisc.edu/~remzi/OSTEP/intro.pdf', 
        topics: [
           { name: 'Process & Threads', videoId: 'vBURTt97EkA' },
           { name: 'Memory Management', videoId: 'UzaS-2X0P0I' }
        ]
      },
    ]
  },
  {
    year: '4th Year (Specialization)',
    subjects: [
      { 
        name: 'Artificial Intelligence & ML', 
        type: 'cs', 
        pdfSrc: 'https://see.stanford.edu/materials/aimlcs229/cs229-notes1.pdf', 
        topics: [
           { name: 'Machine Learning Basics', videoId: 'jGwO_UgTS7I' },
           { name: 'Neural Networks & Deep Learning', videoId: 'aircAruvnKk' }
        ]
      },
      { 
        name: 'Cloud Computing', 
        type: 'cs', 
        pdfSrc: 'https://cs.uwaterloo.ca/~a78khan/courses-offered/cs446/2010_05/lecture-slides/11_CloudComputing.pdf', 
        topics: [
           { name: 'Cloud Models (IaaS, PaaS, SaaS)', videoId: 'RWgW-CgdIk0' },
           { name: 'AWS Architecture & Services', videoId: '3XFODda6YXo' }
        ]
      },
      { 
        name: 'Computer Architecture', 
        type: 'core', 
        pdfSrc: 'https://ocw.mit.edu/courses/6-823-computer-system-architecture-fall-2005/ecba46bd56543b355883fe284eff519b_l01_intro.pdf', 
        topics: [
           { name: 'Instruction Set Architecture', videoId: 'cO_5wY7nI9Q' },
           { name: 'Pipelining & Hazards', videoId: '8TqXGg2MhH4' }
        ]
      },
    ]
  }
];

export default function EngineeringHub() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeViewer, setActiveViewer] = useState<{ type: 'pdf' | 'video', url: string, title: string } | null>(null);

  const openPdf = (title: string, src: string) => {
    setActiveViewer({ type: 'pdf', url: `https://docs.google.com/viewer?url=${encodeURIComponent(src)}&embedded=true`, title: title + ' - Detailed PDF Notes' });
  };

  const openVideo = (title: string, videoId: string) => {
    setActiveViewer({ type: 'video', url: `https://www.youtube.com/embed/${videoId}?autoplay=1`, title: title + ' - Topic Lesson' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
          <Library size={240} />
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-3 relative z-10 tracking-tight">Engineering Knowledge Hub</h2>
        <p className="text-violet-100 max-w-2xl relative z-10 font-medium text-lg leading-relaxed">
          Access high-quality university PDFs and topic-wise curated video lessons natively within the application. Master your engineering curriculum step-by-step.
        </p>
      </div>
      
      {/* Year Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 snap-x hide-scrollbar">
        {curriculum.map((year, idx) => (
          <button
            key={year.year}
            onClick={() => setActiveTab(idx)}
            className={`snap-start whitespace-nowrap px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === idx 
                ? 'bg-violet-600 text-white shadow-md shadow-violet-200 scale-100' 
                : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-slate-200 scale-95'
            }`}
          >
            {year.year}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {curriculum[activeTab].subjects.map((sub, sIdx) => (
            <div key={sIdx} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-100 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                <h3 className="text-xl font-black text-slate-800 leading-tight pr-8 relative z-10">{sub.name}</h3>
                <span className="inline-block mt-3 px-3 py-1 bg-violet-50 text-violet-700 font-bold uppercase tracking-widest text-[10px] rounded-md relative z-10">
                  {sub.type === 'core' ? 'Core Subject' : 'Computer Science'}
                </span>
                
                <button 
                  onClick={() => openPdf(sub.name, sub.pdfSrc)}
                  className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors shadow-md relative z-10"
                >
                  <FileText size={18} className="text-rose-400" />
                  Open Full Syllabus PDF
                </button>
              </div>
              
              <div className="p-6 flex-1 bg-white">
                <h4 className="text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">Topic-wise Videos</h4>
                <div className="space-y-3">
                  {sub.topics.map((topic, tIdx) => (
                    <button 
                      key={tIdx}
                      onClick={() => openVideo(`${sub.name} - ${topic.name}`, topic.videoId)}
                      className="w-full text-left flex items-start gap-3 p-3 rounded-xl hover:bg-fuchsia-50 border border-transparent hover:border-fuchsia-100 transition-colors group"
                    >
                      <div className="mt-0.5 min-w-[24px]">
                        <PlayCircle size={20} className="text-slate-300 group-hover:text-fuchsia-500 transition-colors" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 group-hover:text-fuchsia-800 transition-colors text-sm leading-snug">
                          {topic.name}
                        </p>
                        <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Video Lesson</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Viewer Modal */}
      <AnimatePresence>
        {activeViewer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-700 relative"
            >
              <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between z-10 shadow-sm relative">
                <h3 className="font-black text-slate-800 flex items-center gap-3">
                  {activeViewer.type === 'pdf' ? (
                    <div className="w-10 h-10 bg-rose-50 text-rose-500 flex items-center justify-center rounded-xl"><FileText size={20} /></div>
                  ) : (
                    <div className="w-10 h-10 bg-fuchsia-50 text-fuchsia-500 flex items-center justify-center rounded-xl"><Video size={20} /></div>
                  )}
                  {activeViewer.title}
                </h3>
                <button
                  onClick={() => setActiveViewer(null)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 bg-slate-100 w-full h-full relative">
                {activeViewer.type === 'video' ? (
                  <iframe
                    src={activeViewer.url}
                    className="w-full h-full border-none absolute inset-0 bg-black"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <iframe
                    src={activeViewer.url}
                    className="w-full h-full border-none absolute inset-0 bg-slate-100"
                    title={activeViewer.title}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
