
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
    
    // Sequence: Cut -> Wait -> Eat -> Wait -> Funny Msg -> Finish
    setTimeout(() => {
        setEaten(true);
        setTimeout(() => {
            setShowFunny(true);
            setTimeout(() => {
                onFinished();
            }, 5000); // Give enough time to read the funny message
        }, 1500);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
        {!cut && (
            <div className="absolute top-10 text-center animate-bounce text-pink-600 font-bold text-xl bg-white/80 px-4 py-2 rounded-full shadow-lg z-20 pointer-events-none backdrop-blur-sm">
                👇 Click the cake to cut a slice!
            </div>
        )}

      {/* Funny Message Overlay */}
      {showFunny && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in duration-500">
            <div className="bg-white p-6 rounded-2xl shadow-2xl transform rotate-2 max-w-xs text-center border-4 border-pink-400">
                <h3 className="text-2xl font-bold text-pink-600 mb-2">Oye Moti! 🐘</h3>
                <p className="text-gray-800 text-lg font-semibold">Haule haule kha!</p>
                <p className="text-gray-600 mt-2">Pura akele kha gayi? 😂</p>
                <div className="text-5xl mt-4 animate-bounce">🍰😋</div>
            </div>
        </div>
      )}

      <div 
        className={`relative cursor-pointer transition-transform duration-700 ${cut ? 'scale-105' : 'hover:scale-105'}`}
        onClick={handleCut}
      >
        {/* Cake Base (Dark Forest - Rich Chocolate) */}
        <div className="w-64 h-32 bg-[#2a1810] rounded-b-lg relative shadow-2xl z-10 border-b-8 border-[#1a0f0a]">
             {/* Layers visual */}
             <div className="absolute top-1/2 left-0 w-full h-2 bg-[#3d2218]"></div>
             <div className="absolute top-10 left-0 w-full h-5 bg-white/90 blur-[1px] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div> {/* Cream Layer */}
             
             {/* Age Text */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 font-black text-7xl select-none pointer-events-none font-elegant">
                17
             </div>
             
             <div className="absolute bottom-4 w-full text-center text-pink-200 font-handwriting text-2xl drop-shadow-md">
                Happy Birthday Pratyasha
             </div>
        </div>

        {/* Cake Top */}
        <div className="absolute -top-8 left-0 w-64 h-16 bg-[#3d2218] rounded-[100%] border-b-4 border-[#2a1810] z-20 flex items-center justify-center overflow-hidden">
             {/* Chocolate shavings/Cream swirls */}
             <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent)]"></div>
        </div>

        {/* Cherries & Cream Decoration */}
        <div className="absolute -top-12 left-0 w-full flex justify-around z-30 px-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center transform transition-transform hover:-translate-y-1">
                    <div className="w-7 h-7 bg-white rounded-full shadow-md mb-[-6px] relative">
                        {/* Cherry */}
                         <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-inner border border-red-900"></div>
                    </div>
                </div>
            ))}
        </div>

        {/* The Slice that gets cut */}
        <div 
            className={`absolute top-0 right-0 w-32 h-full z-30 transition-all duration-1000 ease-in-out
            ${cut ? 'translate-x-32 translate-y-12 rotate-12 opacity-100' : 'opacity-0 pointer-events-none'}
            ${eaten ? 'scale-0 opacity-0' : ''}`}
        >
            {/* Slice Visual */}
             <div className="w-full h-full relative">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[60px] border-r-[#3d2218] border-b-[100px] border-b-transparent absolute transform rotate-180 filter drop-shadow-xl"></div>
                 {/* Plate */}
                 <div className="absolute bottom-0 right-0 bg-white/95 w-44 h-44 rounded-full shadow-xl flex items-center justify-center border-4 border-gray-100">
                    <div className="text-5xl transform -rotate-90">🍰</div>
                 </div>
                 {/* Instruction */}
                 {!eaten && cut && (
                     <div className="absolute -bottom-16 left-10 w-full text-center bg-white px-3 py-2 rounded-xl text-sm font-bold text-pink-600 animate-bounce shadow-lg">
                        Eat it quickly! <Utensils className="inline w-4 h-4 ml-1"/>
                     </div>
                 )}
             </div>
        </div>
      </div>
    </div>
  );
};
