"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui";

export function ReelsCarousel() {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reels').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setReels(data.slice(0, 6)); // show latest 6
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading || reels.length === 0) return null;

  return (
    <section className="py-20 overflow-hidden bg-ivory-50">
      <div className="container-x mb-10 flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-forest-950 md:text-4xl">
            Patient Stories
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-600">
            Real experiences from people who trusted ZivRA HEALTH with their care.
          </p>
        </div>
        <Link href="/reels" className="hidden items-center gap-2 font-semibold text-forest-800 hover:text-forest-900 md:flex">
          View all reels <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
      
      {/* Horizontal scrolling container */}
      <div className="container-x">
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {reels.map((reel: any) => (
            <div key={reel._id} className="snap-start shrink-0 w-[240px] md:w-[280px] aspect-[9/16] bg-gray-100 rounded-2xl overflow-hidden relative shadow-md">
              {reel.type === 'youtube' ? (
                <iframe 
                  src={reel.url} 
                  className="w-full h-full pointer-events-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  tabIndex={-1}
                />
              ) : (
                <img 
                  src={`/api/image/${reel.imageId}`} 
                  alt="Patient story" 
                  className="w-full h-full object-cover"
                />
              )}
              {/* Overlay link to go to full page */}
              <Link href="/reels" className="absolute inset-0 z-10 block" aria-label="View reel"></Link>
            </div>
          ))}
        </div>
        <div className="mt-4 md:hidden">
          <Link href="/reels" className="inline-flex items-center gap-2 font-semibold text-forest-800">
            View all reels <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
