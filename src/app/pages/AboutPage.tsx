import { useNavigate } from 'react-router';
import { ArrowLeft, Heart, Target, Users, Sparkles, Shield, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export function AboutPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: 'AI Food Detection',
      description: 'Advanced AI technology to detect and analyze your food instantly',
      color: 'from-purple-400 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Barcode Scanner',
      description: 'Quick and easy scanning for packaged foods',
      color: 'from-blue-400 to-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'Calorie Tracking',
      description: 'Comprehensive nutrition tracking for your daily meals',
      color: 'from-green-400 to-green-500'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your health data is secure and private',
      color: 'from-orange-400 to-orange-500'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Health First',
      description: 'We prioritize your health and wellbeing above all else',
      emoji: '❤️'
    },
    {
      icon: Target,
      title: 'Goal Oriented',
      description: 'Help you achieve your nutrition and fitness goals',
      emoji: '🎯'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive community for healthy living',
      emoji: '👥'
    }
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
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-emerald-500" />
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
            About EatWise
          </h1>
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="px-6 py-8 space-y-8"
      >
        {/* Hero Section */}
        <motion.div 
          variants={item}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl mb-4"
          >
            🌱
          </motion.div>
          
          <h2 className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text mb-4" style={{ fontFamily: 'Poppins' }}>
            Your Smart Nutrition Companion
          </h2>
          
          <p className="text-gray-700 leading-relaxed text-base">
            EatWise is an innovative food tracking application that combines AI technology with nutrition science to help you achieve your health goals. Track your meals, monitor calories, and maintain a balanced diet with ease.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div variants={item}>
          <h3 className="text-2xl font-bold text-green-800 mb-5 text-center" style={{ fontFamily: 'Poppins' }}>
            ✨ Key Features
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/50 flex items-start gap-4"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon size={28} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-green-900 text-lg mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div variants={item}>
          <h3 className="text-2xl font-bold text-green-800 mb-5 text-center" style={{ fontFamily: 'Poppins' }}>
            💎 Our Values
          </h3>
          
          <div className="space-y-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-4xl">{value.emoji}</div>
                    <h4 className="text-xl font-bold text-green-900" style={{ fontFamily: 'Poppins' }}>
                      {value.title}
                    </h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          variants={item}
          className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-8 shadow-2xl text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Poppins' }}>
            🎯 Our Mission
          </h3>
          <p className="text-lg leading-relaxed text-white/95">
            To empower individuals to make informed nutrition choices through innovative technology, helping them achieve their health and wellness goals while maintaining a balanced and enjoyable lifestyle.
          </p>
        </motion.div>

        {/* Technology Stack */}
        <motion.div 
          variants={item}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
        >
          <h3 className="text-2xl font-bold text-green-800 mb-5 text-center" style={{ fontFamily: 'Poppins' }}>
            🚀 Built With Modern Technology
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'React', emoji: '⚛️' },
              { name: 'TypeScript', emoji: '💙' },
              { name: 'Tailwind CSS', emoji: '🎨' },
              { name: 'AI/ML', emoji: '🤖' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 3 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center border border-green-200"
              >
                <p className="text-3xl mb-2">{tech.emoji}</p>
                <p className="font-bold text-green-800">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          variants={item}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { label: 'Users', value: '10K+', emoji: '👥' },
            { label: 'Meals Tracked', value: '500K+', emoji: '🍽️' },
            { label: 'Countries', value: '25+', emoji: '🌍' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50 text-center"
            >
              <p className="text-3xl mb-2">{stat.emoji}</p>
              <p className="text-2xl font-black text-green-600 mb-1" style={{ fontFamily: 'Poppins' }}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-600 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div 
          variants={item}
          className="text-center py-6"
        >
          <p className="text-gray-600 font-medium mb-2">
            Made with ❤️ for a healthier tomorrow
          </p>
          <p className="text-sm text-gray-500">
            © 2026 EatWise. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
