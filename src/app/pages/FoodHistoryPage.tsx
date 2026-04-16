import { useState } from 'react';
import { useNavigate } from 'react-router';

import { 
  Calendar, Filter, TrendingUp, Search, Flame, ChevronRight, 
  TrendingDown, BarChart3, Sparkles, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FoodHistoryPage() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const historyData = [
    {
      date: '2026-03-01',
      meals: [
        { name: 'Avocado Toast', calories: 320, time: '07:30', type: 'sarapan', emoji: '🥑', protein: 12, carbs: 35, fat: 18 },
        { name: 'Grilled Chicken', calories: 450, time: '12:00', type: 'siang', emoji: '🍗', protein: 45, carbs: 20, fat: 22 },
        { name: 'Greek Yogurt', calories: 180, time: '15:00', type: 'snack', emoji: '🥛', protein: 15, carbs: 20, fat: 6 },
        { name: 'Salmon Bowl', calories: 380, time: '18:30', type: 'malam', emoji: '🐟', protein: 38, carbs: 32, fat: 16 },
      ],
      totalCalories: 1330,
    },
    {
      date: '2026-02-29',
      meals: [
        { name: 'Protein Smoothie', calories: 280, time: '07:00', type: 'sarapan', emoji: '🥤', protein: 25, carbs: 35, fat: 8 },
        { name: 'Caesar Salad', calories: 350, time: '12:30', type: 'siang', emoji: '🥗', protein: 20, carbs: 25, fat: 18 },
        { name: 'Quinoa Bowl', calories: 420, time: '18:00', type: 'malam', emoji: '🍲', protein: 18, carbs: 58, fat: 14 },
      ],
      totalCalories: 1050,
    },
    {
      date: '2026-02-28',
      meals: [
        { name: 'Oatmeal & Berries', calories: 280, time: '08:00', type: 'sarapan', emoji: '🥣', protein: 10, carbs: 48, fat: 6 },
        { name: 'Turkey Sandwich', calories: 380, time: '13:00', type: 'siang', emoji: '🥪', protein: 28, carbs: 42, fat: 12 },
        { name: 'Stir Fry Veggies', calories: 320, time: '19:00', type: 'malam', emoji: '🥘', protein: 15, carbs: 38, fat: 14 },
      ],
      totalCalories: 980,
    },
  ];

  const filters = [
    { value: 'all', label: 'All Meals', emoji: '📊', gradient: 'from-gray-400 to-gray-500' },
    { value: 'sarapan', label: 'Breakfast', emoji: '🌅', gradient: 'from-amber-400 to-orange-500' },
    { value: 'siang', label: 'Lunch', emoji: '☀️', gradient: 'from-yellow-400 to-amber-500' },
    { value: 'malam', label: 'Dinner', emoji: '🌙', gradient: 'from-indigo-400 to-purple-500' },
    { value: 'snack', label: 'Snacks', emoji: '🍪', gradient: 'from-pink-400 to-rose-500' },
  ];

  const filteredHistory = historyData.map(day => ({
    ...day,
    meals: day.meals.filter(meal => 
      (selectedFilter === 'all' || meal.type === selectedFilter) &&
      meal.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(day => day.meals.length > 0);

  const totalCaloriesAllTime = historyData.reduce((sum, day) => sum + day.totalCalories, 0);
  const averageCaloriesPerDay = Math.round(totalCaloriesAllTime / historyData.length);
  const daysTracked = historyData.length;

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-24">
      {/* Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 pb-12"
      >
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`
          }} />
        </div>

        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        
        <div className="relative px-6 pt-12 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Poppins' }}>
              Food History
            </h1>
            <p className="text-indigo-100 text-base font-medium">
              Track your nutritional journey 📊
            </p>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#eff6ff" 
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
        className="px-6 -mt-6 space-y-6"
      >
        {/* Summary Stats */}
        <motion.div variants={item} className="grid grid-cols-3 gap-3">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-4 text-white shadow-xl relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"
            />
            <div className="relative z-10">
              <Flame size={24} className="mb-2" strokeWidth={2.5} />
              <p className="text-2xl font-black mb-0.5" style={{ fontFamily: 'Poppins' }}>
                {totalCaloriesAllTime}
              </p>
              <p className="text-xs text-white/80 font-semibold">Total kcal</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-4 text-white shadow-xl relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"
            />
            <div className="relative z-10">
              <TrendingUp size={24} className="mb-2" strokeWidth={2.5} />
              <p className="text-2xl font-black mb-0.5" style={{ fontFamily: 'Poppins' }}>
                {averageCaloriesPerDay}
              </p>
              <p className="text-xs text-white/80 font-semibold">Avg/day</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-4 text-white shadow-xl relative overflow-hidden"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"
            />
            <div className="relative z-10">
              <Calendar size={24} className="mb-2" strokeWidth={2.5} />
              <p className="text-2xl font-black mb-0.5" style={{ fontFamily: 'Poppins' }}>
                {daysTracked}
              </p>
              <p className="text-xs text-white/80 font-semibold">Days</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div variants={item} className="space-y-3">
          {/* Search */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10 transition-transform group-hover:scale-110" size={20} strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Search foods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full h-14 pl-12 pr-12 bg-white/90 backdrop-blur-xl border-2 border-white/60 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-lg placeholder:text-gray-400 text-gray-900 font-medium hover:border-blue-300"
            />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors z-10"
              >
                <X size={20} />
              </motion.button>
            )}
          </div>

          {/* Filter Toggle */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-12 bg-white/90 backdrop-blur-xl border-2 border-white/60 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-gray-700 font-bold hover:border-blue-300 transition-all"
          >
            <Filter size={20} strokeWidth={2.5} />
            <span>Filters</span>
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight size={20} className="rotate-90" />
            </motion.div>
          </motion.button>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {filters.map((filter) => (
                    <motion.button
                      key={filter.value}
                      onClick={() => setSelectedFilter(filter.value)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative h-20 rounded-2xl p-4 font-bold shadow-lg overflow-hidden ${
                        selectedFilter === filter.value
                          ? 'ring-4 ring-blue-500/40'
                          : ''
                      }`}
                    >
                      {selectedFilter === filter.value ? (
                        <div className={`absolute inset-0 bg-gradient-to-br ${filter.gradient}`} />
                      ) : (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-2 border-white/60" />
                      )}
                      <div className="relative z-10">
                        <span className="text-2xl block mb-1">{filter.emoji}</span>
                        <span className={selectedFilter === filter.value ? 'text-white text-sm' : 'text-gray-700 text-sm'}>
                          {filter.label}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* History List */}
        <AnimatePresence mode="popLayout">
          {filteredHistory.map((day, dayIndex) => (
            <motion.div
              key={day.date}
              variants={item}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: dayIndex * 0.1 }}
              className="space-y-4"
            >
              {/* Date Header */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-2.5 bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-white/60 shadow-lg"
                >
                  <p className="font-bold text-indigo-900 flex items-center gap-2 text-sm">
                    <Calendar size={16} strokeWidth={2.5} />
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </motion.div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
              </div>

              {/* Meals */}
              <div className="space-y-3">
                {day.meals.map((meal, mealIndex) => (
                  <motion.div
                    key={mealIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: mealIndex * 0.05 }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    onClick={() => navigate('/food-detail', { state: { foodData: meal } })}
                    className="bg-white/90 backdrop-blur-2xl rounded-2xl p-5 shadow-xl border-2 border-white/60 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
                  >
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
                          >
                            {meal.emoji}
                          </motion.div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg mb-1">{meal.name}</h4>
                            <p className="text-sm text-indigo-600 font-semibold">{meal.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="flex items-center gap-1.5 justify-end mb-1">
                              <Flame size={20} className="text-orange-500" strokeWidth={2.5} />
                              <p className="text-3xl font-black text-orange-600" style={{ fontFamily: 'Poppins' }}>
                                {meal.calories}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 font-bold">kcal</p>
                          </div>
                          <ChevronRight size={24} className="text-gray-400 group-hover:translate-x-2 group-hover:text-indigo-500 transition-all" strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* Macros */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-gradient-to-br from-red-100 to-rose-100 rounded-xl p-2.5 border border-red-200">
                          <p className="text-xs text-red-700 font-bold mb-1">Protein</p>
                          <p className="text-base font-black text-red-800" style={{ fontFamily: 'Poppins' }}>
                            {meal.protein}g
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-2.5 border border-yellow-200">
                          <p className="text-xs text-yellow-700 font-bold mb-1">Carbs</p>
                          <p className="text-base font-black text-yellow-800" style={{ fontFamily: 'Poppins' }}>
                            {meal.carbs}g
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl p-2.5 border border-purple-200">
                          <p className="text-xs text-purple-700 font-bold mb-1">Fat</p>
                          <p className="text-base font-black text-purple-800" style={{ fontFamily: 'Poppins' }}>
                            {meal.fat}g
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Day Total */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-5 text-white shadow-2xl relative overflow-hidden"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"
                />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <BarChart3 size={24} strokeWidth={2.5} />
                    </div>
                    <p className="font-bold text-lg">Daily Total</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame size={24} strokeWidth={2.5} />
                    <p className="text-3xl font-black" style={{ fontFamily: 'Poppins' }}>
                      {day.totalCalories}
                    </p>
                    <p className="text-sm opacity-80 font-semibold">kcal</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl mb-6"
            >
              🔍
            </motion.div>
            <h3 className="text-2xl font-black text-gray-800 mb-3" style={{ fontFamily: 'Poppins' }}>
              No Results Found
            </h3>
            <p className="text-gray-600 font-medium mb-6">
              Try adjusting your filters or search query
            </p>
            <motion.button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </motion.div>


    </div>
  );
}
