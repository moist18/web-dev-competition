export interface NutritionData {
  displayName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Maps Roboflow class names (lowercase, as returned by the model)
// to approximate nutrition per typical serving
const NUTRITION_DB: Record<string, NutritionData> = {
  // --- Indonesian Foods ---
  'nasi goreng': { displayName: 'Nasi Goreng', calories: 450, protein: 12, carbs: 65, fat: 15 },
  'nasi putih': { displayName: 'Nasi Putih', calories: 242, protein: 4, carbs: 53, fat: 0 },
  'mie goreng': { displayName: 'Mie Goreng', calories: 520, protein: 14, carbs: 72, fat: 18 },
  'rendang': { displayName: 'Rendang', calories: 390, protein: 28, carbs: 8, fat: 28 },
  'sate': { displayName: 'Sate', calories: 310, protein: 26, carbs: 12, fat: 18 },
  'sate ayam': { displayName: 'Sate Ayam', calories: 280, protein: 28, carbs: 10, fat: 14 },
  'bakso': { displayName: 'Bakso', calories: 370, protein: 18, carbs: 40, fat: 12 },
  'gado-gado': { displayName: 'Gado-Gado', calories: 360, protein: 16, carbs: 38, fat: 18 },
  'soto': { displayName: 'Soto Ayam', calories: 280, protein: 22, carbs: 24, fat: 10 },
  'soto ayam': { displayName: 'Soto Ayam', calories: 280, protein: 22, carbs: 24, fat: 10 },
  'ayam goreng': { displayName: 'Ayam Goreng', calories: 420, protein: 30, carbs: 22, fat: 24 },
  'ikan goreng': { displayName: 'Ikan Goreng', calories: 300, protein: 28, carbs: 14, fat: 14 },
  'tempe goreng': { displayName: 'Tempe Goreng', calories: 220, protein: 14, carbs: 18, fat: 10 },
  'tahu goreng': { displayName: 'Tahu Goreng', calories: 180, protein: 12, carbs: 8, fat: 10 },
  'pecel': { displayName: 'Pecel', calories: 320, protein: 14, carbs: 34, fat: 16 },
  'ketoprak': { displayName: 'Ketoprak', calories: 340, protein: 12, carbs: 48, fat: 12 },
  'rawon': { displayName: 'Rawon', calories: 350, protein: 24, carbs: 30, fat: 16 },
  'opor ayam': { displayName: 'Opor Ayam', calories: 410, protein: 26, carbs: 14, fat: 28 },
  'pempek': { displayName: 'Pempek', calories: 280, protein: 14, carbs: 38, fat: 8 },
  'nasi uduk': { displayName: 'Nasi Uduk', calories: 320, protein: 6, carbs: 58, fat: 8 },
  'bubur ayam': { displayName: 'Bubur Ayam', calories: 260, protein: 16, carbs: 32, fat: 8 },
  'martabak': { displayName: 'Martabak', calories: 480, protein: 14, carbs: 62, fat: 20 },
  'pisang goreng': { displayName: 'Pisang Goreng', calories: 240, protein: 2, carbs: 42, fat: 8 },

  // --- Asian Foods ---
  'ramen': { displayName: 'Ramen', calories: 430, protein: 18, carbs: 60, fat: 14 },
  'sushi': { displayName: 'Sushi', calories: 300, protein: 16, carbs: 44, fat: 6 },
  'fried rice': { displayName: 'Fried Rice', calories: 450, protein: 12, carbs: 65, fat: 15 },
  'dim sum': { displayName: 'Dim Sum', calories: 320, protein: 16, carbs: 34, fat: 12 },
  'dumplings': { displayName: 'Dumplings', calories: 330, protein: 14, carbs: 42, fat: 10 },
  'spring roll': { displayName: 'Spring Roll', calories: 250, protein: 8, carbs: 32, fat: 10 },
  'pad thai': { displayName: 'Pad Thai', calories: 490, protein: 20, carbs: 64, fat: 16 },
  'pho': { displayName: 'Pho', calories: 350, protein: 22, carbs: 48, fat: 8 },

  // --- Western Foods ---
  'pizza': { displayName: 'Pizza', calories: 580, protein: 24, carbs: 72, fat: 22 },
  'burger': { displayName: 'Burger', calories: 650, protein: 30, carbs: 50, fat: 36 },
  'hamburger': { displayName: 'Hamburger', calories: 650, protein: 30, carbs: 50, fat: 36 },
  'hot dog': { displayName: 'Hot Dog', calories: 380, protein: 14, carbs: 28, fat: 22 },
  'sandwich': { displayName: 'Sandwich', calories: 420, protein: 20, carbs: 46, fat: 18 },
  'pasta': { displayName: 'Pasta', calories: 380, protein: 14, carbs: 58, fat: 10 },
  'steak': { displayName: 'Steak', calories: 520, protein: 48, carbs: 0, fat: 34 },
  'fried chicken': { displayName: 'Fried Chicken', calories: 640, protein: 54, carbs: 16, fat: 38 },
  'french fries': { displayName: 'French Fries', calories: 365, protein: 4, carbs: 48, fat: 17 },

  // --- Salads & Healthy ---
  'salad': { displayName: 'Salad', calories: 140, protein: 6, carbs: 14, fat: 8 },
  'caesar salad': { displayName: 'Caesar Salad', calories: 250, protein: 10, carbs: 14, fat: 18 },

  // --- Desserts & Snacks ---
  'cake': { displayName: 'Cake', calories: 380, protein: 5, carbs: 58, fat: 16 },
  'ice cream': { displayName: 'Ice Cream', calories: 270, protein: 4, carbs: 36, fat: 12 },
  'donut': { displayName: 'Donut', calories: 300, protein: 4, carbs: 38, fat: 14 },
  'chocolate': { displayName: 'Coklat', calories: 540, protein: 8, carbs: 60, fat: 30 },

  // --- Fruits ---
  'apple': { displayName: 'Apel', calories: 95, protein: 0, carbs: 25, fat: 0 },
  'banana': { displayName: 'Pisang', calories: 105, protein: 1, carbs: 27, fat: 0 },
  'orange': { displayName: 'Jeruk', calories: 62, protein: 1, carbs: 15, fat: 0 },
};

const FALLBACK: NutritionData = {
  displayName: 'Makanan Tidak Dikenal',
  calories: 250,
  protein: 10,
  carbs: 30,
  fat: 10,
};

export function getNutrition(className: string): NutritionData {
  const key = className.toLowerCase().trim();
  return NUTRITION_DB[key] ?? FALLBACK;
}

export function formatClassName(className: string): string {
  // Capitalise each word and replace underscores/hyphens with spaces
  return className
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
