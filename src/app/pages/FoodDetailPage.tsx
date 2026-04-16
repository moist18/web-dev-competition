import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Minus, Plus, Save, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export function FoodDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const foodData = location.state?.foodData;

  const [mealTime, setMealTime] = useState('malam');
  const [portion, setPortion] = useState(1.0);

  if (!foodData) {
    navigate('/home');
    return null;
  }

  const totalCalories = Math.round(foodData.calories * portion);
  const totalProtein = Math.round(foodData.protein * portion * 10) / 10;
  const totalCarbs = Math.round(foodData.carbs * portion * 10) / 10;
  const totalFat = Math.round(foodData.fat * portion * 10) / 10;

  const handleSave = () => {
    alert('Food successfully saved to history! 🎉');
    navigate('/home');
  };

  const mealTimes = [
    { value: 'sarapan', label: 'Breakfast', emoji: '🌅', gradient: 'from-amber-400 to-orange-500' },
    { value: 'siang', label: 'Lunch', emoji: '☀️', gradient: 'from-yellow-400 to-amber-500' },
    { value: 'malam', label: 'Dinner', emoji: '🌙', gradient: 'from-indigo-400 to-purple-500' },
    { value: 'snack', label: 'Snack', emoji: '🍪', gradient: 'from-pink-400 to-rose-500' },
  ];

  const nutrients = [
    { label: 'Calories', value: totalCalories, unit: 'kcal', icon: '🔥', color: 'from-orange-400 to-orange-500' },
    { label: 'Protein', value: totalProtein, unit: 'g', icon: '💪', color: 'from-red-400 to-red-500' },
    { label: 'Carbs', value: totalCarbs, unit: 'g', icon: '🌾', color: 'from-yellow-400 to-yellow-500' },
    { label: 'Fat', value: totalFat, unit: 'g', icon: '🧈', color: 'from-purple-400 to-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-[#F1F8F4] to-[#C8E6C9]">
      {/* Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-emerald-500" />
        <div className="relative px-6 py-6 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all shadow-lg"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </motion.button>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
            Food Details
          </h1>
        </div>
      </motion.div>

      <div className="px-6 py-8 space-y-6">
        {/* Food Image */}
        {foodData.image && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl"
          >
            <img
              src={foodData.image}
              alt={foodData.name}
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-black text-white drop-shadow-lg" 
                style={{ fontFamily: 'Poppins' }}
              >
                {foodData.name}
              </motion.h2>
            </div>
          </motion.div>
        )}

        {/* Nutrition Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50"
        >
          <h3 className="text-xl font-bold text-green-800 mb-5 flex items-center gap-2" style={{ fontFamily: 'Poppins' }}>
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Flame size={20} className="text-white" />
            </div>
            Nutritional Info
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {nutrients.map((nutrient, index) => (
              <motion.div
                key={nutrient.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className={`bg-gradient-to-br ${nutrient.color} rounded-2xl p-4 text-white shadow-lg`}
              >
                <p className="text-2xl mb-1">{nutrient.icon}</p>
                <p className="text-2xl font-black" style={{ fontFamily: 'Poppins' }}>
                  {nutrient.value}
                  <span className="text-sm ml-1 opacity-80">{nutrient.unit}</span>
                </p>
                <p className="text-xs text-white/80 font-semibold mt-1">{nutrient.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meal Time Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50"
        >
          <h3 className="text-xl font-bold text-green-800 mb-5" style={{ fontFamily: 'Poppins' }}>
            ⏰ Meal Time
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {mealTimes.map((time) => (
              <motion.button
                key={time.value}
                onClick={() => setMealTime(time.value)}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`relative overflow-hidden p-4 rounded-2xl font-bold transition-all shadow-lg ${
                  mealTime === time.value
                    ? 'shadow-xl'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {mealTime === time.value && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${time.gradient}`} />
                )}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <span className="text-3xl">{time.emoji}</span>
                  <span className={mealTime === time.value ? 'text-white' : 'text-gray-700'}>
                    {time.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Portion Control */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50"
        >
          <h3 className="text-xl font-bold text-green-800 mb-5" style={{ fontFamily: 'Poppins' }}>
            🍽️ Portion Size
          </h3>

          <div className="flex items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPortion(Math.max(0.5, portion - 0.5))}
              className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center text-white hover:from-red-500 hover:to-red-600 transition-all shadow-lg hover:shadow-xl"
            >
              <Minus size={24} strokeWidth={3} />
            </motion.button>

            <motion.div 
              className="min-w-[120px] text-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3 }}
              key={portion}
            >
              <p className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text" style={{ fontFamily: 'Poppins' }}>
                {portion.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 font-semibold mt-1">portions</p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPortion(portion + 0.5)}
              className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center text-white hover:from-green-500 hover:to-green-600 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus size={24} strokeWidth={3} />
            </motion.button>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={handleSave}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg font-bold rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-xl shadow-green-500/40 hover:shadow-2xl flex items-center justify-center gap-2 group"
        >
          <Save size={24} className="group-hover:scale-110 transition-transform" />
          Save to History
        </motion.button>
      </div>
    </div>
  );
}
