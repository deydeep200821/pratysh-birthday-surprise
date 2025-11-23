import React, { useState, useEffect, useRef } from 'react';
import { Background } from './components/Background';
import { Candle } from './components/Candle';
import { Cake } from './components/Cake';
import { Note } from './components/Note';
import { AppState } from './types';
import { BACKGROUND_TRACK_1, BACKGROUND_TRACK_2 } from './constants';
import { Sparkles, Music } from 'lucide-react';

function App() {
  const [state, setState] = useState<AppState>(AppState.INITIAL);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  // Audio Refs
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);

  // Fade transition logic
  const fadeOut = (audio: HTMLAudioElement, duration = 2000) => {
    const startVolume = audio.volume;
    const step = startVolume / (duration / 100);
    const interval = setInterval(() => {
      if (audio.volume - step > 0) {
        audio.volume -= step;
      } else {
        audio.volume = 0;
        audio.pause();
        clearInterval(interval);
      }
    }, 100);
  };

  const fadeIn = (audio: HTMLAudioElement, targetVolume = 0.5, duration = 2000) => {
    audio.volume = 0;
    audio.play().catch(e => console.log("Audio playback failed", e));
    const step = targetVolume / (duration / 100);
    const interval = setInterval(() => {
      if (audio.volume + step < targetVolume) {
        audio.volume += step;
      } else {
        audio.volume = targetVolume;
        clearInterval(interval);
      }
    }, 100);
  };

  const handleStart = () => {
    setAudioEnabled(true);
    setState(AppState.DARKNESS);
    
    // Initialization animation logic
    setTimeout(() => {
      setState(AppState.CANDLE);
    }, 3000); // 3 seconds of darkness/light emerging
  };

  const handleCandleBlown = () => {
    setState(AppState.CANDLE_BLOWN);
    
    // Start Music 1 (Arijit Singh)
    if (audio1Ref.current) {
      fadeIn(audio1Ref.current, 0.6);
    }

    // Transition to Cake after 4 seconds (letting smoke settle)
    setTimeout(() => {
      setState(AppState.CAKE_ENTRANCE);
    }, 4000);
  };

  const handleCakeFinished = () => {
    setState(AppState.FUNNY_MSG);
    
    // Transition music from Sentimental to Funny/Happy
    if (audio1Ref.current) fadeOut(audio1Ref.current);
    
    setTimeout(() => {
        if (audio2Ref.current) fadeIn(audio2Ref.current, 0.5);
        setState(AppState.LETTER);
    }, 1000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Hidden Audio Elements */}
      <audio ref={audio1Ref} src={BACKGROUND_TRACK_1} loop />
      <audio ref={audio2Ref} src={BACKGROUND_TRACK_2} loop />

      {/* Background Layer (Only visible after Darkness phase) */}
      <div className={`transition-opacity duration-[3000ms] ${state === AppState.INITIAL || state === AppState.DARKNESS ? 'opacity-0' : 'opacity-100'}`}>
        <Background />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        
        {/* INITIAL STATE: Start Button */}
        {state === AppState.INITIAL && (
          <div className="text-center">
             <h1 className="text-4xl md:text-6xl text-white font-handwriting mb-8 animate-pulse">
               For Pratyasha...
             </h1>
            <button 
              onClick={handleStart}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-[0_0_15px_rgba(236,72,153,0.8)] transition-all transform hover:scale-105 flex items-center mx-auto gap-2"
            >
              <Sparkles className="w-5 h-5" /> Open Surprise <Music className="w-4 h-4 ml-1"/>
            </button>
          </div>
        )}

        {/* DARKNESS -> LIGHT STATE */}
        {state === AppState.DARKNESS && (
            <div className="w-full h-full bg-black flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_100px_20px_rgba(255,255,255,0.8)] animate-[ping_3s_ease-in-out_infinite]"></div>
            </div>
        )}

        {/* CANDLE STATE */}
        {(state === AppState.CANDLE || state === AppState.CANDLE_BLOWN) && (
            <div className={`transition-opacity duration-1000 ${state === AppState.CANDLE_BLOWN ? 'opacity-0 scale-95' : 'opacity-100'}`}>
                <Candle onBlown={handleCandleBlown} />
            </div>
        )}

        {/* CAKE STATE */}
        {(state === AppState.CAKE_ENTRANCE || state === AppState.CAKE_INTERACTION) && (
            <div className="animate-[smoke_1s_ease-out_reverse_forwards]" style={{animationFillMode: 'forwards', animationName: 'fadeInUp'}}>
                 <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
                <Cake onFinished={handleCakeFinished} />
            </div>
        )}

        {/* LETTER STATE */}
        {state === AppState.LETTER && (
            <div className="w-full h-full pt-10 animate-in fade-in duration-1000 slide-in-from-bottom-10">
                <Note onComplete={() => setState(AppState.FINAL)} />
            </div>
        )}

      </div>
    </div>
  );
}

export default App;
