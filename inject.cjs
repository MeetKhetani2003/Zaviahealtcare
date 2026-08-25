const fs = require('fs');

const admin_file = 'src/app/admin/page.tsx';
let admin_content = fs.readFileSync(admin_file, 'utf8');

const admin_component = `
function VideoTestimonialsTab() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const fetchVideos = () => {
    setLoading(true);
    fetch('/api/video-testimonials')
      .then(res => res.json())
      .then(data => {
        setVideos(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) {
      setError('Please provide a name and select a video.');
      return;
    }
    
    if (file.size > 25 * 1024 * 1024) {
      setError('File size must be under 25MB.');
      return;
    }
    
    setUploading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await fetch('/api/upload/video', {
        method: 'POST',
        body: formData
      });
      
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed');
      
      const saveRes = await fetch('/api/video-testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          videoUrl: uploadData.url,
          videoId: uploadData.videoId
        })
      });
      
      if (!saveRes.ok) throw new Error('Failed to save testimonial');
      
      setName('');
      setDescription('');
      setFile(null);
      fetchVideos();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    try {
      const res = await fetch('/api/video-testimonials/' + id, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchVideos();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-forest-900 mb-4">Upload New Video Testimonial</h2>
        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>}
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded-xl" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description / Category</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Video File (Max 25MB) *</label>
            <input type="file" accept="video/*" onChange={e => {if (e.target.files) setFile(e.target.files[0])}} className="w-full p-3 border rounded-xl" required />
          </div>
          <button type="submit" disabled={uploading} className="bg-forest-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-forest-900 disabled:opacity-50">
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>
      
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-forest-900 mb-4">Manage Videos</h2>
        {loading ? <p>Loading...</p> : (
          <div className="grid gap-4 sm:grid-cols-2">
            {videos.map(v => (
              <div key={v._id} className="border p-4 rounded-xl flex flex-col">
                <video src={v.videoUrl} controls className="w-full h-40 object-cover rounded-lg mb-3 bg-black" />
                <div className="flex-1">
                  <p className="font-bold text-forest-900">{v.name}</p>
                  <p className="text-sm text-gray-500">{v.description}</p>
                </div>
                <button onClick={() => handleDelete(v._id)} className="mt-3 text-sm text-red-500 hover:text-red-700 font-bold self-end">Delete</button>
              </div>
            ))}
            {videos.length === 0 && <p className="col-span-full text-gray-500">No videos uploaded yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync(admin_file, admin_content + '\n' + admin_component);


const home_file = 'src/app/page.tsx';
let home_content = fs.readFileSync(home_file, 'utf8');

home_content = home_content.replace('<Stories />', '<VideoTestimonialsSection />\n      <Stories />');

const home_component = `
/* ================================================================== */
/*  Video Testimonials                                                */
/* ================================================================== */

function VideoTestimonialsSection() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/video-testimonials')
      .then(res => res.json())
      .then(data => {
        setVideos(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading || videos.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="container-x">
        <div className="flex items-end justify-between gap-4 mb-10">
          <SectionHead
            eyebrow="Real Results"
            title="Video Testimonials"
            text="Hear directly from our patients about their experiences and recovery journey."
          />
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll('left')} className="h-12 w-12 flex items-center justify-center rounded-full border border-forest-900/10 text-forest-900 hover:bg-forest-800 hover:text-white transition-all shadow-sm">
              <Icon name="chevron-left" className="h-6 w-6" strokeWidth={2} />
            </button>
            <button onClick={() => scroll('right')} className="h-12 w-12 flex items-center justify-center rounded-full border border-forest-900/10 text-forest-900 hover:bg-forest-800 hover:text-white transition-all shadow-sm">
              <Icon name="chevron-right" className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>
        </div>
        
        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videos.map((v) => (
              <div key={v._id} className="min-w-[280px] md:min-w-[320px] max-w-[320px] snap-center flex-shrink-0 bg-sage-50 rounded-2xl overflow-hidden border border-forest-900/10 shadow-soft">
                <div className="aspect-[9/16] relative bg-black">
                  <video 
                    src={v.videoUrl} 
                    controls 
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="p-5">
                  <p className="font-display text-lg font-bold text-forest-900">{v.name}</p>
                  {v.description && <p className="text-sm text-ink-500 mt-1">{v.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`;

if (!home_content.includes('import React')) {
    home_content = home_content.replace('import { useState', 'import React, { useState');
}

fs.writeFileSync(home_file, home_content + '\n' + home_component);
console.log('Successfully injected components');
