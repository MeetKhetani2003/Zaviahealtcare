// @ts-nocheck
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SectionHead } from "@/components/ui";
import { Logo } from "@/components/layout";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_-18px_rgb(18_45_35/0.3)] border border-forest-900/10 p-8">
        <div className="flex justify-center mb-8">
          <Logo className="h-14" />
        </div>
        
        <SectionHead title="Admin Login" text="Enter your credentials to access the dashboard." center={true} />
        
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-forest-900 mb-1.5">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-all bg-gray-50/50" 
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-forest-900 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none transition-all bg-gray-50/50" 
              placeholder="Enter password"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-forest-800 text-white p-3.5 rounded-xl font-bold hover:bg-forest-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
