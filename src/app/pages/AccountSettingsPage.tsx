import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, User, Mail, Lock, Camera, Save, 
  Ruler, Weight, Target, Calendar, Bell, Globe,
  Palette, Trash2, Check, X, Eye, EyeOff, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AccountSettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Safely get user data
  const username = user?.username || 'User';
  const userEmail = user?.email || 'user@eatwise.com';

  // Profile states
  const [name, setName] = useState(username);
  const [email, setEmail] = useState(userEmail);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Health states
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [targetWeight, setTargetWeight] = useState(60);
  const [targetCalories, setTargetCalories] = useState(2000);

  // Preferences states
  const [notifications, setNotifications] = useState({
    mealReminder: true,
    dailyReport: true,
    achievements: true,
    marketing: false,
  });
  const [language, setLanguage] = useState('id');
  const [theme, setTheme] = useState('light');

  // UI states
  const [activeTab, setActiveTab] = useState('profile');
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, emoji: '👤' },
    { id: 'health', label: 'Health', icon: Target, emoji: '🎯' },
    { id: 'preferences', label: 'Preferences', icon: Bell, emoji: '⚙️' },
    { id: 'security', label: 'Security', icon: Shield, emoji: '🔒' },
  ];

  const handleSaveProfile = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }
    alert('Password changed successfully! 🎉');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordSection(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
      alert('Account deleted. We\'re sad to see you go! 😢');
      navigate('/login');
    }
  };

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
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        
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
            Account Settings
          </h1>
        </div>
      </motion.div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSaveNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-24 left-6 right-6 z-50"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 shadow-2xl flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Check size={24} strokeWidth={3} />
              </div>
              <div className="flex-1">
                <p className="font-bold">Settings Saved!</p>
                <p className="text-sm text-white/90">Your changes have been saved successfully</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="px-6 pt-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/50">
          <div className="grid grid-cols-4 gap-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <span className="text-xl">{tab.emoji}</span>
                  <span className="text-xs">{tab.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="px-6 py-6 space-y-6"
      >
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <>
            {/* Avatar */}
            <motion.div 
              variants={item}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50"
            >
              <h3 className="text-xl font-bold text-purple-800 mb-5" style={{ fontFamily: 'Poppins' }}>
                Profile Photo
              </h3>

              <div className="flex items-center gap-6">
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 bg-gradient-to-br from-purple-400 to-fuchsia-500 rounded-[2rem] flex items-center justify-center shadow-xl"
                  >
                    <User size={48} className="text-white" strokeWidth={2} />
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg text-white"
                  >
                    <Camera size={18} />
                  </motion.button>
                </div>

                <div className="flex-1">
                  <p className="font-bold text-gray-900 mb-1">Change Photo</p>
                  <p className="text-sm text-gray-600">JPG, PNG or GIF. Max size 2MB</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-3 px-4 py-2 bg-purple-100 text-purple-700 font-semibold rounded-xl hover:bg-purple-200 transition-colors"
                  >
                    Upload Photo
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Basic Info */}
            <motion.div 
              variants={item}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 space-y-5"
            >
              <h3 className="text-xl font-bold text-purple-800" style={{ fontFamily: 'Poppins' }}>
                Basic Information
              </h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all text-gray-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all text-gray-900 font-medium"
                  />
                </div>
              </div>

              <motion.button
                onClick={handleSaveProfile}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-lg font-bold rounded-2xl hover:from-purple-600 hover:to-fuchsia-600 transition-all shadow-xl shadow-purple-500/40 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save Changes
              </motion.button>
            </motion.div>
          </>
        )}

        {/* Health Tab */}
        {activeTab === 'health' && (
          <>
            <motion.div 
              variants={item}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 space-y-5"
            >
              <h3 className="text-xl font-bold text-purple-800 mb-2" style={{ fontFamily: 'Poppins' }}>
                Health Metrics
              </h3>
              <p className="text-sm text-gray-600">Update your health information for accurate tracking</p>

              <div className="grid grid-cols-2 gap-4">
                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age (years)
                  </label>
                  <div className="relative">
                    <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full h-14 pl-12 pr-4 rounded-2xl bg-blue-50 border-2 border-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-400 transition-all text-gray-900 font-bold text-center"
                    />
                  </div>
                </div>

                {/* Height */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <div className="relative">
                    <Ruler size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400" />
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full h-14 pl-12 pr-4 rounded-2xl bg-green-50 border-2 border-green-200 focus:outline-none focus:ring-4 focus:ring-green-300/50 focus:border-green-400 transition-all text-gray-900 font-bold text-center"
                    />
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Weight (kg)
                  </label>
                  <div className="relative">
                    <Weight size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" />
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full h-14 pl-12 pr-4 rounded-2xl bg-orange-50 border-2 border-orange-200 focus:outline-none focus:ring-4 focus:ring-orange-300/50 focus:border-orange-400 transition-all text-gray-900 font-bold text-center"
                    />
                  </div>
                </div>

                {/* Target Weight */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Weight (kg)
                  </label>
                  <div className="relative">
                    <Target size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
                    <input
                      type="number"
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(Number(e.target.value))}
                      className="w-full h-14 pl-12 pr-4 rounded-2xl bg-purple-50 border-2 border-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all text-gray-900 font-bold text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Target Calories */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Daily Calorie Target (kcal)
                </label>
                <input
                  type="range"
                  min="1000"
                  max="4000"
                  step="100"
                  value={targetCalories}
                  onChange={(e) => setTargetCalories(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-green-200 to-green-400 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="mt-2 text-center">
                  <span className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text" style={{ fontFamily: 'Poppins' }}>
                    {targetCalories}
                  </span>
                  <span className="text-gray-600 ml-2">kcal/day</span>
                </div>
              </div>

              <motion.button
                onClick={handleSaveProfile}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-lg font-bold rounded-2xl hover:from-purple-600 hover:to-fuchsia-600 transition-all shadow-xl shadow-purple-500/40 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save Health Settings
              </motion.button>
            </motion.div>

            {/* BMI Indicator */}
            <motion.div 
              variants={item}
              className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-6 shadow-xl text-white"
            >
              <h4 className="text-lg font-bold mb-3">Your BMI</h4>
              <div className="flex items-end gap-3">
                <p className="text-5xl font-black" style={{ fontFamily: 'Poppins' }}>
                  {(weight / ((height / 100) ** 2)).toFixed(1)}
                </p>
                <p className="text-white/80 pb-2">Normal Range</p>
              </div>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </motion.div>
          </>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <>
            {/* Notifications */}
            <motion.div 
              variants={item}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 space-y-4"
            >
              <h3 className="text-xl font-bold text-purple-800 mb-2" style={{ fontFamily: 'Poppins' }}>
                Notifications
              </h3>

              {[
                { key: 'mealReminder', label: 'Meal Reminders', desc: 'Get notified when it\'s time to eat', emoji: '🍽️' },
                { key: 'dailyReport', label: 'Daily Reports', desc: 'Daily summary of your nutrition', emoji: '📊' },
                { key: 'achievements', label: 'Achievements', desc: 'Celebrate your milestones', emoji: '🏆' },
                { key: 'marketing', label: 'Marketing', desc: 'Updates and promotional offers', emoji: '📢' },
              ].map((notif) => (
                <motion.div
                  key={notif.key}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{notif.emoji}</span>
                    <div>
                      <p className="font-bold text-gray-900">{notif.label}</p>
                      <p className="text-sm text-gray-600">{notif.desc}</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setNotifications({
                      ...notifications,
                      [notif.key]: !notifications[notif.key as keyof typeof notifications]
                    })}
                    className={`relative w-14 h-8 rounded-full transition-all ${
                      notifications[notif.key as keyof typeof notifications]
                        ? 'bg-gradient-to-r from-green-400 to-green-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{
                        x: notifications[notif.key as keyof typeof notifications] ? 24 : 2
                      }}
                      className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                    />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>

            {/* Language & Theme */}
            <motion.div 
              variants={item}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 space-y-5"
            >
              <h3 className="text-xl font-bold text-purple-800" style={{ fontFamily: 'Poppins' }}>
                Appearance
              </h3>

              {/* Language */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  🌍 Language
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
                    { value: 'en', label: 'English', flag: '🇬🇧' },
                  ].map((lang) => (
                    <motion.button
                      key={lang.value}
                      onClick={() => setLanguage(lang.value)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-2xl font-semibold transition-all ${
                        language === lang.value
                          ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{lang.flag}</span>
                      {lang.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  🎨 Theme
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'light', label: 'Light', emoji: '☀️' },
                    { value: 'dark', label: 'Dark', emoji: '🌙' },
                  ].map((themeOption) => (
                    <motion.button
                      key={themeOption.value}
                      onClick={() => setTheme(themeOption.value)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-2xl font-semibold transition-all ${
                        theme === themeOption.value
                          ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{themeOption.emoji}</span>
                      {themeOption.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <>
            {/* Change Password */}
            <motion.div 
              variants={item}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 space-y-5"
            >
              <h3 className="text-xl font-bold text-purple-800" style={{ fontFamily: 'Poppins' }}>
                Change Password
              </h3>

              <AnimatePresence mode="wait">
                {!showPasswordSection ? (
                  <motion.button
                    key="show-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowPasswordSection(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-14 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Lock size={20} />
                    Change Password
                  </motion.button>
                ) : (
                  <motion.div
                    key="password-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full h-14 pl-12 pr-12 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all text-gray-900 font-medium"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full h-14 pl-12 pr-12 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all text-gray-900 font-medium"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all text-gray-900 font-medium"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => setShowPasswordSection(false)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 h-12 bg-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                      >
                        <X size={20} />
                        Cancel
                      </motion.button>
                      <motion.button
                        onClick={handleChangePassword}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <Check size={20} />
                        Update
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Security Tips */}
            <motion.div 
              variants={item}
              className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl p-6 shadow-xl text-white"
            >
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Lock size={18} />
                </div>
                Security Tips
              </h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Use a strong password with at least 8 characters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Don't share your password with anyone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Change your password regularly</span>
                </li>
              </ul>
            </motion.div>

            {/* Delete Account */}
            <motion.div 
              variants={item}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-red-200"
            >
              <h3 className="text-xl font-bold text-red-600 mb-2" style={{ fontFamily: 'Poppins' }}>
                Danger Zone
              </h3>
              <p className="text-gray-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>

              <motion.button
                onClick={handleDeleteAccount}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold rounded-2xl hover:from-red-600 hover:to-rose-600 transition-all shadow-lg shadow-red-500/40 flex items-center justify-center gap-2"
              >
                <Trash2 size={20} />
                Delete Account
              </motion.button>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}