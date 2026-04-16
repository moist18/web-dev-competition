import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Minus, Plus, Save, Flame, AlertTriangle, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export function ReportPage() {
  const navigate = useNavigate();
  const [mealTime, setMealTime] = useState('siang');
  const [portion, setPortion] = useState(1.0);

  // Mock product data from barcode scan
  const product = {
    name: 'Ultra Milk Full Cream',
    brand: 'Ultra Milk',
    category: 'Minuman',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800',
    servingSize: '200ml',
    nutrition: {
      calories: 130,
      protein: 6.4,
      carbs: 9.6,
      totalFat: 6.8,
      saturatedFat: 4.2,
      sugar: 9.6,
      salt: 0.1,
      fiber: 0,
    },
    allergens: {
      milk: true,
      gluten: false,
      nuts: false,
    },
    ingredients: 'Susu Segar, Vitamin D, Vitamin B2',
  };

  const totalCalories = Math.round(product.nutrition.calories * portion);
  const totalProtein = Math.round(product.nutrition.protein * portion * 10) / 10;
  const totalCarbs = Math.round(product.nutrition.carbs * portion * 10) / 10;
  const totalFat = Math.round(product.nutrition.totalFat * portion * 10) / 10;

  const handleSave = () => {
    alert('Product successfully saved to history! 🎉');
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-[#F1F8F4] to-[#C8E6C9]">
      {/* Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500" />
        <div className="relative px-6 py-6 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/home')}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all shadow-lg"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </motion.button>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
            Product Details
          </h1>
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="px-6 py-8 space-y-6"
      >
        {/* Product Image */}
        <motion.div 
          variants={item}
          className="relative overflow-hidden rounded-3xl shadow-2xl"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-black text-white drop-shadow-lg mb-2" 
              style={{ fontFamily: 'Poppins' }}
            >
              {product.name}
            </motion.h2>
            <p className="text-white/90 font-semibold">{product.brand}</p>
            <p className="text-white/80 text-sm">{product.category}</p>
          </div>
        </motion.div>

        {/* Nutrition Macro Cards */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3">
          {nutrients.map((nutrient, index) => (
            <motion.div
              key={nutrient.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
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
        </motion.div>

        {/* Detailed Nutrition */}
        <motion.div 
          variants={item}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50"
        >
          <h3 className="text-xl font-bold text-blue-800 mb-5 flex items-center gap-2" style={{ fontFamily: 'Poppins' }}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Flame size={20} className="text-white" />
            </div>
            Nutrition Facts
          </h3>

          <p className="text-sm text-gray-600 font-semibold mb-4">Per {product.servingSize}</p>

          <div className="space-y-2">
            {[
              { label: 'Saturated Fat', value: product.nutrition.saturatedFat, unit: 'g', icon: '🧈' },
              { label: 'Sugar', value: product.nutrition.sugar, unit: 'g', icon: '🍬' },
              { label: 'Salt', value: product.nutrition.salt, unit: 'g', icon: '🧂' },
              { label: 'Fiber', value: product.nutrition.fiber, unit: 'g', icon: '🌾' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
              >
                <span className="flex items-center gap-2 text-gray-700 font-medium">
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </span>
                <span className="font-bold text-blue-600">
                  {item.value} {item.unit}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Allergen Warning */}
        <motion.div 
          variants={item}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50"
        >
          <h3 className="text-xl font-bold text-orange-800 mb-5 flex items-center gap-2" style={{ fontFamily: 'Poppins' }}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <AlertTriangle size={20} className="text-white" />
            </div>
            Allergen Information
          </h3>

          <div className="space-y-3">
            {[
              { key: 'milk', label: 'Contains Milk', checked: product.allergens.milk },
              { key: 'gluten', label: 'Contains Gluten', checked: product.allergens.gluten },
              { key: 'nuts', label: 'Contains Nuts', checked: product.allergens.nuts },
            ].map((allergen) => (
              <motion.label
                key={allergen.key}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`flex items-center gap-3 py-3 px-4 rounded-2xl cursor-pointer transition-all ${
                  allergen.checked
                    ? 'bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={allergen.checked}
                  readOnly
                  className="w-5 h-5 accent-orange-500 cursor-pointer"
                />
                <span className={`font-semibold ${allergen.checked ? 'text-orange-700' : 'text-gray-500'}`}>
                  {allergen.label}
                </span>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Ingredients */}
        <motion.div 
          variants={item}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50"
        >
          <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins' }}>
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText size={20} className="text-white" />
            </div>
            Ingredients
          </h3>
          <p className="text-gray-700 leading-relaxed bg-green-50 p-4 rounded-2xl border border-green-200">
            {product.ingredients}
          </p>
        </motion.div>

        {/* Meal Time Selection */}
        <motion.div 
          variants={item}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50"
        >
          <h3 className="text-xl font-bold text-blue-800 mb-5" style={{ fontFamily: 'Poppins' }}>
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
          variants={item}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50"
        >
          <h3 className="text-xl font-bold text-blue-800 mb-5" style={{ fontFamily: 'Poppins' }}>
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
              <p className="text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text" style={{ fontFamily: 'Poppins' }}>
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
          variants={item}
          onClick={handleSave}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-16 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-bold rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all shadow-xl shadow-blue-500/40 hover:shadow-2xl flex items-center justify-center gap-2 group"
        >
          <Save size={24} className="group-hover:scale-110 transition-transform" />
          Save to History
        </motion.button>
      </motion.div>
    </div>
  );
}
