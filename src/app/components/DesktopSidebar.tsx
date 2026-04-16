import { useNavigate, useLocation } from 'react-router';
import { Home, History, BarChart3, User, LogOut, Camera, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export function DesktopSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { 
      path: '/home', 
      icon: Home, 
      label: 'Home',
      gradient: 'from-emerald-500 to-teal-500',
      emoji: '🏠'
    },
    { 
      path: '/scan-barcode', 
      icon: Camera, 
      label: 'Scan Food',
      gradient: 'from-blue-500 to-indigo-500',
      emoji: '📸'
    },
    { 
      path: '/ai-detection', 
      icon: Sparkles, 
      label: 'AI Detect',
      gradient: 'from-violet-500 to-purple-500',
      emoji: '✨'
    },
    { 
      path: '/history', 
      icon: History, 
      label: 'History',
      gradient: 'from-blue-500 to-indigo-500',
      emoji: '📊'
    },
    { 
      path: '/report', 
      icon: BarChart3, 
      label: 'Report',
      gradient: 'from-purple-500 to-pink-500',
      emoji: '📈'
    },
    { 
      path: '/profile', 
      icon: User, 
      label: 'Profile',
      gradient: 'from-orange-500 to-rose-500',
      emoji: '👤'
    },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 h-screen fixed left-0 top-0 z-40 shadow-xl overflow-y-auto">
      {/* Brand logo area */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
            <span className="text-white text-xl font-black font-['Poppins']">N</span>
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 font-['Poppins']">
            NutriAI
          </span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Menu</p>
        
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`relative w-full flex items-center gap-4 px-4 py-3 rounded-2xl group transition-all duration-300 ${
                isActive ? 'bg-emerald-50 shadow-md shadow-emerald-500/10' : 'hover:bg-gray-50'
              }`}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <motion.div 
                  layoutId="sidebarActiveIndicator"
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full bg-gradient-to-b ${item.gradient}`}
                />
              )}

              {/* Icon Container */}
              <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isActive 
                  ? `bg-gradient-to-br ${item.gradient} shadow-lg text-white` 
                  : 'bg-white text-gray-400 group-hover:text-gray-600 shadow-sm border border-gray-100'
              }`}>
                {isActive ? (
                  <span className="text-xl">{item.emoji}</span>
                ) : (
                  <Icon size={20} strokeWidth={isActive ? 3 : 2} className="transition-transform group-hover:scale-110" />
                )}
              </div>

              {/* Label */}
              <span className={`text-sm font-bold transition-colors ${
                isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'
              }`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-100">
        <motion.button
          onClick={logout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-colors font-semibold"
        >
          <LogOut size={20} className="opacity-80" />
          <span>Log Out</span>
        </motion.button>
      </div>
    </div>
  );
}
