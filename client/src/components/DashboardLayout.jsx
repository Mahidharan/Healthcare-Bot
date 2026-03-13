import React, { useState, useRef } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Stethoscope,
  BookOpen,
  History,
  Settings,
  Heart,
  Menu,
  X,
  Bell,
  Search,
  Shield,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/chat", icon: MessageSquare, label: "AI Health Chat" },
  { to: "/symptom-checker", icon: Stethoscope, label: "Symptom Checker" },
  { to: "/resources", icon: BookOpen, label: "Health Resources" },
  { to: "/history", icon: History, label: "Chat History" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserTooltip, setShowUserTooltip] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const avatarRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAvatarEnter = () => {
    if (avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      setTooltipStyle({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setShowUserTooltip(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="flex h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0c4a6e]">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#1e293b] to-[#1e1b4b] border-r border-white/10 transform transition-transform duration-200 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-5 border-b border-white/10">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block leading-tight">
                    AI Healthcare
                  </span>
                  <span className="text-xs text-primary-600 font-medium">
                    Assistant
                  </span>
                </div>
              </Link>
              <button
                className="lg:hidden p-1 rounded-md hover:bg-white/10"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-gray-400 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {label}
                  {({ isActive }) =>
                    isActive && <ChevronRight className="w-4 h-4 ml-auto" />
                  }
                </NavLink>
              ))}
            </nav>

            {/* Disclaimer Card */}
            <div className="p-3">
              <div className="bg-amber-900/30 border border-amber-500/20 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-300/80 leading-relaxed">
                    This AI assistant provides general health information and
                    should not replace professional medical consultation.
                  </p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="p-3 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-16 bg-white/5 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-white/10"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5 text-gray-400" />
              </button>
              <div className="hidden sm:flex items-center bg-white/10 rounded-lg px-3 py-2 w-64">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search health topics..."
                  className="bg-transparent border-none outline-none text-sm text-gray-300 w-full placeholder-gray-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div
                ref={avatarRef}
                onMouseEnter={handleAvatarEnter}
                onMouseLeave={() => setShowUserTooltip(false)}
                className="w-8 h-8 rounded-full bg-primary-500/30 flex items-center justify-center cursor-default"
              >
                <span className="text-sm font-semibold text-primary-300">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>

      {/* User tooltip — rendered outside backdrop-blur context */}
      {showUserTooltip && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={tooltipStyle}
        >
          <div className="bg-[#0f172a] border border-white/20 rounded-xl shadow-2xl shadow-black/70 px-4 py-3 min-w-max">
            <p className="text-xs font-semibold text-white whitespace-nowrap">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">
              {user?.email || ""}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
