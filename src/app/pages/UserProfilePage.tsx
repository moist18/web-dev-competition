import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

import { 
  User, Mail, Calendar, Ruler, Weight, Target, LogOut, 
  ChevronRight, Edit3, Bell, Shield, Info, MessageCircle,
  Sparkles, TrendingUp, Award, Flame
} from 'lucide-react';
import { motion } from 'motion/react';

export function UserProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Safely get username
  const username = user?.username || 'User';

  // Mock user data
  const userProfile = {
    name: username,
    email: user?.email || 'user@eatwise.com',
    age: 25,
    height: 170,
    weight: 65,
    targetWeight: 60,
    targetCalories: 2000,
    joinDate: '2026-01-01',
    streakDays: 15,
    totalMeals: 127,
    achievements: 8,
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'Account Settings',
      items: [
        { icon: Edit3, label: 'Edit Profile', action: () => navigate('/account-settings'), color: 'from-blue-400 to-blue-500', emoji: '✏️' },
        { icon: Bell, label: 'Notifications', action: () => navigate('/account-settings'), color: 'from-yellow-400 to-amber-500', emoji: '🔔' },
        { icon: Shield, label: 'Privacy & Security', action: () => navigate('/account-settings'), color: 'from-green-400 to-emerald-500', emoji: '🔒' },
      ]
    },
    {
      title: 'Information',
      items: [
        { icon: Info, label: 'About EatWise', action: () => navigate('/about'), color: 'from-purple-400 to-violet-500', emoji: 'ℹ️' },
        { icon: MessageCircle, label: 'Contact Us', action: () => navigate('/contact'), color: 'from-pink-400 to-rose-500', emoji: '💬' },
      ]
    }
  ];

  const stats = [
    { label: 'Streak', value: userProfile.streakDays, unit: 'days', icon: Flame, emoji: '🔥', color: 'from-orange-400 to-red-500' },
    { label: 'Meals', value: userProfile.totalMeals, unit: 'total', icon: TrendingUp, emoji: '🍽️', color: 'from-green-400 to-emerald-500' },
    { label: 'Awards', value: userProfile.achievements, unit: 'earned', icon: Award, emoji: '🏆', color: 'from-yellow-400 to-amber-500' },
  ];

  const healthInfo = [
    { icon: Calendar, label: 'Age', value: `${userProfile.age} years`, color: 'blue', emoji: '🎂' },
    { icon: Ruler, label: 'Height', value: `${userProfile.height} cm`, color: 'green', emoji: '📏' },
    { icon: Weight, label: 'Weight', value: `${userProfile.weight} kg`, color: 'orange', emoji: '⚖️' },
    { icon: Target, label: 'Target', value: `${userProfile.targetWeight} kg`, color: 'purple', emoji: '🎯' },
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 pb-24">
      {/* Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-pink-500 to-fuchsia-500 pb-16"
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-flex items-center justify-center w-28 h-28 bg-white/20 backdrop-blur-md rounded-[2rem] mb-4 shadow-2xl border-4 border-white/40"
            >
              <User size={56} className="text-white" strokeWidth={2} />
            </motion.div>
            
            <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Poppins' }}>
              {String(userProfile.name)}
            </h1>
            <p className="text-pink-100 text-base font-medium flex items-center justify-center gap-2">
              <Mail size={16} />
              {String(userProfile.email)}
            </p>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#fdf2f8" 
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
        className="px-6 -mt-10 space-y-6"
      >
        {/* Stats Cards */}
        <motion.div variants={item} className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 text-white shadow-xl relative overflow-hidden`}
              >
                <motion.div
                  animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"
                />
                <div className="relative z-10">
                  <p className="text-3xl mb-2">{stat.emoji}</p>
                  <p className="text-2xl font-black mb-1" style={{ fontFamily: 'Poppins' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/80 font-semibold">{stat.unit}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Health Info */}
        <motion.div 
          variants={item}
          className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/60"
        >
          <h3 className="text-2xl font-black text-pink-800 mb-5 flex items-center gap-2" style={{ fontFamily: 'Poppins' }}>
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Target size={24} className="text-white" strokeWidth={2.5} />
            </div>
            Health Profile
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {healthInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className={`bg-gradient-to-br from-${info.color}-50 to-${info.color}-100 rounded-2xl p-4 border-2 border-${info.color}-200 relative overflow-hidden`}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    className={`absolute -bottom-2 -right-2 w-16 h-16 bg-${info.color}-200/30 rounded-full blur-xl`}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={20} className={`text-${info.color}-600`} strokeWidth={2.5} />
                      <span className="text-2xl">{info.emoji}</span>
                    </div>
                    <p className={`text-xl font-black text-${info.color}-800 mb-1`} style={{ fontFamily: 'Poppins' }}>
                      {info.value}
                    </p>
                    <p className="text-xs text-gray-600 font-bold">{info.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Target Calories */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden"
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
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Sparkles size={28} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm text-pink-100 font-semibold">Daily Target</p>
                  <p className="text-3xl font-black" style={{ fontFamily: 'Poppins' }}>
                    {userProfile.targetCalories}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-pink-100 font-semibold">kcal</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <motion.div 
            key={section.title}
            variants={item}
            className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/60"
          >
            <h3 className="text-lg font-black text-gray-900 mb-4" style={{ fontFamily: 'Poppins' }}>
              {section.title}
            </h3>

            <div className="space-y-2">
              {section.items.map((menuItem, index) => {
                const Icon = menuItem.icon;
                return (
                  <motion.button
                    key={menuItem.label}
                    onClick={menuItem.action}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all group border-2 border-gray-100 hover:border-gray-200 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className={`relative z-10 w-14 h-14 bg-gradient-to-br ${menuItem.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl">{menuItem.emoji}</span>
                    </div>
                    <p className="relative z-10 flex-1 text-left font-bold text-gray-800 group-hover:text-gray-900">
                      {menuItem.label}
                    </p>
                    <ChevronRight size={20} className="relative z-10 text-gray-400 group-hover:translate-x-2 group-hover:text-pink-500 transition-all" strokeWidth={2.5} />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.button
          variants={item}
          onClick={handleLogout}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-16 bg-gradient-to-r from-red-500 to-rose-500 text-white text-lg font-bold rounded-2xl hover:from-red-600 hover:to-rose-600 transition-all shadow-2xl shadow-red-500/40 hover:shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <LogOut size={24} className="relative z-10 group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
          <span className="relative z-10">Logout</span>
        </motion.button>

        {/* Footer Info */}
        <motion.div 
          variants={item}
          className="text-center py-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/60"
          >
            <p className="font-bold text-gray-800 mb-1">
              Member since {new Date(userProfile.joinDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </p>
            <p className="text-sm text-gray-600 font-medium">
              EatWise v2.0 - Your Health Companion 🌱
            </p>
          </motion.div>
        </motion.div>
      </motion.div>


    </div>
  );
}