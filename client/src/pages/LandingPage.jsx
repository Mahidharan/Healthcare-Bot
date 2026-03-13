import React from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Shield,
  Clock,
  Brain,
  Heart,
  Activity,
  ArrowRight,
  Stethoscope,
  BookOpen,
  CheckCircle,
  Star,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0c4a6e]">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0f172a]/70 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                AI Healthcare{" "}
                <span className="text-primary-400">Assistant</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium"
              >
                Benefits
              </a>
              <a
                href="#resources"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium"
              >
                Resources
              </a>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Get Started
              </Link>
            </div>
            <Link
              to="/login"
              className="md:hidden bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                AI-Powered Healthcare Guidance
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Your AI Healthcare{" "}
                <span className="text-primary-400">Assistant</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
                Get instant medical guidance and health insights through our
                AI-powered healthcare chatbot. Available 24/7 to help you
                understand symptoms, find health information, and make informed
                decisions about your well-being.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-3.5 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 text-base font-semibold"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/10 px-8 py-3.5 rounded-xl hover:bg-white/15 transition-all text-base font-semibold"
                >
                  <Stethoscope className="w-5 h-5" />
                  Sign In
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-400">Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-400">24/7 Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-400">Private & Secure</span>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-primary-400" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-300">
                      Hello! I'm your AI Healthcare Assistant. How can I help
                      you today?
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end mb-4">
                    <div className="bg-primary-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
                      I've been having headaches frequently. What could be the
                      cause?
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-primary-400" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-300">
                      Frequent headaches can have several causes including
                      stress, dehydration, poor sleep...
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="bg-white/10 border border-white/10 text-gray-400 text-xs px-3 py-1.5 rounded-full">
                    Check symptoms
                  </span>
                  <span className="bg-white/10 border border-white/10 text-gray-400 text-xs px-3 py-1.5 rounded-full">
                    Healthy lifestyle tips
                  </span>
                  <span className="bg-white/10 border border-white/10 text-gray-400 text-xs px-3 py-1.5 rounded-full">
                    Common illnesses
                  </span>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4">
        <div className="absolute inset-0 bg-white/[0.02]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Platform Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Comprehensive AI-powered tools designed to help you manage your
              health effectively and make informed medical decisions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "AI Health Chat",
                description:
                  "Have natural conversations about your health concerns with our advanced AI assistant powered by Groq.",
                color: "primary",
              },
              {
                icon: Stethoscope,
                title: "Symptom Checker",
                description:
                  "Enter your symptoms and get AI-generated insights about possible conditions and recommended next steps.",
                color: "secondary",
              },
              {
                icon: BookOpen,
                title: "Health Resources",
                description:
                  "Access a curated library of health articles covering common diseases, prevention, and healthy living.",
                color: "primary",
              },
              {
                icon: Clock,
                title: "Chat History",
                description:
                  "All your conversations are saved and organized, so you can review health advice anytime.",
                color: "secondary",
              },
              {
                icon: Shield,
                title: "Private & Secure",
                description:
                  "Your health data is kept private and secure. We follow best practices for data protection.",
                color: "primary",
              },
              {
                icon: Activity,
                title: "24/7 Availability",
                description:
                  "Get health guidance anytime, day or night. Our AI assistant is always ready to help.",
                color: "secondary",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-primary-500/30 transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    feature.color === "primary"
                      ? "bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20"
                      : "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20"
                  } transition-colors`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Benefits of AI Healthcare Assistance
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Our AI-powered platform combines cutting-edge technology with
                medical knowledge to provide you with reliable health guidance
                when you need it most.
              </p>
              <div className="space-y-5">
                {[
                  {
                    title: "Instant Health Guidance",
                    desc: "Get immediate answers to your health questions without waiting for an appointment.",
                  },
                  {
                    title: "Evidence-Based Information",
                    desc: "Our AI is trained on medical literature to provide accurate, up-to-date health information.",
                  },
                  {
                    title: "Symptom Analysis",
                    desc: "Describe your symptoms and receive potential causes along with recommended actions.",
                  },
                  {
                    title: "Accessible Anytime",
                    desc: "Whether it's 2 AM or a holiday, your AI health assistant is always available.",
                  },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-400 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white border border-primary-500/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Your Health Matters</h3>
                <p className="text-primary-200 mb-8 leading-relaxed">
                  Start a conversation with our AI assistant today and take the
                  first step towards better understanding your health.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-primary-300 text-xs mt-1">
                      Available
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">AI</div>
                    <div className="text-primary-300 text-xs mt-1">Powered</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-primary-300 text-xs mt-1">Private</div>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-white/[0.02]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our AI Healthcare Assistant for
            reliable health guidance and symptom analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-10 py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 text-lg font-semibold"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/10 px-10 py-4 rounded-xl hover:bg-white/15 transition-all text-lg font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            This AI assistant provides general health information and should not
            replace professional medical consultation.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0a0f1e] text-gray-400 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">
              AI Healthcare Assistant
            </span>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} AI Healthcare Assistant. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
