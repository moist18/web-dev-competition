import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

import { 
  Camera, Sparkles, ArrowRight, Flame, TrendingUp, 
  Utensils, Zap, Target, Award, ChevronRight 
} from 'lucide-react';
import { motion } from 'motion/react';

export function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Safely extract user data with fallbacks
  const username = user?.username || 'User';
  
  // Mock data
  const caloriesConsumed = 1250;
  const caloriesTarget = 2000;
  const progress = (caloriesConsumed / caloriesTarget) * 100;
  const caloriesRemaining = caloriesTarget - caloriesConsumed;

  const macros = [
    { label: 'Protein', value: 45, target: 100, unit: 'g', color: 'from-red-400 to-rose-500', emoji: '💪' },
    { label: 'Carbs', value: 120, target: 250, unit: 'g', color: 'from-yellow-400 to-amber-500', emoji: '🌾' },
    { label: 'Fat', value: 35, target: 65, unit: 'g', color: 'from-purple-400 to-violet-500', emoji: '🥑' },
  ];

  const todaysMeals = [
    { name: 'Avocado Toast', calories: 320, time: '07:30', emoji: '🥑', type: 'Breakfast' },
    { name: 'Grilled Chicken', calories: 450, time: '12:15', emoji: '🍗', type: 'Lunch' },
    { name: 'Greek Yogurt', calories: 180, time: '15:00', emoji: '🥛', type: 'Snack' },
    { name: 'Salmon Bowl', calories: 380, time: '18:30', emoji: '🐟', type: 'Dinner' },
  ];

  const stats = [
    { label: 'Streak', value: '15', unit: 'days', icon: '🔥', color: 'from-orange-400 to-red-500' },
    { label: 'Meals', value: '127', unit: 'logged', icon: '🍽️', color: 'from-green-400 to-emerald-500' },
    { label: 'Goal', value: '94', unit: '%', icon: '🎯', color: 'from-blue-400 to-indigo-500' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pb-8 md:pb-0">
      {/* Hero Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 pb-12"
      >
        {/* Animated pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`
          }} />
        </div>

        {/* Floating decorative circles */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
        />
        
        <div className="relative px-6 pt-12 pb-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-emerald-100 text-sm font-semibold mb-1">Welcome back,</p>
                <h1 className="text-4xl font-black text-white" style={{ fontFamily: 'Poppins' }}>
                  {String(username)}! 👋
                </h1>
              </div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Sparkles className="w-8 h-8 text-white" strokeWidth={2.5} />
              </motion.div>
            </div>
            
            <p className="text-emerald-50 text-base font-medium mt-4">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#f0fdfa" 
              fillOpacity="1" 
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="px-6 -mt-6 max-w-7xl mx-auto space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Left Column */}
          <div className="md:col-span-8 space-y-6">
            {/* Quick Stats */}
        <motion.div variants={item} className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 text-white shadow-xl relative overflow-hidden`}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"
              />
              <p className="text-3xl mb-1">{stat.icon}</p>
              <p className="text-2xl font-black mb-0.5" style={{ fontFamily: 'Poppins' }}>
                {stat.value}
              </p>
              <p className="text-xs text-white/80 font-semibold">{stat.unit}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Calorie Tracker Card */}
        <motion.div 
          variants={item}
          className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-6 shadow-2xl border border-white/60 relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-400/20 via-red-400/20 to-transparent rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Poppins' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Flame size={24} className="text-white" strokeWidth={2.5} />
                </div>
                Calories Today
              </h3>
            </div>
            
            {/* Circular Progress */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                    className="opacity-30"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 352" }}
                    animate={{ 
                      strokeDasharray: `${(progress / 100) * 352} 352` 
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-black text-gray-900" style={{ fontFamily: 'Poppins' }}>
                    {Math.round(progress)}%
                  </p>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-600">Consumed</span>
                  <span className="text-lg font-black text-orange-600" style={{ fontFamily: 'Poppins' }}>
                    {caloriesConsumed}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-600">Target</span>
                  <span className="text-lg font-black text-gray-900" style={{ fontFamily: 'Poppins' }}>
                    {caloriesTarget}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t-2 border-gray-200">
                  <span className="text-sm font-bold text-gray-600">Remaining</span>
                  <span className="text-lg font-black text-green-600" style={{ fontFamily: 'Poppins' }}>
                    {caloriesRemaining}
                  </span>
                </div>
              </div>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-3">
              {macros.map((macro) => {
                const macroProgress = (macro.value / macro.target) * 100;
                return (
                  <motion.div
                    key={macro.label}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-200"
                  >
                    <p className="text-xl mb-1">{macro.emoji}</p>
                    <p className="text-xs font-bold text-gray-600 mb-2">{macro.label}</p>
                    <p className="text-lg font-black text-gray-900 mb-1" style={{ fontFamily: 'Poppins' }}>
                      {macro.value}<span className="text-xs text-gray-500">/{macro.target}{macro.unit}</span>
                    </p>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${macroProgress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${macro.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="grid grid-cols-2 gap-4">
          <motion.button
            onClick={() => navigate('/scan-barcode')}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.97 }}
            className="relative h-28 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-5 text-white shadow-xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-start h-full">
              <Camera size={28} strokeWidth={2.5} className="mb-2" />
              <p className="font-bold text-lg">Scan Food</p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"
            />
          </motion.button>

          <motion.button
            onClick={() => navigate('/ai-detection')}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.97 }}
            className="relative h-28 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl p-5 text-white shadow-xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-start h-full">
              <Sparkles size={28} strokeWidth={2.5} className="mb-2" />
              <p className="font-bold text-lg">AI Detect</p>
            </div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Right Sidebar Column (Desktop) */}
      <div className="md:col-span-4 space-y-6">
        {/* Today's Meals */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Poppins' }}>
              Today's Meals 🍽️
            </h3>
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => navigate('/history')}
              className="text-sm font-bold text-emerald-600 flex items-center gap-1"
            >
              View All
              <ChevronRight size={16} />
            </motion.button>
          </div>

          <div className="space-y-3">
            {todaysMeals.map((meal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => navigate('/food-detail')}
                className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/60 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {meal.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900">{meal.name}</h4>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                        {meal.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Flame size={16} className="text-orange-500" />
                      <p className="text-xl font-black text-orange-600" style={{ fontFamily: 'Poppins' }}>
                        {meal.calories}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 font-semibold">kcal</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1 group-hover:text-emerald-500 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Motivational Card */}
        <motion.div
          variants={item}
          className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Award size={24} strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-bold text-lg">Great Progress!</p>
                <p className="text-sm text-emerald-50">Keep up the good work</p>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed">
              You're doing amazing! You've maintained your streak for 15 days. 
              Keep tracking your meals to reach your goals! 🎯
            </p>
          </div>
        </motion.div>
      </div>
    </div>
    </motion.div>
  </div>
  );
}