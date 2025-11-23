import React, { useEffect, useRef, useState } from 'react';
import { MIC_SENSITIVITY_THRESHOLD, BLOW_DURATION_MS } from '../constants';
import { Mic, MicOff } from 'lucide-react';

interface CandleProps {
  onBlown: () => void;
}

export const Candle: React.FC<CandleProps> = ({ onBlown }) => {
  const [micAccess, setMicAccess] = useState<boolean>(false);
  const [micError, setMicError] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0);
  const [isExtinguished, setIsExtinguished] = useState<boolean>(false);
  
  // Refs with initial values to fix TS errors
  const blowTimeRef = useRef<number>(0);
  const requestRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const handleManualBlow = () => {
    if (isExtinguished) return;
    setIsExtinguished(true);
    setTimeout(onBlown, 2000);
  };

  useEffect(() => {
    const initMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicAccess(true);
        setMicError(false);
        
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

          // Lowered sensitivity check
          if (avg > 10) { // Even lighter breath can trigger it
             blowTimeRef.current += 1000 / 60; 
          } else {
             blowTimeRef.current = Math.max(0, blowTimeRef.current - 50); // Decay
          }

          if (blowTimeRef.current > 1500 && !isExtinguished) { // 1.5s cumulative blow
             handleManualBlow();
          }

          if (!isExtinguished) {
             requestRef.current = requestAnimationFrame(checkVolume);
          }
        };

        checkVolume();
      } catch (err) {
        console.error("Mic access denied or not supported", err);
        setMicError(true);
      }
    };

    initMic();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (audioContextRef.current) {
          if (audioContextRef.current.state !== 'closed') {
              audioContextRef.current.close();
          }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExtinguished]);

  return (
    <div className="flex flex-col items-center justify-center h-full transition-opacity duration-1000 relative z-20">
        
        {/* Instructions / Mic Status */}
        <div className="absolute top-20 text-center w-full px-4">
            {!micAccess && !micError && (
                <div className="text-white/70 animate-pulse flex flex-col items-center gap-2">
                    <Mic className="w-6 h-6" />
                    <p>Tap "Allow" for Microphone access...</p>
                </div>
            )}
            
            {micError && (
                <div className="text-rose-300 flex flex-col items-center gap-2 bg-black/30 p-2 rounded-lg backdrop-blur-sm">
                    <MicOff className="w-6 h-6" />
                    <p>Microphone unavailable. <br/> <b>Tap the candle to blow it out!</b></p>
                </div>
            )}

            {micAccess && !isExtinguished && (
                <div className="flex flex-col items-center gap-2">
                    <div className="text-white/90 font-handwriting text-2xl animate-bounce drop-shadow-lg">
                        "Blow into your mic!" 🌬️
                    </div>
                    {/* Volume Meter */}
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden border border-gray-500">
                        <div 
                            className="h-full bg-green-400 transition-all duration-75 ease-out"
                            style={{ width: `${Math.min(100, volume * 2)}%` }}
                        ></div>
                    </div>
                    <p className="text-white/50 text-xs mt-1">(Or tap the candle if it's stuck)</p>
                </div>
            )}
        </div>

      <div className="relative cursor-pointer group" onClick={handleManualBlow}>
        {/* Flame */}
        {!isExtinguished && (
           <div 
             className="absolute -top-16 left-1/2 -translate-x-1/2 w-8 h-16 bg-gradient-to-t from-orange-500 via-yellow-300 to-white rounded-full blur-sm candle-flame group-hover:scale-110 transition-transform"
             style={{
                opacity: Math.max(0.6, 1 - (volume / 100)), 
                transform: `translate(-50%) scale(${1 - Math.min(0.5, blowTimeRef.current / BLOW_DURATION_MS)})`
             }}
           >
             <div className="absolute inset-0 bg-yellow-200 rounded-full opacity-50 blur-md animate-pulse"></div>
           </div>
        )}

        {/* Smoke */}
        {isExtinguished && (
            <div className="absolute -top-24 left-1/2 -translate-x-1/2">
                <div className="w-6 h-6 bg-gray-400 rounded-full blur-xl animate-[smoke_2s_ease-out_forwards]"></div>
                <div className="w-5 h-5 bg-gray-300 rounded-full blur-lg animate-[smoke_2.5s_ease-out_0.3s_forwards]"></div>
            </div>
        )}

        {/* Candle Body */}
        <div className="w-20 h-56 bg-gradient-to-b from-rose-300 via-rose-400 to-rose-600 rounded-lg shadow-[0_0_50px_rgba(251,113,133,0.4)] relative border-b-4 border-rose-800">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-4 bg-black/60 -mt-2"></div>
            {/* Wax drips */}
            <div className="absolute top-0 left-2 w-3 h-12 bg-rose-300 rounded-b-full opacity-90 shadow-sm"></div>
            <div className="absolute top-0 right-4 w-2 h-8 bg-rose-300 rounded-b-full opacity-90 shadow-sm"></div>
            <div className="absolute top-4 left-8 w-2 h-16 bg-rose-400 rounded-b-full opacity-80"></div>
        </div>
        
        {/* Glow */}
        {!isExtinguished && (
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-12 bg-rose-500/40 blur-2xl rounded-full animate-pulse"></div>
        )}
      </div>
    </div>
  );
};