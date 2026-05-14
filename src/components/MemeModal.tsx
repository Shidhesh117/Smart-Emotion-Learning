import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, PlayCircle, Gamepad2, Smile } from 'lucide-react';

interface MemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayGame: () => void;
}

const engineeringMemes = [
  { img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=600&h=400", overlay: "When your code compiles on the first try..." },
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600&h=400", overlay: "The circuit works... but don't touch anything!" },
  { img: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=600&h=400", overlay: "Me reading the 500-page Calculus textbook before the exam" }
];

export default function MemeModal({ isOpen, onClose, onPlayGame }: MemeModalProps) {
  const [currentMeme, setCurrentMeme] = React.useState(0);

  const nextMeme = () => {
    setCurrentMeme((prev) => (prev + 1) % engineeringMemes.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-6 shadow-2xl z-[101] w-full max-w-lg overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                <Smile className="text-amber-500" /> Engineer's Break Room
              </h3>
              <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative cursor-pointer group" onClick={nextMeme}>
               <img src={engineeringMemes[currentMeme].img} alt="Meme" className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-black/40">
                  <h4 className="text-2xl lg:text-3xl font-black text-white drop-shadow-lg leading-snug">
                     {engineeringMemes[currentMeme].overlay}
                  </h4>
               </div>
               <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                 Tap for next meme <PlayCircle size={16} />
               </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button onClick={onPlayGame} className="flex flex-col items-center justify-center gap-2 py-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-2xl transition-colors font-bold">
                <Gamepad2 size={28} />
                Play a Game
              </button>
              <button className="flex flex-col items-center justify-center gap-2 py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-2xl transition-colors font-bold">
                <PlayCircle size={28} />
                Watch a Video
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
