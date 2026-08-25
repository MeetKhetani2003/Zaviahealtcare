"use client";

import React, { useState } from "react";
import { SectionHead, Button, Icon, Reveal } from "@/components/ui";

export default function SecureAssessmentPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    concern: "",
    ultrasoundUrl: "",
    bloodReportUrl: "",
  });

  const [reports, setReports] = useState({
    ultrasound: false,
    blood: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.age || !formData.phone) {
        alert("Please fill in all required basic details.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!reports.ultrasound || !reports.blood) {
        alert("Both Ultrasound and Blood Report are compulsory to proceed.");
        return;
      }
      submitAssessment();
    }
  };

  const submitAssessment = async () => {
    setLoading(true);
    try {
      const finalData = {
        ...formData,
        reports,
      };

      const res = await fetch("/api/secure-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!res.ok) throw new Error("Submission failed");
      
      setStep(3);
    } catch (error) {
      console.error(error);
      alert("Something went wrong during submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-sage-50 min-h-screen py-24 md:py-32">
      <div className="container-x max-w-3xl">
        <SectionHead
          center
          eyebrow="Secure Assessment"
          title="Start Your Care Journey"
          text="Complete this simple 3-step assessment to help us understand your condition."
        />

        <div className="mt-12 bg-white rounded-[2rem] border border-forest-900/10 shadow-soft p-8 md:p-12">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-forest-800 -translate-y-1/2 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`relative z-10 flex flex-col items-center gap-2`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                  step >= num ? "bg-forest-800 text-white" : "bg-gray-100 text-gray-400 border border-gray-200"
                }`}>
                  {step > num ? <Icon name="check" className="w-5 h-5" /> : num}
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider hidden sm:block ${
                  step >= num ? "text-forest-800" : "text-gray-400"
                }`}>
                  {num === 1 ? "Details" : num === 2 ? "Reports" : "Review"}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1: Basic Details */}
          {step === 1 && (
            <Reveal className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-forest-900 mb-2">1. Basic Details</h3>
                <p className="text-sm text-ink-500 mb-6">Please provide your details so we can contact you.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-forest-900">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-sm focus:border-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-800"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-forest-900">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-sm focus:border-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-800"
                    placeholder="e.g. 45"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-forest-900">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-sm focus:border-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-800"
                    placeholder="+91"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-forest-900">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-sm focus:border-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-800"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-semibold text-forest-900">Describe Your Concern</label>
                  <textarea
                    name="concern"
                    value={formData.concern}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-sm focus:border-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-800"
                    placeholder="Briefly describe your symptoms or reason for visit..."
                  ></textarea>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={nextStep}>
                  Next Step
                  <Icon name="arrow-right" className="w-4 h-4" />
                </Button>
              </div>
            </Reveal>
          )}

          {/* STEP 2: Reports */}
          {step === 2 && (
            <Reveal className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-forest-900 mb-2">2. Select Reports</h3>
                <p className="text-sm text-ink-500 mb-6">Select the reports you have ready for the consultation. (Both are mandatory)</p>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors border-forest-900/10 bg-sage-50/50 hover:bg-sage-50">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-forest-800/10 flex items-center justify-center text-forest-800 shrink-0">
                      <Icon name="pulse" className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-bold text-forest-900 text-sm">Ultrasound Report *</h4>
                      <p className="text-xs text-ink-500 mt-0.5">I have my latest ultrasound ready.</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-forest-900/20 text-forest-800 focus:ring-forest-800 cursor-pointer"
                    checked={reports.ultrasound}
                    onChange={(e) => setReports({ ...reports, ultrasound: e.target.checked })}
                  />
                </label>

                <label className="flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors border-forest-900/10 bg-sage-50/50 hover:bg-sage-50">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-forest-800/10 flex items-center justify-center text-forest-800 shrink-0">
                      <Icon name="leaf" className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-bold text-forest-900 text-sm">Blood Report *</h4>
                      <p className="text-xs text-ink-500 mt-0.5">I have my recent blood test results.</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-forest-900/20 text-forest-800 focus:ring-forest-800 cursor-pointer"
                    checked={reports.blood}
                    onChange={(e) => setReports({ ...reports, blood: e.target.checked })}
                  />
                </label>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button 
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="text-sm font-bold text-ink-500 hover:text-forest-900"
                >
                  Back
                </button>
                <Button onClick={nextStep} disabled={loading}>
                  {loading ? "Submitting..." : "Submit Assessment"}
                  {!loading && <Icon name="check" className="w-4 h-4" />}
                </Button>
              </div>
            </Reveal>
          )}

          {/* STEP 3: Review Phase */}
          {step === 3 && (
            <Reveal className="text-center py-10 space-y-6">
              <div className="w-24 h-24 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <Icon name="check" className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="font-display text-3xl font-bold text-forest-900">Assessment Submitted</h3>
              <div className="max-w-md mx-auto space-y-4">
                <p className="text-[15px] leading-relaxed text-ink-500">
                  Thank you for submitting your details and reports. Your assessment is now in review by our medical team.
                </p>
                <div className="p-4 bg-gold-50 border border-gold-200 rounded-xl">
                  <p className="font-medium text-gold-800 text-sm">
                    We will review your documents and talk to you shortly to discuss the next steps and consultation schedule.
                  </p>
                </div>
              </div>
              <div className="pt-8">
                <Button href="/" variant="outline">
                  Return to Home
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
