import React from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Stethoscope,
  BookOpen,
  History,
  ArrowRight,
  Heart,
  Activity,
  Clock,
  TrendingUp,
  Brain,
  Shield,
} from "lucide-react";

const quickActions = [
  {
    to: "/chat",
    icon: MessageSquare,
    label: "Start AI Chat",
    description: "Get instant health guidance from our AI assistant",
    color: "primary",
  },
  {
    to: "/symptom-checker",
    icon: Stethoscope,
    label: "Check Symptoms",
    description: "Analyze your symptoms and get possible conditions",
    color: "secondary",
  },
  {
    to: "/resources",
    icon: BookOpen,
    label: "Health Resources",
    description: "Browse health articles and medical information",
    color: "primary",
  },
  {
    to: "/history",
    icon: History,
    label: "Chat History",
    description: "Review your previous conversations",
    color: "secondary",
  },
];

const healthTips = [
  {
    icon: Heart,
    tip: "Stay hydrated — drink at least 8 glasses of water daily.",
  },
  {
    icon: Activity,
    tip: "Aim for 30 minutes of moderate exercise most days of the week.",
  },
  {
    icon: Clock,
    tip: "Get 7–9 hours of quality sleep each night for optimal health.",
  },
  {
    icon: TrendingUp,
    tip: "Track your health metrics regularly for early detection of issues.",
  },
];

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Welcome to Your Health Dashboard
        </h1>
        <p className="text-gray-400">
          Your AI-powered healthcare companion. How can we help you today?
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "AI Chats", value: "Ready", icon: Brain, color: "primary" },
          {
            label: "Resources",
            value: "9+",
            icon: BookOpen,
            color: "secondary",
          },
          {
            label: "Symptom Checks",
            value: "Available",
            icon: Stethoscope,
            color: "primary",
          },
          {
            label: "Status",
            value: "Online",
            icon: Activity,
            color: "secondary",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  stat.color === "primary"
                    ? "bg-primary-500/20 text-primary-400"
                    : "bg-secondary-500/20 text-secondary-400"
                }`}
              >
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {quickActions.map(
            ({ to, icon: Icon, label, description, color }, idx) => (
              <Link
                key={idx}
                to={to}
                className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-5 hover:bg-white/15 hover:border-primary-400/30 transition-all group flex items-start gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    color === "primary"
                      ? "bg-primary-500/20 text-primary-400 group-hover:bg-primary-500/30"
                      : "bg-secondary-500/20 text-secondary-400 group-hover:bg-secondary-500/30"
                  } transition-colors`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors">
                      {label}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary-400 transition-colors" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{description}</p>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>

      {/* Health Tips + Disclaimer */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Daily Health Tips
          </h2>
          <div className="space-y-4">
            {healthTips.map(({ icon: Icon, tip }, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-secondary-400" />
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base font-semibold mb-2">Medical Disclaimer</h3>
          <p className="text-primary-100 text-sm leading-relaxed mb-6">
            This AI assistant provides general health information and should not
            replace professional medical consultation. Always seek advice from a
            qualified healthcare provider.
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 bg-white text-primary-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-50 transition-colors"
          >
            Start Chat
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
