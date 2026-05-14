import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, User, Send, Mic, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AiTutor() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your personalized AI. How can I help clarify things?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    chatRef.current = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are an encouraging and helpful AI Tutor for students. Use simple analogies, answer questions clearly, and be concise.",
      },
    });
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const currentInput = input;
    const newUserMsg: Message = { id: Date.now(), text: currentInput, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await chatRef.current.sendMessage({ message: currentInput });
      if (response && response.text) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: response.text,
          sender: 'ai'
        }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "I'm having trouble connecting right now. Please try again later.",
        sender: 'ai'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[600px] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">AI Tutor & Voice Assistant</h2>
            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
          <Sparkles size={14} className="text-yellow-500" />
          <span>Powered by Gemini</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(msg => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-indigo-100 text-indigo-600'
              }`}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-700 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-end gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <button 
            onClick={toggleListening}
            className={`p-3 rounded-xl transition-colors ${
              isListening ? 'bg-red-100 text-red-500 shadow-inner' : 'bg-white text-slate-500 hover:text-indigo-500 hover:bg-indigo-50 border border-slate-200'
            }`}
            title="Voice Assistant"
          >
            <Mic size={20} className={isListening ? 'animate-pulse' : ''} />
          </button>
          
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={isListening ? "Listening..." : "Ask your learning assistant..."}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none p-2 max-h-32 min-h-[44px] outline-none text-slate-700"
            rows={1}
          />
          
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
