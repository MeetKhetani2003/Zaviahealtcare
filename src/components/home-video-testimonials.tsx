"use client";
import React, { useState } from "react";
import { SectionHead, Icon } from "./ui";

export function VideoTestimonialsSection({ initialVideos }: { initialVideos: any[] }) {
  const videos = initialVideos || [];
  const loading = false;
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return null;

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col items-center mb-12 text-center">
          <SectionHead
            eyebrow=""
            title="Our Success Stories"
            center
          />
        </div>
        
        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
          {videos.length === 0 ? (
            <div className="text-center py-12 bg-sage-50 rounded-2xl border border-forest-900/10">
              <p className="text-forest-900 font-bold">No video testimonials have been uploaded yet.</p>
              <p className="text-sm text-ink-500 mt-2">Head over to the admin dashboard to add your first video.</p>
            </div>
          ) : (
            <div className="relative group/nav max-w-5xl mx-auto">
              {/* Navigation Arrows */}
              <button 
                onClick={() => scroll('left')} 
                className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-5 h-12 w-12 flex items-center justify-center rounded-full bg-white border border-forest-900/10 text-forest-900 shadow-xl z-10 opacity-0 md:group-hover/nav:opacity-100 transition-opacity"
              >
                <Icon name="chevron-left" className="h-6 w-6" strokeWidth={2} />
              </button>
              <button 
                onClick={() => scroll('right')} 
                className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-5 h-12 w-12 flex items-center justify-center rounded-full bg-white border border-forest-900/10 text-forest-900 shadow-xl z-10 opacity-0 md:group-hover/nav:opacity-100 transition-opacity"
              >
                <Icon name="chevron-right" className="h-6 w-6" strokeWidth={2} />
              </button>

              <div 
                ref={scrollRef}
                className="flex gap-4 md:gap-5 overflow-x-auto hide-scrollbar pb-8 pt-4 justify-start px-4 md:px-2 snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {videos.map((v) => (
                  <div 
                    key={v._id} 
                    className="relative flex flex-col w-[260px] md:w-[280px] shrink-0 cursor-pointer group snap-center" 
                    onClick={() => setSelectedVideo(v)}
                  >
                    {/* Video Area */}
                    <div className="relative h-[340px] md:h-[380px] w-full bg-gray-100 rounded-t-2xl overflow-hidden shadow-sm">
                      <video 
                        src={v.videoUrl} 
                        poster={v.thumbnailUrl || undefined}
                        playsInline
                        muted
                        loop
                        onMouseEnter={(e) => { e.currentTarget.play(); }}
                        onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                        preload="metadata"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/0" />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                        <div className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                          <Icon name="play" className="h-5 w-5 text-white ml-1 drop-shadow-md" strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Traya-Style Dark Bottom Box */}
                    <div className="relative bg-[#454746] text-white p-5 pt-6 rounded-b-2xl shadow-sm z-10 min-h-[120px] flex flex-col justify-between">
                      {/* Speech Bubble Pointer */}
                      <div className="absolute -top-3 left-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[12px] border-b-[#454746]" />
                      
                      <p className="text-[13.5px] leading-snug font-medium text-white/95 line-clamp-3">
                        {v.description || "I trusted the journey and the result speaks for themselves."}
                      </p>
                      
                      <p className="text-[12px] text-white/70 mt-3 font-semibold tracking-wide">
                        {v.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Reel Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedVideo(null)} />
          
          <div className="relative w-full h-full sm:w-[400px] sm:h-[90vh] sm:max-h-[850px] bg-black sm:rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 flex flex-col border border-white/10 mx-auto">
            
            {/* Top Bar with Close Button */}
            <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/60 to-transparent z-10 flex justify-end pointer-events-none">
              <button 
                onClick={() => setSelectedVideo(null)}
                className="pointer-events-auto w-11 h-11 bg-black/30 hover:bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 border border-white/20 shadow-lg"
              >
                <Icon name="x" className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>

            {/* Video Player */}
            <video 
              src={selectedVideo.videoUrl} 
              controls 
              autoPlay 
              playsInline
              className="w-full h-full object-contain sm:object-cover" 
            />

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-24 sm:pb-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-white font-bold text-base border border-white/20 shadow-lg">
                  {selectedVideo.name.charAt(0)}
                </div>
                <p className="text-white font-bold font-display text-lg tracking-tight drop-shadow-md">
                  {selectedVideo.name}
                </p>
              </div>
              {selectedVideo.description && (
                <p className="text-white/90 text-[14px] font-medium drop-shadow leading-snug ml-13">
                  {selectedVideo.description}
                </p>
              )}
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
}