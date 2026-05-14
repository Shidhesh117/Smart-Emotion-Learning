import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Map, Award, BookOpen, Clock, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

const roadmaps = [
  {
    title: 'Computer Science & Information Technology (CS)',
    duration: '6 Months Plan',
    priority: 'High',
    topics: ['Engineering Math', 'Digital Logic', 'COA', 'Programming & DS', 'Algorithms', 'TOC', 'Compiler Design', 'OS', 'DBMS', 'Computer Networks']
  },
  {
    title: 'Electronics & Communication (EC)',
    duration: '8 Months Plan',
    priority: 'Medium',
    topics: ['Engineering Math', 'Networks', 'Electronic Devices', 'Analog Circuits', 'Digital Circuits', 'Signals & Systems', 'Control Systems', 'Communications', 'Electromagnetics']
  }
];

const mockQuestions = [
  {
    id: 1,
    question: "Consider a relation R(A, B, C, D, E, F) with functional dependencies: A → B, C → D, and B, D → E. If {A, C} is the primary key, which normal form is R in?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correct: 0,
    explanation: "It is in 1NF. There are partial dependencies: A → B and C → D, so it is not in 2NF."
  },
  {
    id: 2,
    question: "The time complexity of computing the transitive closure of a binary relation on a set of n elements is known to be:",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(n^3)"],
    correct: 3,
    explanation: "Using Warshall's algorithm, the time complexity is O(n^3)."
  },
  {
    id: 3,
    question: "Which of the following sorting algorithms has the lowest worst-case time complexity?",
    options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
    correct: 0,
    explanation: "Merge Sort has a worst-case time complexity of O(n log n), while the others have O(n^2)."
  }
];

export default function GatePrep() {
  const [activeQuizQuestion, setActiveQuizQuestion] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-sm text-white relative overflow-hidden">
        <Target className="absolute -right-10 -top-10 opacity-10" size={200} />
        <h2 className="text-3xl font-bold mb-2">GATE Preparation & Roadmaps</h2>
        <p className="text-indigo-100 max-w-2xl">Structured preparation guides, topic weightage, strategic roadmaps, and practice questions to help you ace the Graduate Aptitude Test in Engineering.</p>
      </div>

      {activeQuizQuestion >= 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
          <button 
            onClick={() => {
              setActiveQuizQuestion(-1);
              setSelectedOption(null);
            }} 
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 font-bold text-sm"
          >
            ← Back to Menu
          </button>
          
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <HelpCircle className="text-indigo-500" />
            Daily Practice Question {activeQuizQuestion + 1}
          </h3>
          
          <p className="text-lg text-slate-700 font-medium mb-6 leading-relaxed">
            {mockQuestions[activeQuizQuestion].question}
          </p>
          
          <div className="space-y-3 mb-8">
            {mockQuestions[activeQuizQuestion].options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === mockQuestions[activeQuizQuestion].correct;
              const showResult = selectedOption !== null;
              
              let style = "bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50";
              if (showResult) {
                if (isCorrectOption) {
                  style = "bg-emerald-50 border-emerald-400 text-emerald-800";
                } else if (isSelected) {
                  style = "bg-rose-50 border-rose-400 text-rose-800";
                } else {
                  style = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => !showResult && setSelectedOption(idx)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all flex justify-between items-center ${style}`}
                >
                  <span>{option}</span>
                  {showResult && isCorrectOption && <CheckCircle2 className="text-emerald-500" size={20} />}
                  {showResult && isSelected && !isCorrectOption && <XCircle className="text-rose-500" size={20} />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedOption !== null && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-indigo-900 overflow-hidden"
              >
                <p className="font-bold mb-1">Explanation:</p>
                <p>{mockQuestions[activeQuizQuestion].explanation}</p>
                <button 
                  onClick={() => {
                    if (activeQuizQuestion < mockQuestions.length - 1) {
                      setActiveQuizQuestion(activeQuizQuestion + 1);
                      setSelectedOption(null);
                    } else {
                      setActiveQuizQuestion(-1);
                      setSelectedOption(null);
                    }
                  }}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
                >
                  {activeQuizQuestion < mockQuestions.length - 1 ? 'Next Question' : 'Finish Practice'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Map className="text-indigo-500" /> Complete Roadmaps
            </h3>
            {roadmaps.map((map, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                key={idx} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">{map.title}</h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Clock size={16} /> {map.duration}</span>
                      <span className="flex items-center gap-1"><Target size={16} /> Strategy</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-50 text-indigo-600 font-bold rounded-lg hover:bg-indigo-100 transition-colors">
                    View Full Roadmap
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {map.topics.map((topic, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 bg-slate-100 text-slate-600 font-medium text-xs uppercase tracking-wider rounded-md">
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            {/* Quick Practice Section */}
            <div className="bg-indigo-600 p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
               <HelpCircle className="absolute -right-4 -bottom-4 opacity-20" size={120} />
               <h3 className="text-xl font-bold mb-2">Daily Practice</h3>
               <p className="text-indigo-200 text-sm mb-6">Sharpen your concepts with hand-picked GATE previous year questions.</p>
               <button 
                 onClick={() => { setActiveQuizQuestion(0); setSelectedOption(null); }}
                 className="w-full py-3 bg-white text-indigo-600 font-black uppercase tracking-widest rounded-xl hover:bg-indigo-50 transition-colors hover:scale-105 transform duration-200 shadow-lg"
               >
                 Start Quiz
               </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Award className="text-yellow-500" /> Mock Tests
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="p-4 border-2 border-slate-100 rounded-xl hover:border-indigo-500 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Mock Test {num} • 2024 Pattern</h5>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md">New</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span>65 Questions</span>
                      <span>180 Mins</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 text-indigo-600 font-black uppercase tracking-widest bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                View All Tests
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
