import { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import { Emotion } from '../types';
import { Loader2, Camera, CameraOff, AlertCircle } from 'lucide-react';

interface WebcamScannerProps {
  onEmotionDetected: (emotion: Emotion) => void;
  currentEmotion: Emotion;
  minimal?: boolean;
}

const MODEL_URL = 'https://vladmandic.github.io/face-api/model/';

export default function WebcamScanner({ onEmotionDetected, currentEmotion, minimal = false }: WebcamScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  useEffect(() => {
    let active = true;

    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        if (active) setIsModelLoaded(true);
      } catch (err) {
        console.error("Failed to load models", err);
        if (active) setError("Failed to load AI models. Please check your connection.");
      }
    };

    loadModels();
    
    return () => { active = false; };
  }, []);

  const startVideo = async () => {
    if (!isModelLoaded) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 400, height: 300 } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCameraAccess(true);
      setIsCameraStarted(true);
    } catch (err) {
      console.error("Camera access denied", err);
      setHasCameraAccess(false);
      setError("Camera access denied. Please enable camera permissions.");
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
         streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!isCameraStarted || !isModelLoaded || !hasCameraAccess) return;
    
    const intervalId = setInterval(async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        try {
          const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
          
          if (detections) {
            const expressions = detections.expressions;
            let maxEmotion = Emotion.Neutral;
            let maxProb = -1;
            
            for (const [evt, prob] of Object.entries(expressions)) {
              if (prob > maxProb) {
                maxProb = prob;
                maxEmotion = evt as Emotion;
              }
            }
            onEmotionDetected(maxEmotion);
          }
        } catch (err) {
          console.error("Detection error:", err);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isModelLoaded, hasCameraAccess, onEmotionDetected]);

  if (minimal) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl flex items-center justify-between text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
             <Camera size={18} className={isModelLoaded && hasCameraAccess && isCameraStarted ? "text-emerald-400" : "text-slate-500"} />
             {isModelLoaded && hasCameraAccess && isCameraStarted && (
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
             )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">AI Observer</span>
            <span className="text-sm font-bold capitalize text-violet-300">
              {!isModelLoaded ? 'Loading Models...' : 
               !isCameraStarted ? 'Ready' :
               !hasCameraAccess ? 'Camera Blocked' :
               currentEmotion || 'Watching...'}
            </span>
          </div>
        </div>
        
        {!isCameraStarted && isModelLoaded ? (
           <button 
             onClick={startVideo}
             className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-xs font-bold rounded-lg transition-colors"
           >
             Start Camera
           </button>
        ) : null}

        {/* Hidden video element for processing */}
        <div className="overflow-hidden w-0 h-0 absolute opacity-0 pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Camera size={20} className="text-blue-500" />
        <h2 className="text-lg font-semibold text-slate-800">Emotion Sensor</h2>
      </div>

      <div className="relative w-full border-2 border-slate-200 aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center mb-6">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transform -scale-x-100"
        />
        
        {!isModelLoaded && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 text-white z-10 backdrop-blur-sm">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p className="text-sm font-medium">Loading AI Models...</p>
          </div>
        )}

        {isModelLoaded && !isCameraStarted && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/90 text-white z-10">
            <Camera className="text-slate-400 mb-4" size={48} />
            <p className="text-center mb-4 max-w-xs text-slate-300">Enable your webcam so the AI can analyze your learning state.</p>
            <button 
              onClick={startVideo}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              Allow Camera Access
            </button>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-white z-10 backdrop-blur-sm p-4 text-center">
            <AlertCircle className="text-red-400 mb-2" size={32} />
            <p className="text-sm font-medium text-red-200">{error}</p>
          </div>
        )}

        {isModelLoaded && hasCameraAccess === false && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-white z-10 backdrop-blur-sm p-4 text-center">
            <CameraOff className="text-slate-400 mb-2" size={32} />
            <p className="text-sm font-medium">Camera Required</p>
            <p className="text-xs text-slate-400 mt-1">Please allow camera access to use this feature.</p>
          </div>
        )}
      </div>

      <div className="mt-auto bg-slate-50 p-4 rounded-xl border border-slate-100">
        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Current State</p>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <span className="text-lg font-medium text-slate-800 capitalize">
            {currentEmotion || 'Analyzing...'}
          </span>
        </div>
      </div>
    </div>
  );
}
