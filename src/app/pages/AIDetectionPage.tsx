import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Camera, Image as ImageIcon, Sparkles, Brain,
  Zap, CheckCircle2, AlertCircle, ScanLine, X, ZoomIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getNutrition, formatClassName } from '../utils/foodNutrition';

const ROBOFLOW_API_URL = 'https://serverless.roboflow.com/multi-food-first-project/3';
const ROBOFLOW_API_KEY = 'xt5QAGb0sB3jv3iYuzGb';

interface DetectionResult {
  name: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function AIDetectionPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Camera modal state
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --------------------------------------------------------
  // Camera helpers
  // --------------------------------------------------------
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const openCamera = async () => {
    setCameraError(null);
    setCameraOpen(true);
  };

  // Start stream once modal is mounted and video element is ready
  useEffect(() => {
    if (!cameraOpen) return;

    let active = true;

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (!active) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err: any) {
        console.error('Camera error:', err);
        if (!active) return;
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setCameraError('Akses kamera ditolak. Izinkan kamera di pengaturan browser kamu dan coba lagi.');
        } else if (err.name === 'NotFoundError') {
          setCameraError('Tidak ada kamera yang ditemukan pada perangkat ini.');
        } else {
          setCameraError('Kamera tidak dapat diakses: ' + err.message);
        }
      }
    };

    // Small delay so the DOM mounts the video element first
    const timer = setTimeout(start, 100);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [cameraOpen]);

  const closeCamera = () => {
    stopCamera();
    setCameraOpen(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);

    // Get preview URL and raw base64
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const b64 = dataUrl.split(',')[1];

    setPreviewUrl(dataUrl);
    setImageBase64(b64);
    setDetectionResult(null);
    setError(null);

    closeCamera();
  };

  // --------------------------------------------------------
  // File upload helper
  // --------------------------------------------------------
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setDetectionResult(null);
    setPreviewUrl(URL.createObjectURL(file));
    try {
      setImageBase64(await fileToBase64(file));
    } catch {
      setError('Gagal membaca gambar. Coba gambar lain.');
    }
    // Reset so the same file can be picked again
    e.target.value = '';
  };

  // --------------------------------------------------------
  // Roboflow detection
  // --------------------------------------------------------
  const handleDetect = async () => {
    if (!imageBase64) return;
    setIsDetecting(true);
    setError(null);
    setDetectionResult(null);

    try {
      const response = await fetch(`${ROBOFLOW_API_URL}?api_key=${ROBOFLOW_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: imageBase64,
      });
      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const predictions: Array<{ class: string; confidence: number }> = data.predictions ?? [];

      if (predictions.length === 0) {
        setError('Tidak ada makanan yang terdeteksi. Coba foto dari sudut yang berbeda.');
        return;
      }

      const top = predictions.reduce((p, c) => c.confidence > p.confidence ? c : p);
      const nutrition = getNutrition(top.class);

      setDetectionResult({
        name: nutrition.displayName !== 'Makanan Tidak Dikenal' ? nutrition.displayName : formatClassName(top.class),
        confidence: Math.round(top.confidence * 1000) / 10,
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbs: nutrition.carbs,
        fat: nutrition.fat,
      });
    } catch (err) {
      console.error('Roboflow error:', err);
      setError('Gagal menghubungi server AI. Periksa koneksi internet kamu.');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleAddToHistory = () => {
    if (!detectionResult) return;
    navigate('/food-detail', {
      state: {
        foodData: {
          name: detectionResult.name,
          image: previewUrl,
          calories: detectionResult.calories,
          protein: detectionResult.protein,
          carbs: detectionResult.carbs,
          fat: detectionResult.fat,
        },
      },
    });
  };

  // --------------------------------------------------------
  // Render
  // --------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* ---- Camera Modal ---- */}
      <AnimatePresence>
        {cameraOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeCamera}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
              <X size={24} />
            </motion.button>

            <p className="text-white/60 text-sm absolute top-6 left-0 right-0 text-center font-medium tracking-wide uppercase z-10">
              Arahkan kamera ke makananmu
            </p>

            {cameraError ? (
              <div className="text-center px-8 space-y-4">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle size={40} className="text-red-400" />
                </div>
                <p className="text-white font-semibold text-lg" style={{ fontFamily: 'Poppins' }}>Kamera tidak tersedia</p>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">{cameraError}</p>
                <button
                  onClick={closeCamera}
                  className="mt-6 px-8 py-3 bg-white/20 text-white font-semibold rounded-2xl hover:bg-white/30 transition-colors"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <>
                {/* Video stream */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Scan frame overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 md:w-96 md:h-96 relative">
                    {/* Corner markers */}
                    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
                      <div
                        key={pos}
                        className={`absolute w-8 h-8 border-white border-4 ${
                          pos === 'top-left' ? 'top-0 left-0 border-r-0 border-b-0 rounded-tl-lg' :
                          pos === 'top-right' ? 'top-0 right-0 border-l-0 border-b-0 rounded-tr-lg' :
                          pos === 'bottom-left' ? 'bottom-0 left-0 border-r-0 border-t-0 rounded-bl-lg' :
                          'bottom-0 right-0 border-l-0 border-t-0 rounded-br-lg'
                        }`}
                      />
                    ))}
                    {/* Scanning line */}
                    <motion.div
                      initial={{ top: 0 }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                    />
                  </div>
                </div>

                {/* Capture button */}
                <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center gap-8">
                  {/* Gallery shortcut */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { closeCamera(); setTimeout(() => fileInputRef.current?.click(), 200); }}
                    className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <ImageIcon size={22} />
                  </motion.button>

                  {/* Main shutter */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={capturePhoto}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50 active:scale-95 transition-transform"
                  >
                    <div className="w-14 h-14 bg-white rounded-full border-2 border-gray-200" />
                  </motion.button>

                  {/* Zoom hint placeholder */}
                  <div className="w-12 h-12 bg-white/10 text-white/40 rounded-full flex items-center justify-center">
                    <ZoomIn size={20} />
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Header ---- */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100"
      >
        <div className="px-4 py-4 md:px-8 md:py-5 flex items-center gap-4 max-w-7xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')}
            className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
          </motion.button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Poppins' }}>
              <Brain className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              Deteksi Makanan
            </h1>
            <p className="text-gray-500 text-xs font-medium">Powered by Roboflow AI</p>
          </div>
        </div>
      </motion.div>

      {/* ---- Main Content ---- */}
      <div className="px-4 py-6 md:py-10 mx-auto max-w-md md:max-w-5xl">
        {/* Error Banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 shadow-sm mb-6"
            >
              <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm font-medium leading-relaxed">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">

          {/* Left: Image Preview */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-gray-100 overflow-hidden p-2 md:p-3"
          >
            <div className="aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-[24px] md:rounded-[32px] bg-gray-50 flex items-center justify-center relative overflow-hidden border border-gray-100">
              <AnimatePresence mode="wait">
                {previewUrl ? (
                  <motion.img
                    key="image"
                    src={previewUrl}
                    alt="Selected food"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  />
                ) : (
                  <motion.div
                    key="placeholder"
                    className="text-center px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-16 h-16 md:w-24 md:h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <ScanLine className="w-8 h-8 md:w-12 md:h-12 text-purple-600" />
                    </motion.div>
                    <p className="text-gray-900 font-semibold md:text-lg mb-1" style={{ fontFamily: 'Poppins' }}>Belum ada foto</p>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                      Ambil foto makananmu atau pilih dari galeri
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scanning Overlay */}
              {isDetecting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm z-10"
                >
                  <motion.div
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)] z-20"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="mb-4"
                    >
                      <Brain className="w-12 h-12 md:w-16 md:h-16 text-purple-300" />
                    </motion.div>
                    <p className="text-lg md:text-2xl font-bold" style={{ fontFamily: 'Poppins' }}>Menganalisis...</p>
                    <p className="text-sm text-gray-300 mt-1 font-medium">AI sedang bekerja</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: Actions & Results */}
          <div className="space-y-5 md:space-y-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <h2 className="hidden md:block text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins' }}>
                Deteksi Nutrisi Makanan
              </h2>
              <p className="hidden md:block text-gray-500 text-sm mb-5">
                Upload foto atau aktifkan kamera untuk mendeteksi kandungan gizi makananmu secara otomatis menggunakan AI.
              </p>

              {/* Gallery / Camera buttons */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={() => fileInputRef.current?.click()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-14 md:h-16 bg-white border border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <ImageIcon className="w-5 h-5 text-gray-500" />
                  Pilih Galeri
                </motion.button>

                <motion.button
                  onClick={openCamera}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-14 md:h-16 bg-purple-600 border border-purple-500 text-white font-semibold rounded-2xl hover:bg-purple-700 transition-all shadow-sm shadow-purple-600/20 flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Buka Kamera
                </motion.button>
              </div>

              {/* Detect button */}
              <motion.button
                onClick={handleDetect}
                disabled={!imageBase64 || isDetecting}
                whileHover={{ scale: imageBase64 && !isDetecting ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 md:h-16 bg-gray-900 text-white text-base font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Sparkles className={`w-5 h-5 ${imageBase64 && !isDetecting ? 'text-purple-300' : 'text-gray-500'}`} />
                <span className="relative z-10">{isDetecting ? 'Sedang Memproses...' : 'Deteksi Sekarang'}</span>
              </motion.button>
            </motion.div>

            {/* Result Card */}
            <AnimatePresence>
              {detectionResult && !isDetecting && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl p-5 md:p-7 shadow-sm border border-gray-100 space-y-5"
                >
                  {/* Result header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-lg mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        <span className="font-semibold text-green-700 text-xs uppercase tracking-wide">AI MATCH</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Poppins' }}>
                        {detectionResult.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-purple-600 font-bold text-lg md:text-2xl">
                        <Zap className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" />
                        {detectionResult.confidence}%
                      </div>
                      <p className="text-gray-400 text-xs font-medium mt-0.5">Confidence</p>
                    </div>
                  </div>

                  {/* Nutrition grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Kalori', value: detectionResult.calories, unit: 'kcal', icon: '🔥', bg: 'bg-orange-50', text: 'text-orange-700' },
                      { label: 'Protein', value: detectionResult.protein, unit: 'g', icon: '🥩', bg: 'bg-red-50', text: 'text-red-700' },
                      { label: 'Karbo', value: detectionResult.carbs, unit: 'g', icon: '🌾', bg: 'bg-yellow-50', text: 'text-yellow-700' },
                      { label: 'Lemak', value: detectionResult.fat, unit: 'g', icon: '🥑', bg: 'bg-green-50', text: 'text-green-700' },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={`${item.bg} rounded-2xl p-3 md:p-4 flex items-center gap-3 border border-white`}
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-sm shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className={`font-bold text-lg md:text-xl leading-none ${item.text}`}>
                            {item.value}<span className="text-xs ml-0.5 opacity-80">{item.unit}</span>
                          </p>
                          <p className="text-xs font-semibold text-gray-500 mt-0.5">{item.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Save button */}
                  <motion.button
                    onClick={handleAddToHistory}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-14 bg-green-600 text-white text-base font-bold rounded-2xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Simpan ke Jurnal Harian
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
