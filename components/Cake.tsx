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
            }, 4000);
        }, 1500);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
        {!cut && (
            <div className="absolute top-10 text-center animate-bounce text-pink-600 font-bold text-xl bg-white/80 px-4 py-2 rounded-full shadow-lg z-20 pointer-events-none">
                👇 Click the cake to cut a slice!
            </div>
        )}

      {/* Funny Message Overlay */}
      {showFunny && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in duration-500">
            <div className="bg-white p-6 rounded-2xl shadow-2xl transform rotate-2 max-w-xs text-center border-4 border-pink-400">
                <h3 className="text-2xl font-bold text-pink-600 mb-2">Oops! 🤭</h3>
                <p className="text-gray-700 text-lg">I tried to give you a slice...</p>
                <p className="text-gray-900 font-bold mt-2 text-xl">But I ate it. Sorry!</p>
                <p className="text-4xl mt-4">😋🍰</p>
            </div>
        </div>
      )}

      <div 
        className={`relative cursor-pointer transition-transform duration-700 ${cut ? 'scale-105' : 'hover:scale-105'}`}
        onClick={handleCut}
      >
        {/* Cake Base (Dark Forest - Dark Brown) */}
        <div className="w-64 h-32 bg-[#3e2723] rounded-b-lg relative shadow-2xl z-10 border-b-8 border-[#281815]">
             {/* Layers visual */}
             <div className="absolute top-1/2 left-0 w-full h-2 bg-[#5d4037]"></div>
             <div className="absolute top-10 left-0 w-full h-4 bg-white/90 blur-[1px]"></div> {/* Cream Layer */}
             
             {/* Age Text */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 font-black text-6xl select-none pointer-events-none">
                17
             </div>
             
             <div className="absolute bottom-4 w-full text-center text-pink-100 font-handwriting text-2xl">
                Happy Birthday Pratyasha
             </div>
        </div>

        {/* Cake Top */}
        <div className="absolute -top-8 left-0 w-64 h-16 bg-[#4e342e] rounded-[100%] border-b-4 border-[#3e2723] z-20 flex items-center justify-center overflow-hidden">
             {/* Cream swirls */}
             <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>

        {/* Cherries & Cream Decoration */}
        <div className="absolute -top-12 left-0 w-full flex justify-around z-30 px-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-white rounded-full shadow-md mb-[-5px]"></div>
                    <div className="w-5 h-5 bg-red-600 rounded-full shadow-inner border border-red-800"></div>
                </div>
            ))}
        </div>

        {/* The Slice that gets cut */}
        <div 
            className={`absolute top-0 right-0 w-32 h-full z-30 transition-all duration-1000 ease-in-out
            ${cut ? 'translate-x-24 translate-y-10 rotate-12 opacity-100' : 'opacity-0 pointer-events-none'}
            ${eaten ? 'scale-0 opacity-0' : ''}`}
        >
            {/* Slice Visual */}
             <div className="w-full h-full relative">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[60px] border-r-[#5d4037] border-b-[100px] border-b-transparent absolute transform rotate-180"></div>
                 {/* A simple representation of a slice on a plate */}
                 <div className="absolute bottom-0 right-0 bg-white w-40 h-40 rounded-full shadow-xl flex items-center justify-center border-4 border-gray-200">
                    <div className="text-4xl">🍰</div>
                 </div>
                 {/* Instruction */}
                 {!eaten && cut && (
                     <div className="absolute -bottom-12 w-full text-center bg-white px-2 py-1 rounded-lg text-sm font-bold text-gray-600 animate-pulse">
                        Eat me! <Utensils className="inline w-3 h-3"/>
                     </div>
                 )}
             </div>
        </div>
      </div>
    </div>
  );
};
