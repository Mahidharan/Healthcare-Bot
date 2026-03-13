import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Heart,
  Activity,
  Shield,
  Thermometer,
  Clipboard,
  Moon,
  Apple,
  Brain,
  Dumbbell,
  ArrowRight,
  X,
  Loader2,
} from "lucide-react";
import { getResources, getResourceById } from "../api";

const iconMap = {
  heart: Heart,
  activity: Activity,
  shield: Shield,
  thermometer: Thermometer,
  clipboard: Clipboard,
  moon: Moon,
  apple: Apple,
  brain: Brain,
  dumbbell: Dumbbell,
};

const categoryColors = {
  "Common Diseases": {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-100",
  },
  "Preventive Healthcare": {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
  },
  "Healthy Lifestyle": {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-100",
  },
};

function ResourceCard({ resource, onRead }) {
  const Icon = iconMap[resource.icon] || BookOpen;
  const colors = categoryColors[resource.category] || {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-100",
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/15 hover:border-primary-400/20 transition-all group overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${colors.text}`} />
          </div>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}
          >
            {resource.category}
          </span>
        </div>
        <h3 className="text-base font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
          {resource.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {resource.summary}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{resource.readTime}</span>
          <button
            onClick={() => onRead(resource.id)}
            className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ResourceModal({ resource, onClose }) {
  const Icon = iconMap[resource.icon] || BookOpen;
  const colors = categoryColors[resource.category] || {
    bg: "bg-gray-50",
    text: "text-gray-600",
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}
            >
              <Icon className={`w-4 h-4 ${colors.text}`} />
            </div>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
            >
              {resource.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {resource.title}
          </h2>
          <p className="text-sm text-gray-400 mb-6">{resource.readTime}</p>
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            <p className="text-gray-600 mb-4 font-medium">{resource.summary}</p>
            <p>{resource.content}</p>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700 leading-relaxed">
                This information is for educational purposes only. Please
                consult a healthcare professional for personalized medical
                advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HealthResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loadingResource, setLoadingResource] = useState(false);

  const categories = [
    "All",
    "Common Diseases",
    "Preventive Healthcare",
    "Healthy Lifestyle",
  ];

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const { data } = await getResources();
      setResources(data);
    } catch (err) {
      console.error("Failed to load resources:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id) => {
    setLoadingResource(true);
    try {
      const { data } = await getResourceById(id);
      setSelectedResource(data);
    } catch (err) {
      console.error("Failed to load resource:", err);
    } finally {
      setLoadingResource(false);
    }
  };

  const filtered =
    activeCategory === "All"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Health Resources</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Browse our curated library of health information articles covering
          common diseases, prevention, and healthy living.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary-600 text-white shadow-sm"
                : "bg-white/10 border border-white/20 text-gray-400 hover:bg-white/15"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onRead={handleRead}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedResource && (
        <ResourceModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}

      {loadingResource && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}
    </div>
  );
}
