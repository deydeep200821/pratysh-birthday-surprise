import React, { useEffect, useRef, useState } from 'react';
import { MIC_SENSITIVITY_THRESHOLD, BLOW_DURATION_MS } from '../constants';
import { Mic } from 'lucide-react';

interface CandleProps {
  onBlown: () => void;
}

export const Candle: React.FC<CandleProps> = ({ onBlown }) => {
  const [micAccess, setMicAccess] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0);
  const [isExtinguished, setIsExtinguished] = useState<boolean>(false);
  const blowTimeRef = useRef<number>(0);
  const requestRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    const initMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicAccess(true);
        
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;
        
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const checkVolume = () => {
          if (!analyserRef.current) return;
          
          analyserRef.current.getByteFrequencyData(dataArray);
          // Calculate average volume
          const sum = dataArray.reduce((a, b) => a + b, 0);
          const avg = sum / bufferLength;
          setVolume(avg);

          if (avg > MIC_SENSITIVITY_THRESHOLD) {
             blowTimeRef.current += 1000 / 60; // Add roughly 1 frame worth of ms
          } else {
             blowTimeRef.current = Math.max(0, blowTimeRef.current - 50); // Decay
          }

          if (blowTimeRef.current > BLOW_DURATION_MS && !isExtinguished) {
             setIsExtinguished(true);
             setTimeout(onBlown, 2000); // Wait for smoke animation then callback
          }

          if (!isExtinguished) {
             requestRef.current = requestAnimationFrame(checkVolume);
          }
        };

        checkVolume();
      } catch (err) {
        console.error("Mic access denied", err);
        // Fallback: Auto blow after 5 seconds if mic fails
        setTimeout(() => {
            setIsExtinguished(true);
            setTimeout(onBlown, 2000);
        }, 5000);
      }
    };

    initMic();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full transition-opacity duration-1000">
        {!micAccess && (
            <div className="text-white/50 mb-8 animate-pulse flex flex-col items-center gap-2">
                <Mic className="w-6 h-6" />
                <p>Please allow microphone access to blow out the candle...</p>
            </div>
        )}
        
        {micAccess && !isExtinguished && (
            <div className="text-white/80 mb-12 font-handwriting text-3xl animate-bounce">
                "Make a wish and blow into the mic!" 🌬️
            </div>
        )}

      <div className="relative">
        {/* Flame */}
        {!isExtinguished && (
           <div 
             className="absolute -top-16 left-1/2 -translate-x-1/2 w-8 h-16 bg-gradient-to-t from-orange-500 via-yellow-300 to-white rounded-full blur-sm candle-flame"
             style={{
                opacity: Math.max(0.4, 1 - (volume / 100)), // Flicker dim on loud noise before dying
                transform: `translate(-50%) scale(${1 - Math.min(0.8, blowTimeRef.current / BLOW_DURATION_MS)})`
             }}
           >
             <div className="absolute inset-0 bg-yellow-200 rounded-full opacity-50 blur-md animate-pulse"></div>
           </div>
        )}

        {/* Smoke when extinguished */}
        {isExtinguished && (
            <div className="absolute -top-24 left-1/2 -translate-x-1/2">
                <div className="w-4 h-4 bg-gray-400 rounded-full blur-md animate-[smoke_2s_ease-out_forwards]"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full blur-md animate-[smoke_2.5s_ease-out_0.5s_forwards]"></div>
            </div>
        )}

        {/* Candle Body */}
        <div className="w-16 h-48 bg-gradient-to-b from-rose-300 to-rose-500 rounded-lg shadow-[0_0_30px_rgba(251,113,133,0.6)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-4 bg-black -mt-2"></div>
            {/* Wax drips */}
            <div className="absolute top-2 left-2 w-2 h-8 bg-rose-400 rounded-full opacity-80"></div>
            <div className="absolute top-4 right-3 w-3 h-6 bg-rose-400 rounded-full opacity-80"></div>
        </div>
        
        {/* Candle Base Light */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-rose-500/30 blur-xl rounded-full"></div>
      </div>
      
      {/* Debug visualization (optional, kept hidden for aesthetics but good for logic check) */}
      {/* <div className="fixed bottom-0 left-0 text-white text-xs">{volume.toFixed(2)} | {blowTimeRef.current}</div> */}
    </div>
  );
};
