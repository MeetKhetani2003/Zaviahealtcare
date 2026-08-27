"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui";
import { Logo } from "@/components/layout";

type Inquiry = {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  address?: string;
  age: string;
  date: string;
  time: string;
  concern: string;
  message: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"inquiries" | "home" | "upload" | "conditions" | "treatments" | "about" | "how-it-works" | "stories" | "faqs" | "video-testimonials" | "before-after">("inquiries");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-forest-900 text-ivory-50 flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-forest-800/50 bg-forest-950/20">
          <Logo className="h-10 text-white" />
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => setActiveTab("inquiries")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inquiries' ? 'bg-gold-500 text-forest-950 font-bold shadow-md' : 'text-ivory-100/70 hover:bg-forest-800 hover:text-ivory-50'}`}
          >
            <Icon name="user" className="h-5 w-5" strokeWidth={activeTab === 'inquiries' ? 2.5 : 2} />
            Patient Inquiries
          </button>

          <button 
            onClick={() => setActiveTab("home")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'home' ? 'bg-gold-500 text-forest-950 font-bold shadow-md' : 'text-ivory-100/70 hover:bg-forest-800 hover:text-ivory-50'}`}
          >
            <Icon name="home" className="h-5 w-5" strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            Home Page
          </button>
          
          
          
          <button 
            onClick={() => setActiveTab("upload")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'upload' ? 'bg-gold-500 text-forest-950 font-bold shadow-md' : 'text-ivory-100/70 hover:bg-forest-800 hover:text-ivory-50'}`}
          >
            <Icon name="image" className="h-5 w-5" strokeWidth={activeTab === 'upload' ? 2.5 : 2} />
            Gallery Upload
          </button>
          
          <button 
            onClick={() => setActiveTab("conditions")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'conditions' ? 'bg-gold-500 text-forest-950 font-bold shadow-md' : 'text-ivory-100/70 hover:bg-forest-800 hover:text-ivory-50'}`}
          >
            <Icon name="activity" className="h-5 w-5" strokeWidth={activeTab === 'conditions' ? 2.5 : 2} />
            Conditions
          </button>
          
          <button 
            onClick={() => setActiveTab("treatments")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'treatments' ? 'bg-gold-500 text-forest-950 font-bold shadow-md' : 'text-ivory-100/70 hover:bg-forest-800 hover:text-ivory-50'}`}
          >
            <Icon name="plus-circle" className="h-5 w-5" strokeWidth={activeTab === 'treatments' ? 2.5 : 2} />
            Treatments
          </button>
          
          <button 
            onClick={() => setActiveTab("about")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'about' ? 'bg-gold-500 text-forest-950 font-bold shadow-md' : 'text-ivory-100/70 hover:bg-forest-800 hover:text-ivory-50'}`}
          >
            <Icon name="user" className="h-5 w-5" strokeWidth={activeTab === 'about' ? 2.5 : 2} />
            About Page
          </button>
          
          <button 
            onClick={() => setActiveTab("how-it-works")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'how-it-works' ? 'bg-gold-500 text-forest-950 font-bold shadow-md' : 'text-ivory-100/70 hover:bg-forest-800 hover:text-ivory-50'}`}
          >
            <Icon name="activity" className="h-5 w-5" strokeWidth={activeTab === 'how-it-works' ? 2.5 : 2} />
            How It Works
          </button>
          
          <button 
            onClick={() => setActiveTab("stories")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'stories' ? 'bg-gold-500 text-forest-950 font-bold shadow-md' : 'text-ivory-100/70 hover:bg-forest-800 hover:text-ivory-50'}`}
          >
            <Icon name="message-square" className="h-5 w-5" strokeWidth={activeTab === 'stories' ? 2.5 : 2} />
            Patient Stories
          </button>

          <button 
            onClick={() => setActiveTab("faqs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'faqs' ? 'bg-gold-500 text-forest-950 font-bold shadow-md' : 'text-ivory-100/70 hover:bg-forest-800 hover:text-ivory-50'}`}
          >
            <Icon name="help-circle" className="h-5 w-5" strokeWidth={activeTab === 'faqs' ? 2.5 : 2} />
            Manage FAQs
          </button>
          
          <button 
            onClick={() => setActiveTab("video-testimonials")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'video-testimonials' ? 'bg-gold-500 text-forest-950 font-bold shadow-md' : 'text-ivory-100/70 hover:bg-forest-800 hover:text-ivory-50'}`}
          >
            <Icon name="video" className="h-5 w-5" strokeWidth={activeTab === 'video-testimonials' ? 2.5 : 2} />
            Video Testimonials
          </button>

          <button 
            onClick={() => setActiveTab("before-after")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'before-after' ? 'bg-gold-500 text-forest-950 font-bold shadow-md' : 'text-ivory-100/70 hover:bg-forest-800 hover:text-ivory-50'}`}
          >
            <Icon name="image" className="h-5 w-5" strokeWidth={activeTab === 'before-after' ? 2.5 : 2} />
            Before & After
          </button>
        </nav>

        <div className="p-4 border-t border-forest-800/50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors"
          >
            <Icon name="log-out" className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between shadow-sm z-10">
          <div>
            <h1 className="text-2xl font-bold text-forest-900 font-display">
              {activeTab === 'inquiries' && 'Manage Inquiries'}
              {activeTab === 'home' && 'Home Page Content'}
              
              {activeTab === 'upload' && 'Media Uploads'}
              {activeTab === 'conditions' && 'Manage Conditions'}
              {activeTab === 'treatments' && 'Manage Treatments'}
              {activeTab === 'about' && 'About Page Content'}
              {activeTab === 'how-it-works' && 'How It Works CMS'}
              {activeTab === 'stories' && 'Patient Stories CMS'}
              {activeTab === 'faqs' && 'Manage FAQs'}
              {activeTab === 'video-testimonials' && 'Video Testimonials CMS'}
              {activeTab === 'before-after' && 'Before & After Results'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {activeTab === 'inquiries' && 'Review consultation requests from patients.'}
              {activeTab === 'home' && 'Edit text, images, and layout points for the main home page.'}
              
              {activeTab === 'upload' && 'Upload photos or YouTube shorts for the gallery.'}
              {activeTab === 'conditions' && 'Add and manage medical conditions.'}
              {activeTab === 'treatments' && 'Add and manage medical treatments.'}
              {activeTab === 'about' && 'Edit the text and images on the About Doctor page.'}
              {activeTab === 'how-it-works' && 'Edit the process steps on the How It Works page.'}
              {activeTab === 'stories' && 'Add, edit, and manage patient testimonials.'}
              {activeTab === 'faqs' && 'Manage frequently asked questions by category.'}
              {activeTab === 'video-testimonials' && 'Upload and manage video testimonials for the home page.'}
              {activeTab === 'before-after' && 'Add and manage before/after patient result images for the home page.'}
            </p>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {activeTab === "inquiries" && <InquiriesTab />}
          {activeTab === "home" && <HomePageTab />}
          
          {activeTab === "upload" && <UploadTab />}
          {activeTab === "conditions" && <ConditionsTab />}
          {activeTab === "treatments" && <TreatmentsTab />}
          {activeTab === "about" && <AboutPageTab />}
          {activeTab === "how-it-works" && <HowItWorksTab />}
          {activeTab === "stories" && <PatientStoriesTab />}
          {activeTab === "faqs" && <FaqsTab />}
          {activeTab === "video-testimonials" && <VideoTestimonialsTab />}
          {activeTab === "before-after" && <BeforeAfterTab />}
        </div>
      </main>
    </div>
  );
}

