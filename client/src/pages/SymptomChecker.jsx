import React, { useState } from "react";
import {
  Stethoscope,
  User,
  Calendar,
  AlertCircle,
  Activity,
  Loader2,
  CheckCircle,
  Shield,
} from "lucide-react";
import { checkSymptoms } from "../api";

export default function SymptomChecker() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    symptoms: "",
    duration: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!form.age || !form.gender || !form.symptoms || !form.duration) {
      setError("Please fill in all fields.");
      return;
    }

    const age = parseInt(form.age, 10);
    if (isNaN(age) || age < 0 || age > 150) {
      setError("Please enter a valid age.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await checkSymptoms({
        age,
        gender: form.gender,
        symptoms: form.symptoms,
        duration: form.duration,
      });
      setResult(data.analysis);
    } catch (err) {
      setError("Failed to analyze symptoms. Please try again.");
      console.error("Symptom check error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ age: "", gender: "", symptoms: "", duration: "" });
    setResult(null);
    setError(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-secondary-500/20 flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-secondary-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Symptom Checker</h1>
        </div>
        <p className="text-gray-400 text-sm ml-13">
          Enter your details and symptoms to receive AI-generated health
          insights and possible conditions.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">
            Enter Your Information
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Age */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <User className="w-4 h-4" />
                Age
              </label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Enter your age"
                min="0"
                max="150"
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400/50 transition-all placeholder-gray-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <User className="w-4 h-4" />
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400/50 transition-all"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Symptoms */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Activity className="w-4 h-4" />
                Symptoms
              </label>
              <textarea
                name="symptoms"
                value={form.symptoms}
                onChange={handleChange}
                placeholder="Describe your symptoms in detail..."
                rows={4}
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400/50 transition-all resize-none placeholder-gray-500"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4" />
                Duration
              </label>
              <select
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400/50 transition-all"
              >
                <option value="">How long have you had these symptoms?</option>
                <option value="less than 24 hours">Less than 24 hours</option>
                <option value="1–3 days">1–3 days</option>
                <option value="4–7 days">4–7 days</option>
                <option value="1–2 weeks">1–2 weeks</option>
                <option value="2–4 weeks">2–4 weeks</option>
                <option value="more than a month">More than a month</option>
              </select>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-primary-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-4 h-4" />
                    Analyze Symptoms
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 border border-white/20 text-gray-400 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div>
          {result ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-secondary-400" />
                <h3 className="text-lg font-semibold text-white">
                  Analysis Results
                </h3>
              </div>
              <div className="prose prose-sm max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                {result}
              </div>
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700 leading-relaxed">
                    This analysis is for informational purposes only and should
                    not be considered a medical diagnosis. Please consult a
                    healthcare professional for proper evaluation and treatment.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <Stethoscope className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-500 mb-2">
                Analysis Results
              </h3>
              <p className="text-gray-600 text-sm max-w-xs">
                Fill in the form and click "Analyze Symptoms" to get AI-powered
                health insights.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
