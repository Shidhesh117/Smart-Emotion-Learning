import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Hash, Brain, Code, X, Play, RotateCcw, Grid3X3 } from 'lucide-react';

const basicGames = [
  {
    id: 'math-sprint',
    title: 'Math Sprint',
    category: 'Mental Math',
    description: 'Solve as many operations as you can in 30 seconds. Boost your computation speed!',
    icon: <Hash size={32} className="text-orange-500" />,
    color: 'bg-orange-50 border-orange-200',
    hover: 'hover:border-orange-400'
  },
  {
    id: 'typing-speed',
    title: 'Typing Sprint',
    category: 'Keyboard Skills',
    description: 'Type the given sentences as fast as you can to improve WPM!',
    icon: <Code size={32} className="text-blue-500" />,
    color: 'bg-blue-50 border-blue-200',
    hover: 'hover:border-blue-400'
  },
  {
    id: 'code-debugger',
    title: 'Code Debugger',
    category: 'Logic',
    description: 'Spot the bug in simple JavaScript snippets.',
    icon: <Code size={32} className="text-fuchsia-500" />,
    color: 'bg-fuchsia-50 border-fuchsia-200',
    hover: 'hover:border-fuchsia-400'
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    category: 'Strategy',
    description: 'Play a quick game of Tic Tac Toe against yourself or a friend.',
    icon: <Grid3X3 size={32} className="text-emerald-500" />,
    color: 'bg-emerald-50 border-emerald-200',
    hover: 'hover:border-emerald-400'
  }
];

