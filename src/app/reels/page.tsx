"use client";
import { useState, useEffect } from "react";
import { SectionHead } from "@/components/ui";

export default function ReelsGallery() {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'videos'>('all');

  useEffect(() => {
    fetch('/api/reels').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setReels(data);
      setLoading(false);
    });
  }, []);

  const filteredReels = reels.filter(reel => {
    if (activeTab === 'all') return true;
    if (activeTab === 'photos') return reel.type === 'image';
    if (activeTab === 'videos') return reel.type === 'youtube';
    return true;
  });

  return (
    <div className="container-x py-32">
      <SectionHead eyebrow="Reels" title="Patient Stories & Reels" text="Watch our patients share their experiences."
      />
      
      <div className="flex justify-center gap-3 md:gap-4 mb-10">
        <button 
          onClick={() => setActiveTab('all')} 
          className={`px-5 md:px-8 py-2 md:py-2.5 rounded-full font-display font-semibold transition-colors ${activeTab === 'all' ? 'bg-forest-800 text-white shadow-md' : 'bg-forest-50 text-forest-900 hover:bg-forest-100'}`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveTab('photos')} 
          className={`px-5 md:px-8 py-2 md:py-2.5 rounded-full font-display font-semibold transition-colors ${activeTab === 'photos' ? 'bg-forest-800 text-white shadow-md' : 'bg-forest-50 text-forest-900 hover:bg-forest-100'}`}
        >
          Photos
        </button>
        <button 
          onClick={() => setActiveTab('videos')} 
          className={`px-5 md:px-8 py-2 md:py-2.5 rounded-full font-display font-semibold transition-colors ${activeTab === 'videos' ? 'bg-forest-800 text-white shadow-md' : 'bg-forest-50 text-forest-900 hover:bg-forest-100'}`}
        >
          Videos
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-800"></div>
        </div>
      ) : filteredReels.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No media found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredReels.map((reel: any) => (
            <div key={reel._id} className="aspect-[9/16] bg-gray-100 rounded-2xl overflow-hidden relative shadow-md">
              {reel.type === 'youtube' ? (
                <iframe 
                  src={reel.url} 
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              ) : (
                <img 
                  src={`/api/image/${reel.imageId}`} 
                  alt="Patient story" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