function InquiriesTab() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('/api/inquiries')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        setInquiries(data.inquiries || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-forest-700 font-medium">Loading inquiries...</div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
      Error loading inquiries: {error}
    </div>
  );

  if (inquiries.length === 0) return (
    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <Icon name="inbox" className="h-12 w-12 text-gray-300 mb-3" />
      <div className="text-gray-500 font-medium text-lg">No inquiries found.</div>
      <p className="text-gray-400 text-sm mt-1">When patients submit the assessment form, they will appear here.</p>
    </div>
  );

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-forest-50/50 text-forest-900 border-b border-gray-200">
          <tr>
            <th className="p-4 font-semibold whitespace-nowrap">Date Submitted</th>
            <th className="p-4 font-semibold">Inquiry Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {inquiries.map((inq) => (
            <tr key={inq._id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 align-top text-gray-600 whitespace-nowrap w-48 border-r border-gray-100">
                <div className="font-medium text-forest-900">{new Date(inq.createdAt).toLocaleDateString()}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(inq.createdAt).toLocaleTimeString()}</div>
              </td>
              <td className="p-4 align-top">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                  {Object.entries(inq).filter(([k]) => k !== '_id' && k !== 'createdAt').map(([k, v]) => (
                    <div key={k} className="flex flex-col">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{k.replace(/_/g, ' ')}</span>
                      <span className="text-[14px] font-medium text-gray-900 whitespace-pre-wrap">{v ? String(v) : '-'}</span>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UploadTab() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');
    const form = new FormData(e.currentTarget);
    const type = form.get('type') as string;
    
    if (type === 'youtube') {
      let url = form.get('url') as string;
      if (url.includes('/shorts/')) {
        url = url.replace('/shorts/', '/embed/');
      }
      form.set('url', url);
      form.delete('file');
    } else {
      form.delete('url');
    }
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form
      });
      if (res.ok) {
        setMessage('Upload successful!');
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage('Upload failed. Please try again.');
      }
    } catch (err) {
      setMessage('Error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
      <form onSubmit={handleUpload} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-forest-900 mb-2">Media Type</label>
          <select name="type" className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-all bg-gray-50/50" required>
            <option value="youtube">YouTube Short Link</option>
            <option value="image">Image File (GridFS)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-forest-900 mb-2">YouTube URL</label>
          <input type="text" name="url" placeholder="https://youtube.com/shorts/..." className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-all bg-gray-50/50" />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-forest-900 mb-2">Upload Photo</label>
          <input type="file" name="file" accept="image/*" className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-forest-50 file:text-forest-800 hover:file:bg-forest-100" />
        </div>
        
        <button type="submit" disabled={uploading} className="mt-4 w-full bg-forest-800 text-white p-3.5 rounded-xl font-bold hover:bg-forest-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
          {uploading ? 'Uploading...' : 'Upload Media'}
        </button>
        
        {message && <p className="text-center font-medium mt-2 text-forest-800">{message}</p>}
      </form>
    </div>
  );
}

function ConditionsTab() {
  const [conditions, setConditions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultForm = { title: '', short: '', image: '', understanding: '', symptoms: '', consultation: '' };
  const [form, setForm] = useState(defaultForm);

  const fetchConditions = () => {
    fetch('/api/conditions')
      .then(res => res.json())
      .then(data => {
        setConditions(data.conditions || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchConditions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Parse newline separated text into arrays
    const conditionData = {
      title: form.title,
      short: form.short,
      image: form.image,
      understanding: typeof form.understanding === 'string' ? form.understanding.split('\n').filter(Boolean) : form.understanding,
      symptoms: typeof form.symptoms === 'string' ? form.symptoms.split('\n').filter(Boolean) : form.symptoms,
      consultation: typeof form.consultation === 'string' ? form.consultation.split('\n').filter(Boolean) : form.consultation,
      ...(editingId ? { _id: editingId } : { faqs: [] })
    };

    try {
      const res = await fetch('/api/conditions', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conditionData)
      });
      if (res.ok) {
        setForm(defaultForm);
        setEditingId(null);
        fetchConditions();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (c: any) => {
    setEditingId(c._id);
    setForm({
      title: c.title || '',
      short: c.short || '',
      image: c.image || '',
      understanding: Array.isArray(c.understanding) ? c.understanding.join('\n') : c.understanding || '',
      symptoms: Array.isArray(c.symptoms) ? c.symptoms.join('\n') : c.symptoms || '',
      consultation: Array.isArray(c.consultation) ? c.consultation.join('\n') : c.consultation || ''
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this condition?')) return;
    try {
      const res = await fetch(`/api/conditions?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (editingId === id) {
          setEditingId(null);
          setForm(defaultForm);
        }
        fetchConditions();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultForm);
  };

  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        <h2 className="text-xl font-bold text-forest-900 mb-4">Existing Conditions</h2>
        {loading ? <p>Loading...</p> : (
          <div className="flex flex-col gap-3">
            {conditions.map(c => (
              <div key={c._id} className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex justify-between items-start">
                <div>
                  <div className="font-bold text-forest-900">{c.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{c.short}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(c)} className="text-sm bg-forest-50 text-forest-700 px-3 py-1 rounded hover:bg-forest-100">Edit</button>
                  <button onClick={() => handleDelete(c._id)} className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="w-1/2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-forest-900">{editingId ? 'Edit Condition' : 'Add New Condition'}</h2>
          {editingId && (
            <button onClick={cancelEdit} className="text-sm text-gray-500 hover:text-gray-700 underline">Cancel Edit</button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input required type="text" placeholder="Title (e.g. Urinary Health)" className="p-3 border rounded-xl" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <input required type="text" placeholder="Short Description" className="p-3 border rounded-xl" value={form.short} onChange={e => setForm({...form, short: e.target.value})} />
          <ImageUpload label="Condition Image URL" value={form.image} onChange={url => setForm({...form, image: url})} />
          
          <label className="text-sm font-semibold">Understanding (1 paragraph per line)</label>
          <textarea rows={3} className="p-3 border rounded-xl" value={form.understanding} onChange={e => setForm({...form, understanding: e.target.value})} />
          
          <label className="text-sm font-semibold">Symptoms (1 bullet per line)</label>
          <textarea rows={3} className="p-3 border rounded-xl" value={form.symptoms} onChange={e => setForm({...form, symptoms: e.target.value})} />
          
          <label className="text-sm font-semibold">Consultation (1 paragraph per line)</label>
          <textarea rows={3} className="p-3 border rounded-xl" value={form.consultation} onChange={e => setForm({...form, consultation: e.target.value})} />
          
          <button type="submit" disabled={saving} className="bg-forest-800 text-white p-3 rounded-xl font-bold hover:bg-forest-900 disabled:opacity-50">
            {saving ? 'Saving...' : (editingId ? 'Save Changes' : 'Create Condition')}
          </button>
        </form>
      </div>
    </div>
  );
}

function TreatmentsTab() {
  const [treatments, setTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultForm = { title: '', short: '', image: '', overview: '', whoShould: '', involves: '' };
  const [form, setForm] = useState(defaultForm);

  const fetchTreatments = () => {
    fetch('/api/treatments')
      .then(res => res.json())
      .then(data => {
        setTreatments(data.treatments || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Parse newline separated text into arrays
    const treatmentData = {
      title: form.title,
      short: form.short,
      image: form.image,
      overview: typeof form.overview === 'string' ? form.overview.split('\n').filter(Boolean) : form.overview,
      whoShould: typeof form.whoShould === 'string' ? form.whoShould.split('\n').filter(Boolean) : form.whoShould,
      involves: typeof form.involves === 'string' ? form.involves.split('\n').filter(Boolean) : form.involves,
      ...(editingId ? { _id: editingId } : { faqs: [] })
    };

    try {
      const res = await fetch('/api/treatments', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(treatmentData)
      });
      if (res.ok) {
        setForm(defaultForm);
        setEditingId(null);
        fetchTreatments();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (t: any) => {
    setEditingId(t._id);
    setForm({
      title: t.title || '',
      short: t.short || '',
      image: t.image || '',
      overview: Array.isArray(t.overview) ? t.overview.join('\n') : t.overview || '',
      whoShould: Array.isArray(t.whoShould) ? t.whoShould.join('\n') : t.whoShould || '',
      involves: Array.isArray(t.involves) ? t.involves.join('\n') : t.involves || ''
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this treatment?')) return;
    try {
      const res = await fetch(`/api/treatments?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (editingId === id) {
          setEditingId(null);
          setForm(defaultForm);
        }
        fetchTreatments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultForm);
  };

  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        <h2 className="text-xl font-bold text-forest-900 mb-4">Existing Treatments</h2>
        {loading ? <p>Loading...</p> : (
          <div className="flex flex-col gap-3">
            {treatments.map(t => (
              <div key={t._id} className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex justify-between items-start">
                <div>
                  <div className="font-bold text-forest-900">{t.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{t.short}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(t)} className="text-sm bg-forest-50 text-forest-700 px-3 py-1 rounded hover:bg-forest-100">Edit</button>
                  <button onClick={() => handleDelete(t._id)} className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="w-1/2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-forest-900">{editingId ? 'Edit Treatment' : 'Add New Treatment'}</h2>
          {editingId && (
            <button onClick={cancelEdit} className="text-sm text-gray-500 hover:text-gray-700 underline">Cancel Edit</button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input required type="text" placeholder="Title (e.g. Urology Consultation)" className="p-3 border rounded-xl" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <input required type="text" placeholder="Short Description" className="p-3 border rounded-xl" value={form.short} onChange={e => setForm({...form, short: e.target.value})} />
          <ImageUpload label="Treatment Image URL" value={form.image} onChange={url => setForm({...form, image: url})} />
          
          <label className="text-sm font-semibold">Overview (1 paragraph per line)</label>
          <textarea rows={3} className="p-3 border rounded-xl" value={form.overview} onChange={e => setForm({...form, overview: e.target.value})} />
          
          <label className="text-sm font-semibold">Who Should Consider This? (1 bullet per line)</label>
          <textarea rows={3} className="p-3 border rounded-xl" value={form.whoShould} onChange={e => setForm({...form, whoShould: e.target.value})} />
          
          <label className="text-sm font-semibold">What It Involves (1 bullet per line)</label>
          <textarea rows={3} className="p-3 border rounded-xl" value={form.involves} onChange={e => setForm({...form, involves: e.target.value})} />
          
          <button type="submit" disabled={saving} className="bg-forest-800 text-white p-3 rounded-xl font-bold hover:bg-forest-900 disabled:opacity-50">
            {saving ? 'Saving...' : (editingId ? 'Save Changes' : 'Create Treatment')}
          </button>
        </form>
      </div>
    </div>
  );
}

function AboutPageTab() {
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/pages/about')
      .then(res => res.json())
      .then(data => {
        setForm(data.content);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { _id, ...updateData } = form; // omit _id
      await fetch('/api/pages/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      alert("Saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading content...</p>;
  if (!form) return <p>Error loading content.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* Section 1 */}
        <div className="space-y-4">
          <h3 className="font-bold text-forest-900 border-b pb-2">Hero Section</h3>
          <div>
            <label className="block text-sm font-semibold mb-1">Hero Text</label>
            <textarea rows={3} className="w-full p-3 border rounded-xl" value={form.heroText} onChange={e => setForm({...form, heroText: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Hero Image URL</label>
              <ImageUpload label="" value={form.heroImage} onChange={url => setForm({...form, heroImage: url})} />
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h3 className="font-bold text-forest-900 border-b pb-2">Professional Profile</h3>
          <div>
            <label className="block text-sm font-semibold mb-1">Paragraph 1</label>
            <textarea rows={3} className="w-full p-3 border rounded-xl" value={form.profileP1} onChange={e => setForm({...form, profileP1: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Paragraph 2</label>
            <textarea rows={3} className="w-full p-3 border rounded-xl" value={form.profileP2} onChange={e => setForm({...form, profileP2: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Profile Image URL</label>
              <ImageUpload label="" value={form.profileImage} onChange={url => setForm({...form, profileImage: url})} />
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <h3 className="font-bold text-forest-900 border-b pb-2">Experience Band</h3>
          <div>
            <label className="block text-sm font-semibold mb-1">Years (e.g. 15+)</label>
            <input type="text" className="w-full p-3 border rounded-xl" value={form.experienceYears} onChange={e => setForm({...form, experienceYears: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Description Text</label>
            <textarea rows={2} className="w-full p-3 border rounded-xl" value={form.experienceText} onChange={e => setForm({...form, experienceText: e.target.value})} />
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-4">
          <h3 className="font-bold text-forest-900 border-b pb-2">Consultation Approach</h3>
          <div>
            <label className="block text-sm font-semibold mb-1">Quote Line 1</label>
            <input type="text" className="w-full p-3 border rounded-xl" value={form.consultationQuoteLine1} onChange={e => setForm({...form, consultationQuoteLine1: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Quote Line 2</label>
            <input type="text" className="w-full p-3 border rounded-xl" value={form.consultationQuoteLine2} onChange={e => setForm({...form, consultationQuoteLine2: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Consultation Image URL</label>
              <ImageUpload label="" value={form.consultationImage} onChange={url => setForm({...form, consultationImage: url})} />
          </div>
        </div>

        {/* Section 5 */}
        <div className="space-y-4">
          <h3 className="font-bold text-forest-900 border-b pb-2">Patient-Centred Care</h3>
          <div>
            <label className="block text-sm font-semibold mb-1">Introductory Text</label>
            <textarea rows={3} className="w-full p-3 border rounded-xl" value={form.patientCareText} onChange={e => setForm({...form, patientCareText: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Examination Image URL</label>
              <ImageUpload label="" value={form.patientCareImage} onChange={url => setForm({...form, patientCareImage: url})} />
          </div>
        </div>
        
        <button type="submit" disabled={saving} className="bg-forest-800 text-white p-4 rounded-xl font-bold hover:bg-forest-900 disabled:opacity-50 mt-4">
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </form>
    </div>
  );
}

function HowItWorksTab() {
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/pages/how-it-works')
      .then(res => res.json())
      .then(data => {
        setSteps(data.steps || []);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/pages/how-it-works', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steps })
      });
      alert("Saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving.");
    } finally {
      setSaving(false);
    }
  };

  const updateStep = (index: number, field: string, value: string) => {
    const newSteps = [...steps];
    if (field === 'points') {
      newSteps[index][field] = value.split('\n').filter(p => p.trim() !== '');
    } else {
      newSteps[index][field] = value;
    }
    setSteps(newSteps);
  };

  if (loading) return <p>Loading content...</p>;
  if (steps.length === 0) return <p>No steps found.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        {steps.map((step, index) => (
          <div key={index} className="space-y-4">
            <h3 className="font-bold text-forest-900 border-b pb-2 text-lg">Step {step.no}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input type="text" className="w-full p-3 border rounded-xl" value={step.title} onChange={e => updateStep(index, 'title', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Image URL</label>
                  <ImageUpload label="" value={step.image} onChange={url => updateStep(index, 'image', url)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Text Description</label>
              <textarea rows={2} className="w-full p-3 border rounded-xl" value={step.text} onChange={e => updateStep(index, 'text', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Bullet Points (One per line)</label>
              <textarea rows={4} className="w-full p-3 border rounded-xl" value={step.points ? step.points.join('\n') : ''} onChange={e => updateStep(index, 'points', e.target.value)} />
            </div>
          </div>
        ))}
        
        <button type="submit" disabled={saving} className="bg-forest-800 text-white p-4 rounded-xl font-bold hover:bg-forest-900 disabled:opacity-50 mt-4">
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </form>
    </div>
  );
}

function HomePageTab() {
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/pages/home')
      .then(res => res.json())
      .then(data => {
        setForm(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { _id, ...updateData } = form; // omit _id
      await fetch('/api/pages/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      alert("Saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving.");
    } finally {
      setSaving(false);
    }
  };

  const updateNested = (section: string, field: string, value: any) => {
    setForm({
      ...form,
      [section]: {
        ...form[section],
        [field]: value
      }
    });
  };

  if (loading) return <p>Loading content...</p>;
  if (!form) return <p>Error loading content.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        
        {/* Section 1: Hero */}
        <div className="space-y-4">
          <h3 className="font-bold text-forest-900 border-b pb-2 text-xl">1. Hero Section</h3>
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input type="text" className="w-full p-3 border rounded-xl" value={form.hero?.title} onChange={e => updateNested('hero', 'title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Subtitle Text</label>
            <textarea rows={3} className="w-full p-3 border rounded-xl" value={form.hero?.text} onChange={e => updateNested('hero', 'text', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Checkmark Points (One per line)</label>
            <textarea rows={3} className="w-full p-3 border rounded-xl" value={form.hero?.points?.join('\n')} onChange={e => updateNested('hero', 'points', e.target.value.split('\n'))} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Hero Image</label>
            <ImageUpload label="" value={form.hero?.image} onChange={url => updateNested('hero', 'image', url)} />
          </div>
        </div>

        {/* Section 2: Doctor Intro */}
        <div className="space-y-4">
          <h3 className="font-bold text-forest-900 border-b pb-2 text-xl">2. Doctor Introduction</h3>
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input type="text" className="w-full p-3 border rounded-xl" value={form.doctorIntro?.title} onChange={e => updateNested('doctorIntro', 'title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Paragraph 1</label>
            <textarea rows={3} className="w-full p-3 border rounded-xl" value={form.doctorIntro?.p1} onChange={e => updateNested('doctorIntro', 'p1', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Paragraph 2</label>
            <textarea rows={3} className="w-full p-3 border rounded-xl" value={form.doctorIntro?.p2} onChange={e => updateNested('doctorIntro', 'p2', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Main Image</label>
              <ImageUpload label="" value={form.doctorIntro?.imageMain} onChange={url => updateNested('doctorIntro', 'imageMain', url)} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Secondary (Floating) Image</label>
              <ImageUpload label="" value={form.doctorIntro?.imageSecondary} onChange={url => updateNested('doctorIntro', 'imageSecondary', url)} />
            </div>
          </div>
        </div>

        {/* Section 3: Why ZivRA */}
        <div className="space-y-4">
          <h3 className="font-bold text-forest-900 border-b pb-2 text-xl">3. Why ZivRA Health</h3>
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input type="text" className="w-full p-3 border rounded-xl" value={form.why?.title} onChange={e => updateNested('why', 'title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Main Image</label>
            <ImageUpload label="" value={form.why?.image} onChange={url => updateNested('why', 'image', url)} />
          </div>
          <div className="space-y-4 mt-4">
            <label className="block text-sm font-semibold mb-1">Feature Points</label>
            {form.why?.points?.map((pt: any, idx: number) => (
              <div key={idx} className="p-4 border rounded-xl bg-gray-50">
                <input type="text" className="w-full p-2 border rounded-lg mb-2 text-sm" placeholder="Title" value={pt.title} onChange={e => {
                  const newPts = [...form.why.points];
                  newPts[idx].title = e.target.value;
                  updateNested('why', 'points', newPts);
                }} />
                <textarea className="w-full p-2 border rounded-lg text-sm" placeholder="Text" value={pt.text} onChange={e => {
                  const newPts = [...form.why.points];
                  newPts[idx].text = e.target.value;
                  updateNested('why', 'points', newPts);
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Education */}
        <div className="space-y-4">
          <h3 className="font-bold text-forest-900 border-b pb-2 text-xl">4. Education Section</h3>
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input type="text" className="w-full p-3 border rounded-xl" value={form.education?.title} onChange={e => updateNested('education', 'title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Paragraph 1</label>
            <textarea rows={3} className="w-full p-3 border rounded-xl" value={form.education?.p1} onChange={e => updateNested('education', 'p1', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Paragraph 2</label>
            <textarea rows={3} className="w-full p-3 border rounded-xl" value={form.education?.p2} onChange={e => updateNested('education', 'p2', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Checkmark Points (One per line)</label>
            <textarea rows={3} className="w-full p-3 border rounded-xl" value={form.education?.points?.join('\n')} onChange={e => updateNested('education', 'points', e.target.value.split('\n'))} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Image</label>
            <ImageUpload label="" value={form.education?.image} onChange={url => updateNested('education', 'image', url)} />
          </div>
        </div>

        {/* Section 5: Trust */}
        <div className="space-y-4">
          <h3 className="font-bold text-forest-900 border-b pb-2 text-xl">5. Trust Section</h3>
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input type="text" className="w-full p-3 border rounded-xl" value={form.trust?.title} onChange={e => updateNested('trust', 'title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Text</label>
            <textarea rows={3} className="w-full p-3 border rounded-xl" value={form.trust?.text} onChange={e => updateNested('trust', 'text', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Image</label>
            <ImageUpload label="" value={form.trust?.image} onChange={url => updateNested('trust', 'image', url)} />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {form.trust?.stats?.map((st: any, idx: number) => (
              <div key={idx} className="p-3 border rounded-xl bg-gray-50">
                <input type="text" className="w-full p-2 border rounded-lg mb-2 text-sm font-bold" placeholder="Value (e.g. 15+)" value={st.value} onChange={e => {
                  const newStats = [...form.trust.stats];
                  newStats[idx].value = e.target.value;
                  updateNested('trust', 'stats', newStats);
                }} />
                <input type="text" className="w-full p-2 border rounded-lg text-sm" placeholder="Label" value={st.label} onChange={e => {
                  const newStats = [...form.trust.stats];
                  newStats[idx].label = e.target.value;
                  updateNested('trust', 'stats', newStats);
                }} />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={saving} className="bg-forest-800 text-white p-4 rounded-xl font-bold hover:bg-forest-900 disabled:opacity-50 mt-4 text-lg">
          {saving ? 'Saving...' : 'Save Home Page Content'}
        </button>
      </form>
    </div>
  );
}

function ImageUpload({ value, onChange, label = "Image" }: { value: string, onChange: (url: string) => void, label?: string }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        onChange(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-forest-900 mb-1">{label}</label>
      {value && (
        <div className="mb-3 relative rounded-xl overflow-hidden border border-gray-200" style={{ maxWidth: '200px', maxHeight: '150px' }}>
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex items-center gap-3">
        <label className="cursor-pointer bg-forest-50 hover:bg-forest-100 text-forest-800 border border-forest-200 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
          {uploading ? 'Uploading...' : (value ? 'Change Image' : 'Upload Image')}
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        </label>
        {uploading && <span className="text-sm text-forest-600 font-medium">Uploading to GridFS...</span>}
        {error && <span className="text-sm text-red-500 font-medium">{error}</span>}
      </div>
    </div>
  );
}

function PatientStoriesTab() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/pages/patient-stories')
      .then(res => res.json())
      .then(data => {
        setStories(data.stories || []);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/pages/patient-stories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stories })
      });
      alert("Saved successfully!");
    } catch (err) {
      alert("Error saving.");
    } finally {
      setSaving(false);
    }
  };

  const addStory = () => {
    setStories([{ quote: '', name: '', category: '', image: '' }, ...stories]);
  };

  const updateStory = (index: number, field: string, value: string) => {
    const newStories = [...stories];
    newStories[index][field] = value;
    setStories(newStories);
  };

  const removeStory = (index: number) => {
    setStories(stories.filter((_, i) => i !== index));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-forest-900">Patient Stories</h2>
        <button type="button" onClick={addStory} className="bg-sage-200 text-forest-900 px-4 py-2 rounded-lg font-bold hover:bg-sage-300">
          + Add Story
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        {stories.map((s, index) => (
          <div key={index} className="space-y-4 border p-6 rounded-2xl relative bg-gray-50/50">
            <button type="button" onClick={() => removeStory(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold">Remove</button>
            
            <div>
              <label className="block text-sm font-semibold mb-1">Quote</label>
              <textarea rows={3} className="w-full p-3 border rounded-xl" value={s.quote} onChange={e => updateStory(index, 'quote', e.target.value)} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Patient Name</label>
                <input type="text" className="w-full p-3 border rounded-xl" value={s.name} onChange={e => updateStory(index, 'name', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Category (e.g. Kidney Stones)</label>
                <input type="text" className="w-full p-3 border rounded-xl" value={s.category} onChange={e => updateStory(index, 'category', e.target.value)} />
              </div>
            </div>
            
            <ImageUpload label="Patient Photo (Optional)" value={s.image} onChange={(url) => updateStory(index, 'image', url)} />
          </div>
        ))}
        <button type="submit" disabled={saving} className="bg-forest-800 text-white p-4 rounded-xl font-bold hover:bg-forest-900 disabled:opacity-50 mt-4">
          {saving ? 'Saving...' : 'Save All Stories'}
        </button>
      </form>
    </div>
  );
}

function FaqsTab() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/pages/faqs')
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories || []);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/pages/faqs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories })
      });
      alert("Saved successfully!");
    } catch (err) {
      alert("Error saving.");
    } finally {
      setSaving(false);
    }
  };

  const addCategory = () => {
    setCategories([...categories, { id: Date.now().toString(), title: '', blurb: '', items: [] }]);
  };

  const updateCategory = (index: number, field: string, value: string) => {
    const newCategories = [...categories];
    newCategories[index][field] = value;
    setCategories(newCategories);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const addFaq = (catIndex: number) => {
    const newCategories = [...categories];
    newCategories[catIndex].items.push({ q: '', a: '' });
    setCategories(newCategories);
  };

  const updateFaq = (catIndex: number, faqIndex: number, field: string, value: string) => {
    const newCategories = [...categories];
    newCategories[catIndex].items[faqIndex][field] = value;
    setCategories(newCategories);
  };

  const removeFaq = (catIndex: number, faqIndex: number) => {
    const newCategories = [...categories];
    newCategories[catIndex].items = newCategories[catIndex].items.filter((_: any, i: number) => i !== faqIndex);
    setCategories(newCategories);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-forest-900">Manage FAQs</h2>
        <button type="button" onClick={addCategory} className="bg-sage-200 text-forest-900 px-4 py-2 rounded-lg font-bold hover:bg-sage-300">
          + Add Category
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        {categories.map((cat, catIndex) => (
          <div key={catIndex} className="space-y-6 border p-6 rounded-2xl relative bg-gray-50/50">
            <button type="button" onClick={() => removeCategory(catIndex)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold">Remove Category</button>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Category ID</label>
                <input type="text" className="w-full p-3 border rounded-xl" value={cat.id} onChange={e => updateCategory(catIndex, 'id', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Category Title</label>
                <input type="text" className="w-full p-3 border rounded-xl" value={cat.title} onChange={e => updateCategory(catIndex, 'title', e.target.value)} />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1">Short Description (Blurb)</label>
              <textarea rows={2} className="w-full p-3 border rounded-xl" value={cat.blurb} onChange={e => updateCategory(catIndex, 'blurb', e.target.value)} />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-forest-900">Questions in {cat.title || 'this category'}</h3>
                <button type="button" onClick={() => addFaq(catIndex)} className="text-sm bg-forest-100 text-forest-900 px-3 py-1.5 rounded-lg font-bold hover:bg-forest-200">
                  + Add Question
                </button>
              </div>
              
              <div className="space-y-4">
                {cat.items?.map((faq: any, faqIndex: number) => (
                  <div key={faqIndex} className="p-4 border rounded-xl bg-white relative">
                    <button type="button" onClick={() => removeFaq(catIndex, faqIndex)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-bold">X</button>
                    <div className="space-y-3 mr-8">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Question</label>
                        <input type="text" className="w-full p-2.5 border rounded-lg text-sm" value={faq.q} onChange={e => updateFaq(catIndex, faqIndex, 'q', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Answer</label>
                        <textarea rows={2} className="w-full p-2.5 border rounded-lg text-sm" value={faq.a} onChange={e => updateFaq(catIndex, faqIndex, 'a', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
                {(!cat.items || cat.items.length === 0) && <p className="text-sm text-gray-500">No questions added yet.</p>}
              </div>
            </div>
          </div>
        ))}
        
        <button type="submit" disabled={saving} className="bg-forest-800 text-white p-4 rounded-xl font-bold hover:bg-forest-900 disabled:opacity-50 mt-4">
          {saving ? 'Saving...' : 'Save FAQs'}
        </button>
      </form>
    </div>
  );
}


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

/* ------------------------------------------------------------------ */
/*  Before & After Tab                                                 */
/* ------------------------------------------------------------------ */

function BeforeAfterTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [patientName, setPatientName] = useState('');
  const [caption, setCaption] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);

  // Section content state
  const [sectionConfig, setSectionConfig] = useState({
    eyebrow: 'RESEARCH BACKED',
    headline: '93% saw results*',
    badge1: '300 Participants',
    badge2: 'Users across Stage 1-5',
    badge3: 'Tracked for 5+ months',
    buttonText: 'View Results',
    buttonLink: '/patient-stories',
  });
  const [savingConfig, setSavingConfig] = useState(false);
  const [configSaved, setConfigSaved] = useState(false);

  const fetchItems = () => {
    fetch('/api/before-after')
      .then(r => r.json())
      .then(data => { setItems(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  const fetchConfig = () => {
    fetch('/api/before-after/config')
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          setSectionConfig({
            eyebrow: data.eyebrow || 'RESEARCH BACKED',
            headline: data.headline || '93% saw results*',
            badge1: data.badge1 || '300 Participants',
            badge2: data.badge2 || 'Users across Stage 1-5',
            badge3: data.badge3 || 'Tracked for 5+ months',
            buttonText: data.buttonText || 'View Results',
            buttonLink: data.buttonLink || '/patient-stories',
          });
        }
      })
      .catch(() => {});
  };

  useEffect(() => { fetchItems(); fetchConfig(); }, []);

  const saveConfig = async () => {
    setSavingConfig(true);
    setConfigSaved(false);
    try {
      const res = await fetch('/api/before-after/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectionConfig),
      });
      if (!res.ok) throw new Error('Failed to save');
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSavingConfig(false);
    }
  };

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload/image', { method: 'POST', body: fd });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Upload failed');
    return result.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beforeFile || !afterFile) {
      setError('Before and After images are required.');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const avatarUrl = avatarFile ? await uploadImage(avatarFile) : '';
      const beforeImageUrl = await uploadImage(beforeFile);
      const afterImageUrl = await uploadImage(afterFile);

      const res = await fetch('/api/before-after', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientName, caption, avatarUrl, beforeImageUrl, afterImageUrl }),
      });
      if (!res.ok) throw new Error('Failed to save');

      setPatientName('');
      setCaption('');
      setAvatarFile(null);
      setBeforeFile(null);
      setAfterFile(null);
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    try {
      const res = await fetch('/api/before-after?id=' + id, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchItems();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Section Content Editor */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-forest-900 mb-4">Section Content</h2>
        <p className="text-sm text-gray-500 mb-4">Edit the headline, badges, and button text shown on the left side of the Research Backed section.</p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Eyebrow Text</label>
              <input type="text" value={sectionConfig.eyebrow} onChange={e => setSectionConfig({ ...sectionConfig, eyebrow: e.target.value })} className="w-full p-3 border rounded-xl" placeholder="RESEARCH BACKED" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Headline</label>
              <input type="text" value={sectionConfig.headline} onChange={e => setSectionConfig({ ...sectionConfig, headline: e.target.value })} className="w-full p-3 border rounded-xl" placeholder="93% saw results*" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Badge 1</label>
              <input type="text" value={sectionConfig.badge1} onChange={e => setSectionConfig({ ...sectionConfig, badge1: e.target.value })} className="w-full p-3 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Badge 2</label>
              <input type="text" value={sectionConfig.badge2} onChange={e => setSectionConfig({ ...sectionConfig, badge2: e.target.value })} className="w-full p-3 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Badge 3</label>
              <input type="text" value={sectionConfig.badge3} onChange={e => setSectionConfig({ ...sectionConfig, badge3: e.target.value })} className="w-full p-3 border rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Button Text</label>
              <input type="text" value={sectionConfig.buttonText} onChange={e => setSectionConfig({ ...sectionConfig, buttonText: e.target.value })} className="w-full p-3 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Button Link</label>
              <input type="text" value={sectionConfig.buttonLink} onChange={e => setSectionConfig({ ...sectionConfig, buttonLink: e.target.value })} className="w-full p-3 border rounded-xl" placeholder="/patient-stories" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={saveConfig} disabled={savingConfig} className="bg-forest-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-forest-900 disabled:opacity-50">
              {savingConfig ? 'Saving...' : 'Save Section Content'}
            </button>
            {configSaved && <span className="text-green-600 font-semibold text-sm">✓ Saved!</span>}
          </div>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-forest-900 mb-4">Add New Before & After Result</h2>
        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Name *</label>
              <input type="text" value={patientName} onChange={e => setPatientName(e.target.value)} className="w-full p-3 border rounded-xl" required placeholder="e.g. Ramesh K" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Caption</label>
              <input type="text" value={caption} onChange={e => setCaption(e.target.value)} className="w-full p-3 border rounded-xl" placeholder="e.g. Kidney Stone — 12mm → Clear" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Avatar Photo (optional)</label>
            <input type="file" accept="image/*" onChange={e => { if (e.target.files) setAvatarFile(e.target.files[0]); }} className="w-full p-3 border rounded-xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Before Image *</label>
              <input type="file" accept="image/*" onChange={e => { if (e.target.files) setBeforeFile(e.target.files[0]); }} className="w-full p-3 border rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">After Image *</label>
              <input type="file" accept="image/*" onChange={e => { if (e.target.files) setAfterFile(e.target.files[0]); }} className="w-full p-3 border rounded-xl" required />
            </div>
          </div>
          <button type="submit" disabled={uploading} className="bg-forest-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-forest-900 disabled:opacity-50">
            {uploading ? 'Uploading...' : 'Add Result'}
          </button>
        </form>
      </div>

      {/* Manage Existing */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-forest-900 mb-4">Manage Results</h2>
        {loading ? <p>Loading...</p> : (
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map(item => (
              <div key={item._id} className="border rounded-2xl p-4 bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  {item.avatarUrl ? (
                    <img src={item.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-forest-800" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-white font-bold text-sm">
                      {item.patientName?.charAt(0) || '?'}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-forest-900 text-sm">{item.patientName}</p>
                    {item.caption && <p className="text-xs text-gray-500">{item.caption}</p>}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">Before</p>
                    <img src={item.beforeImageUrl} alt="Before" className="w-full aspect-[4/5] object-cover rounded-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">After</p>
                    <img src={item.afterImageUrl} alt="After" className="w-full aspect-[4/5] object-cover rounded-xl" />
                  </div>
                </div>
                <button onClick={() => handleDelete(item._id)} className="mt-3 text-sm text-red-500 hover:text-red-700 font-bold">Delete</button>
              </div>
            ))}
            {items.length === 0 && <p className="col-span-full text-gray-500">No before/after results added yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