export default function Games() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  // Code Debugger Game State
  const [codeGameStep, setCodeGameStep] = useState(0);
  const codeQuestions = [
    { code: 'function add(a, b) {\n  return a - b; // BUG!\n}', options: ['return a * b;', 'return a + b;', 'return a / b;'], correct: 1 },
    { code: 'const arr = [1, 2, 3];\nconsole.log(arr[3]); // Undefined', options: ['console.log(arr[1]);', 'console.log(arr[2]);', 'console.log(arr[0]);'], correct: 1 },
    { code: 'while (true) {\n  console.log("Hello");\n}', options: ['if (true)', 'for (let i = 0; i < 5; i++)', 'do { } while()'], correct: 1 }
  ];

  const handleCodeGameAnswer = (idx: number) => {
    if (idx === codeQuestions[codeGameStep].correct) {
      if (codeGameStep < codeQuestions.length - 1) {
        setCodeGameStep(codeGameStep + 1);
      } else {
        setCodeGameStep(-1); // win state
      }
    } else {
      alert("Oops! That's not the right fix. Try again.");
    }
  };

  // Math Sprint Game State
  const [mathScore, setMathScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [mathPlaying, setMathPlaying] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [op, setOp] = useState('+');
  const [userMathAns, setUserMathAns] = useState('');

  const startMathGame = () => {
    setMathScore(0);
    setTimeLeft(30);
    setMathPlaying(true);
    generateMathProblem();
  };

  const generateMathProblem = () => {
    const ops = ['+', '-', '*'];
    const selectedOp = ops[Math.floor(Math.random() * ops.length)];
    setOp(selectedOp);
    if (selectedOp === '*') {
      setNum1(Math.floor(Math.random() * 12) + 1);
      setNum2(Math.floor(Math.random() * 12) + 1);
    } else {
      let a = Math.floor(Math.random() * 50) + 1;
      let b = Math.floor(Math.random() * 50) + 1;
      if (selectedOp === '-' && a < b) [a, b] = [b, a];
      setNum1(a);
      setNum2(b);
    }
    setUserMathAns('');
  };

  useEffect(() => {
    if (activeGame === 'math-sprint' && mathPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setMathPlaying(false);
    }
  }, [activeGame, mathPlaying, timeLeft]);

  const handleMathSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correctAns = 0;
    if (op === '+') correctAns = num1 + num2;
    if (op === '-') correctAns = num1 - num2;
    if (op === '*') correctAns = num1 * num2;
    
    if (parseInt(userMathAns) === correctAns) {
      setMathScore(s => s + 10);
      generateMathProblem();
    } else {
      setUserMathAns('');
    }
  };

  // Typing Speed Game State
  const sentences = [
    "India is a land of diversity and rich heritage from the Himalayas to Kanyakumari.",
    "The Indian Institutes of Technology are among the most prestigious engineering institutions globally.",
    "Aryabhata was a famous Indian mathematician and astronomer who discovered zero.",
    "Sustainable development and renewable energy are key goals for modern Indian engineering projects."
  ];
  const [typingSentence, setTypingSentence] = useState('');
  const [typingInput, setTypingInput] = useState('');
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [typingPlaying, setTypingPlaying] = useState(false);

  const startTypingGame = () => {
    setTypingSentence(sentences[Math.floor(Math.random() * sentences.length)]);
    setTypingInput('');
    setWpm(null);
    setTypingStartTime(Date.now());
    setTypingPlaying(true);
  };

  const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTypingInput(val);
    if (val === typingSentence && typingStartTime) {
      const timeSec = (Date.now() - typingStartTime) / 1000;
      const words = typingSentence.split(' ').length;
      setWpm(Math.round((words / timeSec) * 60));
      setTypingPlaying(false);
    }
  };

  // Tic Tac Toe State
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const ticTacWinner = calculateWinner(board);
  const isDraw = !ticTacWinner && board.every(Boolean);

  const handleTicTacClick = (i: number) => {
    if (calculateWinner(board) || board[i]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  return (
    <div className="space-y-6 flex flex-col flex-1 h-full min-h-[600px]">
      {!activeGame && (
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 rounded-2xl shadow-sm text-white flex items-center justify-between relative overflow-hidden shrink-0">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
            <Gamepad2 size={250} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-2 flex items-center gap-3">
              <Gamepad2 className="text-white" size={36} /> Play & Learn
            </h2>
            <p className="text-violet-100 max-w-xl font-medium">Take a break and reinforce your knowledge through basic, fun challenges.</p>
          </div>
        </div>
      )}

      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-8">
          {basicGames.map((game, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={game.id} 
              className={`p-6 rounded-2xl border-2 ${game.color} ${game.hover} transition-all cursor-pointer group flex flex-col min-h-[220px] bg-white`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  {game.icon}
                </div>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg">
                  {game.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-violet-700 transition-colors">{game.title}</h3>
              <p className="text-slate-600 flex-1 font-medium">{game.description}</p>
              
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-400 uppercase">Level: Basic</span>
                <button 
                  onClick={() => setActiveGame(game.id)}
                  className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-sm group-hover:bg-violet-600 transition-colors flex items-center gap-2"
                >
                  <Play size={16} /> Play Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 bg-slate-950 rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-800 relative z-50"
        >
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-white">
            <h3 className="font-bold font-mono text-violet-400 flex items-center gap-2">
              &gt; {basicGames.find(g => g.id === activeGame)?.title}
              <span className="animate-pulse bg-violet-500 w-2 h-4 inline-block"></span>
            </h3>
            <button 
              onClick={() => { setActiveGame(null); setCodeGameStep(0); setMathPlaying(false); }}
              className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors flex items-center gap-2"
            >
              <X size={18} /> Exit Game
            </button>
          </div>

          <div className="flex-1 p-8 flex items-center justify-center text-white relative h-full overflow-y-auto">
            
            {/* CODE DEBUGGER GAME */}
            {activeGame === 'code-debugger' && (
              <div className="max-w-2xl w-full">
                {codeGameStep >= 0 ? (
                  <>
                    <h4 className="text-xl font-bold mb-6 text-center">Fix the bug to advance! (Level {codeGameStep + 1}/3)</h4>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-lg mb-8 text-fuchsia-300">
                      <pre>{codeQuestions[codeGameStep].code}</pre>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {codeQuestions[codeGameStep].options.map((opt, i) => (
                        <button 
                          key={i}
                          onClick={() => handleCodeGameAnswer(i)}
                          className="px-6 py-4 bg-slate-800 hover:bg-violet-600 border border-slate-700 hover:border-violet-400 text-left rounded-xl transition-all font-mono hover:scale-105"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                     <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                       <Code size={48} />
                     </div>
                     <h2 className="text-3xl font-bold text-emerald-400 mb-4">Mission Accomplished!</h2>
                     <p className="text-slate-400 mb-8 max-w-md mx-auto">You've successfully debugged all the code snippets. +150 XP awarded to your profile!</p>
                     <button 
                       onClick={() => setCodeGameStep(0)}
                       className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl flex items-center gap-2 mx-auto"
                     >
                       <RotateCcw size={18} /> Play Again
                     </button>
                  </div>
                )}
              </div>
            )}

            {/* MATH SPRINT GAME */}
            {activeGame === 'math-sprint' && (
              <div className="max-w-md w-full text-center">
                {!mathPlaying && timeLeft === 30 ? (
                  <div>
                     <div className="w-24 h-24 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
                       <Hash size={48} />
                     </div>
                     <h2 className="text-3xl font-bold text-orange-400 mb-4">Math Sprint</h2>
                     <p className="text-slate-400 mb-8 max-w-md mx-auto">Solve as many equations as you can in 30 seconds.</p>
                     <button 
                       onClick={startMathGame}
                       className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg rounded-xl flex items-center gap-2 mx-auto"
                     >
                       <Play size={20} /> Start Sprint
                     </button>
                  </div>
                ) : !mathPlaying && timeLeft === 0 ? (
                  <div>
                    <h2 className="text-3xl font-bold text-orange-400 mb-2">Time's Up!</h2>
                    <p className="text-6xl font-black text-white mb-6">{mathScore} <span className="text-xl text-slate-400 font-medium tracking-wide block mt-2">Points Scored</span></p>
                    <button 
                       onClick={startMathGame}
                       className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl flex items-center gap-2 mx-auto"
                     >
                       <RotateCcw size={18} /> Play Again
                     </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-8 px-4">
                      <div className="text-left">
                        <span className="text-slate-400 text-sm uppercase font-bold tracking-widest block">Time Left</span>
                        <span className={`text-4xl font-black ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 text-sm uppercase font-bold tracking-widest block">Score</span>
                        <span className="text-4xl font-black text-orange-400">{mathScore}</span>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl mb-8">
                       <h3 className="text-6xl font-black text-center mb-0">
                         {num1} <span className="text-orange-500 mx-2">{op}</span> {num2}
                       </h3>
                    </div>

                    <form onSubmit={handleMathSubmit}>
                      <input 
                        type="number" 
                        autoFocus
                        value={userMathAns}
                        onChange={e => setUserMathAns(e.target.value)}
                        className="w-full bg-slate-800 border-2 border-slate-600 text-white text-center text-4xl p-6 rounded-2xl outline-none focus:border-orange-500 transition-colors"
                        placeholder="?"
                      />
                    </form>
                  </div>
                )}
              </div>
            )}
            
            {/* TYPING SPEED GAME */}
            {activeGame === 'typing-speed' && (
              <div className="max-w-2xl w-full text-center">
                {!typingPlaying && wpm === null ? (
                  <div>
                     <div className="w-24 h-24 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                       <Code size={48} />
                     </div>
                     <h2 className="text-3xl font-bold text-blue-400 mb-4">Typing Sprint</h2>
                     <p className="text-slate-400 mb-8 max-w-md mx-auto">Type the given text as fast as you can to measure your WPM.</p>
                     <button 
                       onClick={startTypingGame}
                       className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl flex items-center gap-2 mx-auto"
                     >
                       <Play size={20} /> Start Sprint
                     </button>
                  </div>
                ) : !typingPlaying && wpm !== null ? (
                  <div>
                    <h2 className="text-3xl font-bold text-blue-400 mb-2">Sprint Complete!</h2>
                    <p className="text-6xl font-black text-white mb-6">{wpm} <span className="text-xl text-slate-400 font-medium tracking-wide block mt-2">WPM</span></p>
                    <button 
                       onClick={startTypingGame}
                       className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl flex items-center gap-2 mx-auto"
                     >
                       <RotateCcw size={18} /> Play Again
                     </button>
                  </div>
                ) : (
                  <div>
                    <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl mb-8">
                       <p className="text-2xl font-mono text-left leading-relaxed text-slate-300">
                         {typingSentence.split('').map((char, index) => {
                           let color = "text-slate-500"; // un-typed
                           if (index < typingInput.length) {
                             color = typingInput[index] === char ? "text-emerald-400" : "text-red-400 bg-red-950/50 rounded";
                           }
                           return <span key={index} className={color}>{char}</span>;
                         })}
                       </p>
                    </div>

                    <textarea 
                      autoFocus
                      value={typingInput}
                      onChange={handleTypingChange}
                      className="w-full bg-slate-800 border-2 border-slate-600 text-white text-xl p-6 rounded-2xl outline-none focus:border-blue-500 transition-colors font-mono resize-none h-40"
                      placeholder="Start typing here..."
                    />
                  </div>
                )}
              </div>
            )}

            {/* TIC TAC TOE GAME */}
            {activeGame === 'tic-tac-toe' && (
              <div className="max-w-md w-full text-center">
                <div className="mb-6">
                  {ticTacWinner ? (
                    <h2 className="text-3xl font-bold text-emerald-400 mb-2">Winner: {ticTacWinner}</h2>
                  ) : isDraw ? (
                    <h2 className="text-3xl font-bold text-slate-400 mb-2">Draw!</h2>
                  ) : (
                    <h2 className="text-3xl font-bold text-emerald-400 mb-2">Next Player: {xIsNext ? 'X' : 'O'}</h2>
                  )}
                </div>
                
                <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl mx-auto inline-block">
                  <div className="grid grid-cols-3 gap-3">
                    {board.map((square, i) => (
                      <button
                        key={i}
                        onClick={() => handleTicTacClick(i)}
                        className={`w-24 h-24 text-4xl font-black rounded-xl transition-all ${
                          square === 'X' ? 'bg-violet-600 hover:bg-violet-500' :
                          square === 'O' ? 'bg-emerald-600 hover:bg-emerald-500' :
                          'bg-slate-800 hover:bg-slate-700'
                        }`}
                      >
                        {square}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => {
                      setBoard(Array(9).fill(null));
                      setXIsNext(true);
                    }}
                    className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl flex items-center gap-2 mx-auto"
                  >
                    <RotateCcw size={18} /> Reset Game
                  </button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      )}
    </div>
  );
}
