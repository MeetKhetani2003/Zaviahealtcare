const fs = require('fs');
const path = require('path');

const reelsFile = path.join(__dirname, 'src/app/reels/page.tsx');
let content = fs.readFileSync(reelsFile, 'utf8');

// 1. Remove uploading state
content = content.replace(/  const \[uploading, setUploading\] = useState\(false\);\n/, '');

// 2. Remove handleUpload function
const handleUploadRegex = /  const handleUpload = async \([^]*?window\.location\.reload\(\);\n  };\n\n/;
content = content.replace(handleUploadRegex, '');

// 3. Remove upload form UI
const uploadFormRegex = /      \{\/\* Upload Form \(For Admin Use\) \*\/\}[\s\S]*?<\/form>\n      <\/div>\n\n/;
content = content.replace(uploadFormRegex, '');

fs.writeFileSync(reelsFile, content);

// 4. Create admin page
const adminDir = path.join(__dirname, 'src/app/admin');
if (!fs.existsSync(adminDir)) fs.mkdirSync(adminDir, { recursive: true });

const adminFile = path.join(adminDir, 'page.tsx');
fs.writeFileSync(adminFile, `"use client";
import { useState } from "react";
import { SectionHead } from "@/components/ui";

export default function AdminUpload() {
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
    <div className="container-x py-32 min-h-screen">
      <SectionHead eyebrow="Admin" title="Upload Media" text="Upload YouTube Shorts or photos for the gallery." />
      
      <div className="max-w-md mx-auto mt-10 rounded-2xl bg-forest-50 p-6 border border-forest-100 shadow-sm">
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-forest-900">Media Type</label>
          <select name="type" className="p-3 rounded-lg border border-gray-300" required>
            <option value="youtube">YouTube Short Link</option>
            <option value="image">Image (GridFS)</option>
          </select>
          
          <label className="text-sm font-semibold text-forest-900 mt-2">YouTube URL</label>
          <input type="text" name="url" placeholder="https://youtube.com/shorts/..." className="p-3 rounded-lg border border-gray-300" />
          
          <label className="text-sm font-semibold text-forest-900 mt-2">Upload Photo</label>
          <input type="file" name="file" accept="image/*" className="p-3 rounded-lg border border-gray-300 bg-white" />
          
          <button type="submit" disabled={uploading} className="mt-4 bg-forest-800 text-white p-3 rounded-lg font-bold hover:bg-forest-900 transition-colors">
            {uploading ? 'Uploading...' : 'Upload Media'}
          </button>
          
          {message && <p className="text-center font-medium mt-2 text-forest-800">{message}</p>}
        </form>
      </div>
    </div>
  );
}
`);

console.log("Admin page created and Reels page updated");
