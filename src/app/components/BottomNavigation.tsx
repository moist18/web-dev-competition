import { useNavigate, useLocation } from 'react-router';
import { Home, History, BarChart3, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      path: '/home', 
      icon: Home, 
      label: 'Home',
      gradient: 'from-emerald-500 to-teal-500',
      emoji: '🏠'
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
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2"
    >
      <div className="max-w-md mx-auto relative">
        {/* Backdrop blur container */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/60" />
        
        {/* Navigation items */}
        <div className="relative flex items-center justify-around px-4 py-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex flex-col items-center gap-1 p-3 min-w-[70px]"
              >
                {/* Active Background */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30 
                      }}
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg`}
                    />
                  )}
                </AnimatePresence>

                {/* Icon Container */}
                <div className="relative z-10">
                  {isActive ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 15 
                      }}
                      className="text-3xl"
                    >
                      {item.emoji}
                    </motion.div>
                  ) : (
                    <Icon
                      size={24}
                      strokeWidth={2.5}
                      className={`transition-colors ${
                        isActive ? 'text-white' : 'text-gray-500'
                      }`}
                    />
                  )}
                </div>

                {/* Label */}
                <motion.span
                  animate={{
                    scale: isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : 0.7
                  }}
                  className={`relative z-10 text-xs font-bold transition-colors ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </motion.span>

                {/* Hover Effect */}
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10 rounded-2xl`}
                  />
                )}

                {/* Ripple Effect on Tap */}
                <motion.div
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl`}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Floating Action Button - Center */}
        <motion.div
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.2 
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.button
            onClick={() => navigate('/scan-barcode')}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9, rotate: -90 }}
            className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-2xl shadow-2xl shadow-emerald-500/50 flex items-center justify-center group overflow-hidden"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Icon */}
            <motion.div
              animate={{ 
                rotate: [0, 90, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2.5"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                <circle cx="12" cy="12" r="1" />
              </svg>
            </motion.div>

            {/* Pulse Effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-emerald-400 rounded-2xl"
            />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
