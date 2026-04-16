import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ScanLine, Flashlight, RotateCw, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function ScanBarcodePage() {
  const navigate = useNavigate();
  const [flashOn, setFlashOn] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleScanComplete = () => {
    setScanning(true);
    setTimeout(() => {
      navigate('/report', { state: { productId: '1' } });
    }, 1500);
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
            Scan Barcode
          </h1>
        </div>
      </motion.div>

      <div className="px-6 py-8 space-y-6">
        {/* Camera View */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-[2.5rem] shadow-2xl"
        >
          <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative flex items-center justify-center overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
            </div>

            {/* Scan area */}
            <motion.div 
              className="relative z-10 w-72 h-72"
              animate={{
                scale: scanning ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: scanning ? Infinity : 0,
              }}
            >
              <div className="w-full h-full border-4 border-white/80 rounded-3xl shadow-2xl backdrop-blur-sm bg-white/5 relative">
                {/* Corner decorations */}
                <div className="absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 border-blue-400 rounded-tl-2xl" />
                <div className="absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 border-blue-400 rounded-tr-2xl" />
                <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 border-blue-400 rounded-bl-2xl" />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 border-blue-400 rounded-br-2xl" />
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      rotate: scanning ? 360 : 0,
                      scale: scanning ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: scanning ? Infinity : 0, ease: "linear" },
                      scale: { duration: 1, repeat: scanning ? Infinity : 0 }
                    }}
                  >
                    <ScanLine size={64} className="text-blue-400" strokeWidth={2} />
                  </motion.div>
                </div>
                
                {/* Scanning line */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-lg shadow-blue-400/50"
                  animate={{
                    y: scanning ? [0, 280, 0] : 0,
                    opacity: scanning ? [0.5, 1, 0.5] : 0.8,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>

            {/* Flash indicator */}
            {flashOn && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-6 right-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-2xl font-bold shadow-xl flex items-center gap-2"
              >
                <Zap size={18} fill="currentColor" />
                Flash ON
              </motion.div>
            )}

            {/* Scanning status */}
            {scanning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold shadow-xl"
              >
                Scanning...
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 text-center"
        >
          <p className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Poppins' }}>
            📱 Position the barcode inside the frame
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Make sure the barcode is clear and well-lit
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setFlashOn(!flashOn)}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-xl ${
              flashOn
                ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 shadow-yellow-400/50'
                : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border-2 border-gray-200'
            }`}
          >
            <Flashlight size={28} strokeWidth={2.5} fill={flashOn ? 'currentColor' : 'none'} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-white/90 backdrop-blur-sm text-gray-700 rounded-2xl flex items-center justify-center shadow-xl hover:bg-white transition-all border-2 border-gray-200"
          >
            <RotateCw size={28} strokeWidth={2.5} />
          </motion.button>
        </motion.div>

        {/* Demo button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleScanComplete}
          disabled={scanning}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-16 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-bold rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all shadow-xl shadow-blue-500/40 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
        >
          {scanning ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <ScanLine size={24} />
              </motion.div>
              Processing...
            </>
          ) : (
            <>
              <ScanLine size={24} className="group-hover:scale-110 transition-transform" />
              Demo: Scan Product
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
