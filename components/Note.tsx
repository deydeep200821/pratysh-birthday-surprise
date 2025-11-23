
import React, { useEffect, useState, useRef } from 'react';
import { NOTE_TEXT, WHATSAPP_NUMBER } from '../constants';
import { MessageCircle, Heart } from 'lucide-react';

interface NoteProps {
  onComplete: () => void;
}

export const Note: React.FC<NoteProps> = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showNotice, setShowNotice] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < NOTE_TEXT.length) {
        setDisplayedText((prev) => prev + NOTE_TEXT[index]);
        index++;
        
        // Auto scroll to bottom as text types
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setTimeout(() => setShowNotice(true), 2000);
      }
    }, 40); // Slightly faster typing speed

    return () => clearInterval(interval);
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent("I loved the surprise Deep! Thank you so much 🐘❤️");
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  return (
    <div ref={scrollRef} className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 h-[85vh] overflow-y-auto no-scrollbar relative z-40 scroll-smooth">
      
      {/* The Letter */}
      <div className="bg-white/90 backdrop-blur-xl p-6 md:p-10 rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.5)] border border-white/50 relative mb-40 transform transition-all hover:scale-[1.01]">
        <div className="absolute -top-6 -right-6 text-pink-500 animate-bounce delay-700">
            <Heart fill="#ec4899" className="w-12 h-12 drop-shadow-lg" />
        </div>
        <div className="absolute -top-6 -left-6 text-blue-400 animate-pulse">
            <Heart fill="#60a5fa" className="w-8 h-8 drop-shadow-lg" />
        </div>
        
        <div className="font-elegant text-gray-800 text-lg md:text-xl leading-loose whitespace-pre-line min-h-[200px]">
          {displayedText}
          <span className="inline-block w-1 h-5 bg-pink-500 ml-1 animate-pulse"></span>
        </div>

        <div className="mt-10 text-right">
            <div className="font-handwriting text-4xl text-pink-600 transform -rotate-2 inline-block">
            ~ Deep Dey
            </div>
        </div>
      </div>

      {/* The "Sorry" Notice & Button */}
      {showNotice && (
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-white/90 via-white/80 to-transparent pt-16 pb-8 px-4 flex flex-col items-center animate-[smoke_1s_ease-out_reverse_forwards] z-50 backdrop-blur-sm" style={{animationFillMode: 'forwards', animationName: 'fadeInUp'}}>
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 max-w-md shadow-lg rounded-r-xl mx-4 transform -rotate-1">
            <p className="text-sm text-yellow-800 font-medium italic">
              "Sorry yaar, ek din pehle banaya toh development time kam mila, but feelings 100% real hain!" 💖
            </p>
          </div>

          <button 
            onClick={handleWhatsApp}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-[#25D366] font-lg rounded-full hover:bg-[#128C7E] focus:outline-none ring-offset-2 focus:ring-2 ring-green-400 shadow-[0_0_20px_rgba(37,211,102,0.6)] animate-bounce"
          >
            <MessageCircle className="w-6 h-6 mr-2 group-hover:-rotate-12 transition-transform" />
            Send Reply via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};
