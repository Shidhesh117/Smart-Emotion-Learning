import { motion, AnimatePresence } from 'motion/react';
import { LearningState } from '../types';
import { BookOpen, HelpCircle, Activity, BrainCircuit, ExternalLink, ThumbsUp, Video } from 'lucide-react';

interface LessonContentProps {
  learningState: LearningState;
}

export default function LessonContent({ learningState }: LessonContentProps) {
  
  const contentConfig = {
    focused: {
      icon: <BookOpen className="text-blue-500" />,
      title: "Core Lesson: Matrices & Rank calculation",
      description: "You're focused! Essential for GATE Engineering Mathematics.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      videoUrl: "https://www.youtube.com/embed/jGwO_UgTS7I?start=0", 
      extraContent: (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Concept: Matrix Operations</h3>
          <p className="text-slate-700 leading-relaxed">
            In Indian engineering entrance exams like <strong>GATE</strong>, the concept of Matrix Rank and Eigenvalues holds significant weightage (typically 3-4 marks).
          </p>
        </div>
      )
    },
    bored: {
      icon: <Activity className="text-orange-500" />,
      title: "Quick Brahminy Analogy!",
      description: "You seem a bit disengaged. Let's look at this differently.",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100",
      videoUrl: "https://www.youtube.com/embed/aircAruvnKk", 
      extraContent: (
        <div className="mt-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-slate-800">Quick Check: NPTEL Style Question</h3>
            <p className="text-slate-600 mb-4">"Which of the following describes the rank of a 3x3 identity matrix?"</p>
            <div className="space-y-3">
              {['1', '2', '3', '0'].map((option, idx) => (
                <button key={idx} className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-colors font-medium">
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    confused: {
      icon: <HelpCircle className="text-purple-500" />,
      title: "Simplified Explanation (NCERT Style)",
      description: "It looks like this topic is tricky. Let's look at simpler analogies.",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      videoUrl: "https://www.youtube.com/embed/kE5QZ8G_78c", 
      extraContent: (
        <div className="mt-6">
          <div className="bg-white p-6 rounded-xl border-l-4 border-l-purple-500 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <HelpCircle size={100} />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-slate-800">The "Kirana Store" Analogy</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Think of <strong>Matrices</strong> like a bill at a Kirana store. Each row is an item, and columns represent quantity and price. Simple, right?
            </p>
          </div>
        </div>
      )
    },
    happy: {
      icon: <BrainCircuit className="text-emerald-500" />,
      title: "Advanced Engineering Challenge!",
      description: "You're finding this easy! Try diving deeper.",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      videoUrl: "https://www.youtube.com/embed/Ilg3gGewQ5U", 
      extraContent: (
        <div className="mt-6">
           <div className="bg-slate-900 text-slate-300 p-6 rounded-xl font-mono text-sm leading-relaxed shadow-lg">
             <p className="text-emerald-400 mb-2">// Advanced Topic: Cayley-Hamilton Theorem</p>
             <p>Every square matrix A satisfies its characteristic equation |A - λI| = 0.</p>
             <div className="bg-slate-800 p-4 rounded mt-4 text-white overflow-x-auto text-lg italic">
                <p>p(A) = 0</p>
             </div>
           </div>
        </div>
      )
    }
  };

  const currentConfig = contentConfig[learningState];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className={`p-5 border-b flex items-start gap-4 transition-colors duration-500 ${currentConfig.bgColor} ${currentConfig.borderColor}`}>
        <div className="p-3 bg-white rounded-xl shadow-sm shrink-0">
          {currentConfig.icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">{currentConfig.title}</h2>
          <p className="text-slate-600 text-sm font-medium">{currentConfig.description}</p>
        </div>
      </div>
      
      <div className="p-6 flex-1 relative bg-white overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={learningState}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* The Video Player adapted based on Emotion */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-md border border-slate-200">
               <iframe
                 className="absolute inset-0 w-full h-full border-none"
                 src={currentConfig.videoUrl}
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               />
               <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border border-slate-700">
                  <Video size={14} className={learningState === 'focused' ? 'text-blue-400' : 'text-violet-400'} /> 
                  AI Adapted Stream
               </div>
            </div>

            {currentConfig.extraContent}
            
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
