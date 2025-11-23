import React, { useEffect, useState } from 'react';
import { NOTE_TEXT, WHATSAPP_NUMBER } from '../constants';
import { MessageCircle, Heart } from 'lucide-react';

interface NoteProps {
  onComplete: () => void; // Callback not strictly needed for logic but good structure
}

export const Note: React.FC<NoteProps> = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showNotice, setShowNotice] = useState(false);
  
  // Typewriter effect duration calculation
  // 3 minutes total goal. Candle ~20s, Cake ~20s. Note reading needs time.
  // Text length ~400 chars. 
  // 50ms per char = 20 seconds to write.
  // Reading time + 40s music phase.
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < NOTE_TEXT.length - 1) {
        setDisplayedText((prev) => prev + NOTE_TEXT[index]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowNotice(true), 3000);
      }
    }, 50); // Speed of typing

    return () => clearInterval(interval);
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hey Deep! I saw the birthday surprise. It was...");
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 h-[85vh] overflow-y-auto no-scrollbar relative z-40">
      
      {/* The Letter */}
      <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-2xl border-2 border-pink-200 relative mb-32 transform rotate-1 transition-all hover:rotate-0">
        <div className="absolute -top-4 -left-4 text-pink-500 animate-bounce">
            <Heart fill="currentColor" className="w-10 h-10" />
        </div>
        
        <div className="font-elegant text-gray-800 text-lg md:text-2xl leading-relaxed whitespace-pre-line min-h-[300px]">
          {displayedText}
          <span className="animate-pulse">|</span>
        </div>

        <div className="mt-8 text-right font-handwriting text-3xl text-pink-600">
          ~ Deep Dey
        </div>
      </div>

      {/* The "Sorry" Notice & Button */}
      {showNotice && (
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-12 pb-8 px-4 flex flex-col items-center animate-[smoke_1s_ease-out_reverse_forwards] opacity-0" style={{animationFillMode: 'forwards', animationName: 'fadeInUp', animationDuration: '1s'}}>
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 max-w-md shadow-lg rounded-r-md">
            <p className="text-sm text-yellow-800 italic">
              ⚠️ Developer Note: Developed this in just one day because time flew by! Sorry if it's a bit simple, but the feelings are 100% real.
            </p>
          </div>

          <button 
            onClick={handleWhatsApp}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-green-500 font-lg rounded-full hover:bg-green-600 focus:outline-none ring-offset-2 focus:ring-2 ring-green-400 shadow-[0_0_20px_rgba(34,197,94,0.6)] animate-bounce"
          >
            <MessageCircle className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform" />
            Send Reply to Deep
          </button>
        </div>
      )}
    </div>
  );
};
