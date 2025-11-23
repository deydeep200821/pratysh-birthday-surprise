import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface CakeProps {
  onFinished: () => void;
}

export const Cake: React.FC<CakeProps> = ({ onFinished }) => {
  const [cut, setCut] = useState(false);
  const [eaten, setEaten] = useState(false);
  const [showFunny, setShowFunny] = useState(false);

  const handleCut = () => {
    if (cut) return;
    setCut(true);
    
    // Sequence: Cut (0s) -> Wait (2s) -> Eat (2s) -> Funny Msg (1.5s later) -> Wait (5s) -> Finish
    setTimeout(() => {
        setEaten(true); // Piece disappears
        setTimeout(() => {
            setShowFunny(true); // Funny message appears
            // Only call onFinished after user has had time to read
            setTimeout(() => {
                onFinished();
            }, 6000); // 6 seconds to read message
        }, 1500);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative z-30">
        {!cut && (
            <div className="absolute top-0 md:-top-10 text-center animate-bounce text-pink-600 font-bold text-lg bg-white/90 px-6 py-3 rounded-full shadow-lg z-50 pointer-events-none backdrop-blur-sm border-2 border-pink-100">
                👇 Click the cake to cut a slice for Hathi!
            </div>
        )}

      {/* Funny Message Overlay - Ensuring it stays visible */}
      {showFunny && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in zoom-in duration-500">
            <div className="bg-white p-8 rounded-3xl shadow-2xl transform rotate-2 max-w-sm text-center border-8 border-pink-200">
                <h3 className="text-3xl font-black text-pink-600 mb-2">Oye Moti! 🐘</h3>
                <p className="text-gray-800 text-xl font-bold">Haule haule kha!</p>
                <p className="text-gray-600 mt-2 text-lg">Pura akele kha gayi? 😂</p>
                <div className="text-6xl mt-6 animate-bounce">🍰😋</div>
            </div>
        </div>
      )}

      <div 
        className={`relative cursor-pointer transition-transform duration-700 select-none ${cut ? 'scale-100' : 'hover:scale-105 active:scale-95'}`}
        onClick={handleCut}
      >
        {/* Cake Base (Dark Forest - Rich Chocolate) */}
        <div className="w-72 h-40 bg-[#2a1810] rounded-b-2xl relative shadow-2xl z-10 border-b-[12px] border-[#1a0f0a] overflow-hidden">
             {/* Layers visual */}
             <div className="absolute top-1/2 left-0 w-full h-3 bg-[#3d2218]"></div>
             <div className="absolute top-12 left-0 w-full h-6 bg-white/90 blur-[1px] shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div> {/* Cream Layer */}
             
             {/* Age Text */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 font-black text-8xl select-none pointer-events-none font-elegant">
                17
             </div>
             
             <div className="absolute bottom-4 w-full text-center text-pink-200 font-handwriting text-3xl drop-shadow-md">
                Happy Birthday Pratyasha
             </div>
        </div>

        {/* Cake Top */}
        <div className="absolute -top-10 left-0 w-72 h-20 bg-[#3d2218] rounded-[100%] border-b-4 border-[#2a1810] z-20 flex items-center justify-center overflow-hidden">
             {/* Chocolate shavings effect */}
             <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>

        {/* Cherries & Cream Decoration */}
        <div className="absolute -top-14 left-0 w-full flex justify-around z-30 px-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center transform transition-transform hover:-translate-y-2 duration-300">
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg mb-[-8px] relative z-10"></div>
                    <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-800 rounded-full shadow-inner border border-red-900 z-20"></div>
                </div>
            ))}
        </div>

        {/* The Slice that gets cut */}
        <div 
            className={`absolute top-0 right-0 w-36 h-full z-30 transition-all duration-1000 ease-in-out
            ${cut ? 'translate-x-40 translate-y-12 rotate-12 opacity-100' : 'opacity-0 pointer-events-none'}
            ${eaten ? 'scale-0 opacity-0' : ''}`}
        >
            {/* Slice Visual */}
             <div className="w-full h-full relative">
                 {/* This creates the triangular slice shape approximately */}
                <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[70px] border-r-[#3d2218] border-b-[110px] border-b-transparent absolute transform rotate-180 filter drop-shadow-2xl"></div>
                 {/* Plate */}
                 <div className="absolute bottom-0 right-0 bg-white w-48 h-48 rounded-full shadow-xl flex items-center justify-center border-4 border-gray-100 -z-10">
                    <div className="text-5xl transform -rotate-90 opacity-20">🍽️</div>
                 </div>
                 {/* Instruction */}
                 {!eaten && cut && (
                     <div className="absolute -bottom-20 left-4 w-full text-center bg-white/90 px-4 py-2 rounded-xl text-sm font-bold text-pink-600 animate-bounce shadow-lg border border-pink-200">
                        Eat it quickly! <Utensils className="inline w-4 h-4 ml-1"/>
                     </div>
                 )}
             </div>
        </div>
      </div>
    </div>
  );
};