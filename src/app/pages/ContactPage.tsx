import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mail, MessageSquare, Send, Phone, MapPin, Clock, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ContactPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@eatwise.com',
      description: 'Send us an email anytime',
      color: 'from-blue-400 to-blue-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+62 812-3456-7890',
      description: 'Mon-Fri from 8am to 6pm',
      color: 'from-green-400 to-green-500'
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'Jakarta, Indonesia',
      description: 'Visit our office',
      color: 'from-purple-400 to-purple-500'
    }
  ];

  const socialMedia = [
    { name: 'Instagram', emoji: '📷', handle: '@eatwise.id' },
    { name: 'Twitter', emoji: '🐦', handle: '@eatwise' },
    { name: 'LinkedIn', emoji: '💼', handle: 'EatWise' },
    { name: 'Facebook', emoji: '👍', handle: 'EatWise.Official' }
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
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-500 to-indigo-500" />
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
            Contact Us
          </h1>
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="px-6 py-8 space-y-6"
      >
        {/* Hero */}
        <motion.div 
          variants={item}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl mb-4"
          >
            💬
          </motion.div>
          
          <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-3" style={{ fontFamily: 'Poppins' }}>
            Get in Touch
          </h2>
          
          <p className="text-gray-700 leading-relaxed">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div variants={item} className="space-y-3">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/50 flex items-center gap-4"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg">{info.title}</h4>
                  <p className="text-purple-600 font-semibold">{info.value}</p>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          variants={item}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50"
        >
          <h3 className="text-xl font-bold text-purple-800 mb-5 flex items-center gap-2" style={{ fontFamily: 'Poppins' }}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageSquare size={20} className="text-white" />
            </div>
            Send us a Message
          </h3>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
                >
                  <Check size={40} className="text-white" strokeWidth={3} />
                </motion.div>
                <h4 className="text-2xl font-bold text-green-600 mb-2" style={{ fontFamily: 'Poppins' }}>
                  Message Sent! 🎉
                </h4>
                <p className="text-gray-600">
                  We'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full h-12 px-4 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="w-full h-12 px-4 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What is this about?"
                    required
                    className="w-full h-12 px-4 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us more..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all placeholder:text-gray-400 text-gray-900 font-medium resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-xl shadow-purple-500/40 hover:shadow-2xl flex items-center justify-center gap-2 group"
                >
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  Send Message
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social Media */}
        <motion.div 
          variants={item}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50"
        >
          <h3 className="text-xl font-bold text-purple-800 mb-5 text-center" style={{ fontFamily: 'Poppins' }}>
            🌐 Follow Us
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {socialMedia.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 text-center border border-purple-200 cursor-pointer"
              >
                <p className="text-3xl mb-2">{social.emoji}</p>
                <p className="font-bold text-purple-800 text-sm">{social.name}</p>
                <p className="text-xs text-gray-600 mt-1">{social.handle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Operating Hours */}
        <motion.div 
          variants={item}
          className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 shadow-2xl text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold" style={{ fontFamily: 'Poppins' }}>
              Support Hours
            </h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Monday - Friday</span>
              <span>08:00 - 18:00 WIB</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Saturday</span>
              <span>09:00 - 15:00 WIB</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </motion.div>

        {/* FAQ Link */}
        <motion.div 
          variants={item}
          className="text-center py-4"
        >
          <p className="text-gray-600 font-medium">
            Looking for quick answers? Check our{' '}
            <span className="text-purple-600 font-bold">FAQ section</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
