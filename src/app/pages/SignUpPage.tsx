import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    await signup(username, email, password);
    navigate('/home');
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const floatingAnimation2 = {
    y: [0, -15, 0],
    rotate: [0, -5, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength();
  const strengthColor = passwordStrength < 50 ? 'bg-red-500' : passwordStrength < 75 ? 'bg-yellow-500' : 'bg-green-500';
  const strengthLabel = passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Good' : 'Strong';

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(217, 70, 239, 0.1) 0%, transparent 50%)`
        }} />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-[2rem] backdrop-blur-sm"
        style={{ rotate: 15 }}
      />
      <motion.div
        animate={floatingAnimation2}
        className="absolute top-40 left-16 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-fuchsia-400/20 rounded-[2.5rem] backdrop-blur-sm"
        style={{ rotate: -20 }}
      />
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
        className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-br from-fuchsia-400/20 to-pink-400/20 rounded-full backdrop-blur-sm"
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-[1.75rem] mb-4 shadow-2xl shadow-violet-500/40"
            >
              <Sparkles className="w-10 h-10 text-white" strokeWidth={2.5} />
            </motion.div>
            
            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 text-transparent bg-clip-text" style={{ fontFamily: 'Poppins' }}>
              Join EatWise
            </h1>
            <p className="text-gray-600 font-medium">
              Start your healthy journey today! 🌱
            </p>
          </motion.div>

          {/* Sign Up Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl shadow-violet-500/10 border border-white/60"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <label className="block text-sm font-bold text-gray-700 ml-1">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500 z-10 transition-transform group-hover:scale-110" size={20} strokeWidth={2.5} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    required
                    className="relative w-full h-14 pl-12 pr-4 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-gray-400 text-gray-900 font-medium hover:border-violet-300"
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <label className="block text-sm font-bold text-gray-700 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500 z-10 transition-transform group-hover:scale-110" size={20} strokeWidth={2.5} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="relative w-full h-14 pl-12 pr-4 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-gray-400 text-gray-900 font-medium hover:border-violet-300"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <label className="block text-sm font-bold text-gray-700 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500 z-10 transition-transform group-hover:scale-110" size={20} strokeWidth={2.5} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                    className="relative w-full h-14 pl-12 pr-12 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-gray-400 text-gray-900 font-medium hover:border-violet-300"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-500 transition-colors z-10"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </motion.button>
                </div>
                
                {/* Password Strength */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-1 mt-2"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-gray-600">Password Strength:</span>
                      <span className={passwordStrength < 50 ? 'text-red-600' : passwordStrength < 75 ? 'text-yellow-600' : 'text-green-600'}>
                        {strengthLabel}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength}%` }}
                        className={`h-full ${strengthColor} transition-all`}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Confirm Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-2"
              >
                <label className="block text-sm font-bold text-gray-700 ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500 z-10 transition-transform group-hover:scale-110" size={20} strokeWidth={2.5} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="relative w-full h-14 pl-12 pr-12 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-gray-400 text-gray-900 font-medium hover:border-violet-300"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-500 transition-colors z-10"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </motion.button>
                </div>
                
                {confirmPassword && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 mt-2"
                  >
                    {password === confirmPassword ? (
                      <>
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" strokeWidth={3} />
                        </div>
                        <span className="text-xs font-semibold text-green-600">Passwords match!</span>
                      </>
                    ) : (
                      <span className="text-xs font-semibold text-red-600">Passwords do not match</span>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Terms & Conditions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-5 h-5 rounded-lg border-2 border-gray-300 text-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all cursor-pointer"
                    />
                  </div>
                  <span className="text-sm text-gray-600 leading-tight">
                    I agree to the{' '}
                    <button type="button" className="font-bold text-violet-600 hover:text-violet-700 hover:underline">
                      Terms & Conditions
                    </button>
                    {' '}and{' '}
                    <button type="button" className="font-bold text-violet-600 hover:text-violet-700 hover:underline">
                      Privacy Policy
                    </button>
                  </span>
                </label>
              </motion.div>

              {/* Sign Up Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold rounded-2xl overflow-hidden group shadow-xl shadow-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </>
                  )}
                </div>
              </motion.button>
            </form>
          </motion.div>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center mt-6"
          >
            <p className="text-gray-600 font-medium">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-bold text-violet-600 hover:text-violet-700 transition-colors hover:underline"
              >
                Sign In
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}