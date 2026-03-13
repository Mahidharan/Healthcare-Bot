import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Moon,
  Globe,
  Trash2,
  Save,
  CheckCircle,
  Key,
} from "lucide-react";

function SettingSection({ title, description, children }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
      <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-400 mb-5">{description}</p>
      )}
      {children}
    </div>
  );
}

function Toggle({ enabled, onChange, label }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-gray-300">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-primary-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    saveHistory: true,
    disclaimer: true,
    language: "en",
    apiKey: "",
  });
  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Customize your AI Healthcare Assistant experience.
        </p>
      </div>

      <div className="space-y-6">
        {/* API Configuration */}
        <SettingSection
          title="API Configuration"
          description="Configure your Groq API key for AI chat functionality."
        >
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Key className="w-4 h-4" />
              Groq API Key
            </label>
            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) => updateSetting("apiKey", e.target.value)}
              placeholder="Enter your Groq API key"
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400/50 transition-all placeholder-gray-500"
            />
            <p className="text-xs text-gray-400 mt-2">
              Your API key is stored securely and used to connect to the Groq AI
              service.
            </p>
          </div>
        </SettingSection>

        {/* Notifications */}
        <SettingSection
          title="Notifications"
          description="Manage your notification preferences."
        >
          <div className="divide-y divide-white/10">
            <Toggle
              label="Enable notifications"
              enabled={settings.notifications}
              onChange={(v) => updateSetting("notifications", v)}
            />
          </div>
        </SettingSection>

        {/* Appearance */}
        <SettingSection
          title="Appearance"
          description="Customize the look and feel of the application."
        >
          <div className="divide-y divide-white/10">
            <Toggle
              label="Dark mode"
              enabled={settings.darkMode}
              onChange={(v) => updateSetting("darkMode", v)}
            />
            <div className="py-3">
              <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                <Globe className="w-4 h-4" />
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => updateSetting("language", e.target.value)}
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400/50 transition-all"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </SettingSection>

        {/* Privacy */}
        <SettingSection
          title="Privacy & Data"
          description="Manage your data and privacy settings."
        >
          <div className="divide-y divide-white/10">
            <Toggle
              label="Save chat history"
              enabled={settings.saveHistory}
              onChange={(v) => updateSetting("saveHistory", v)}
            />
            <Toggle
              label="Show medical disclaimer"
              enabled={settings.disclaimer}
              onChange={(v) => updateSetting("disclaimer", v)}
            />
            <div className="py-4">
              <button className="text-red-500 text-sm font-medium flex items-center gap-2 hover:text-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
                Clear all chat history
              </button>
            </div>
          </div>
        </SettingSection>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
              saved
                ? "bg-secondary-100 text-secondary-700"
                : "bg-primary-600 text-white hover:bg-primary-700 shadow-sm"
            }`}
          >
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
