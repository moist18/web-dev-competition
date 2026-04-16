# 📱 DOKUMENTASI LENGKAP UI & FUNGSI APLIKASI EATWISE2

## 🎯 OVERVIEW APLIKASI
EatWise2 adalah aplikasi pelacak makanan dan kalori dengan fitur AI detection, barcode scanner, dan manajemen profil kesehatan.

---

## 📄 STRUKTUR HALAMAN APLIKASI

### 1️⃣ **LOGIN PAGE** (`lib/login.dart`)

#### 🎨 **Tampilan UI:**
```
┌─────────────────────────────────┐
│                                 │
│         EATWISE                 │  ← Judul besar dengan gradient hijau
│    (Font Padauk, 59px)          │
│                                 │
│   Continue Your Journey         │  ← Subtitle (28px)
│  lets track meals, calorie,     │  ← Body text (18px)
│   and more for your health      │
│                                 │
│  👤 [Username Input]            │  ← Input field dengan icon
│                                 │
│  🔑 [Password Input]            │  ← Input field dengan icon
│                                 │
│  ┌─────────────────────────┐   │
│  │        Login            │   │  ← Tombol hijau rounded (60px height)
│  └─────────────────────────┘   │
│                                 │
│  ────────── OR ──────────       │  ← Divider
│                                 │
│  [Continue with Google]         │  ← Tombol login Google
│                                 │
│  Don't Have Account? Sign up    │  ← Link ke Sign Up
│                                 │
└─────────────────────────────────┘
```

#### ⚙️ **Fungsi:**
- Input username dan password
- Validasi login ke backend API (`/login.php`)
- Login dengan Google (opsional)
- Redirect ke Sign Up page
- Simpan session user setelah login berhasil
- Redirect ke Home page setelah login

#### 🎨 **Warna:**
- Background: `#AEB8AF` (Abu-abu kehijauan)
- Button: `#549E61` (Hijau)
- Text: Hitam
- Gradient Title: Hijau gradient

---

### 2️⃣ **SIGN UP PAGE** (`lib/sign_up.dart`)

#### 🎨 **Tampilan UI:**
```
┌─────────────────────────────────┐
│                                 │
│         EATWISE                 │
│                                 │
│      Create New Account         │
│                                 │
│  👤 [Username Input]            │
│                                 │
│  📧 [Email Input]               │
│                                 │
│  🔑 [Password Input]            │
│                                 │
│  🔑 [Confirm Password Input]    │
│                                 │
│  ┌─────────────────────────┐   │
│  │      Sign Up            │   │
│  └─────────────────────────┘   │
│                                 │
│  Already Have Account? Login    │
│                                 │
└─────────────────────────────────┘
```

#### ⚙️ **Fungsi:**
- Input username, email, password
- Validasi password match
- Register user baru ke backend (`/register.php`)
- Auto login setelah registrasi berhasil
- Redirect ke Home page

---

### 3️⃣ **HOME PAGE** (`lib/page/home_integrated.dart`)

#### 🎨 **Tampilan UI:**
```
┌─────────────────────────────────────────┐
│  ╔═══════════════════════════════════╗  │
│  ║     EATWISE                       ║  │  ← Header dengan gradient hijau
│  ║     Welcome, [Username]!          ║  │
│  ╚═══════════════════════════════════╝  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  📊 Kalori Hari Ini               │  │  ← Card kalori
│  │                                   │  │
│  │     [Progress Bar]                │  │  ← Progress bar kalori
│  │                                   │  │
│  │     850 / 2000 kcal               │  │  ← Angka kalori besar
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌─────────────┐  ┌─────────────┐      │
│  │   📷        │  │   🤖        │      │  ← Card fitur
│  │   Scan      │  │   AI        │      │
│  │   Barcode   │  │   Deteksi   │      │
│  └─────────────┘  └─────────────┘      │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  📜 Riwayat Makanan Hari Ini      │  │  ← Card history
│  │                                   │  │
│  │  • Nasi Goreng - 450 kcal        │  │
│  │  • Ayam Goreng - 300 kcal        │  │
│  │  • Jus Jeruk - 100 kcal          │  │
│  │                                   │  │
│  │  [Lihat Semua Riwayat]           │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ╔═══════════════════════════════════╗  │
│  ║  🏠  📊  👤                       ║  │  ← Bottom Navigation
│  ╚═══════════════════════════════════╝  │
└─────────────────────────────────────────┘
```

#### ⚙️ **Fungsi:**
1. **Header Section:**
   - Menampilkan nama user
   - Gradient background hijau

2. **Kalori Card:**
   - Menampilkan kalori terkonsumsi hari ini
   - Progress bar visual (hijau)
   - Target kalori harian
   - Data dari API `/profile.php` dan `/history_makanan.php`

3. **Fitur Cards (2 kolom):**
   - **Scan Barcode:** Buka kamera untuk scan barcode produk
   - **AI Deteksi Makanan:** Upload/ambil foto makanan untuk deteksi AI

4. **Riwayat Makanan:**
   - List makanan yang dikonsumsi hari ini
   - Nama makanan + kalori
   - Tombol "Lihat Semua" → ke Food History Screen

5. **Bottom Navigation:**
   - Home (aktif)
   - History
   - Profile

#### 🎨 **Warna:**
- Background: `#AAB8AB` (Abu-abu kehijauan)
- Card: `#E6EEE6` (Putih kehijauan)
- Header Gradient: Hijau tua ke hijau muda
- Brand Green: `#13721C`

---

### 4️⃣ **SCAN BARCODE PAGE** (`lib/page/scan_page.dart`)

#### 🎨 **Tampilan UI:**
```
┌─────────────────────────────────┐
│  ← Back                         │
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │    [CAMERA VIEW]        │   │  ← Live camera feed
│  │                         │   │
│  │    ┌─────────────┐      │   │
│  │    │   SCAN      │      │   │  ← Scan area overlay
│  │    │   AREA      │      │   │
│  │    └─────────────┘      │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  Arahkan kamera ke barcode      │  ← Instruksi
│                                 │
│  [💡] [🔄]                      │  ← Tombol flash & flip camera
│                                 │
└─────────────────────────────────┘
```

#### ⚙️ **Fungsi:**
- Buka kamera untuk scan barcode
- Deteksi barcode otomatis (mobile_scanner)
- Fetch data produk dari API `/products.php?barcode=xxx`
- Jika produk ditemukan → redirect ke Report Screen
- Jika tidak ditemukan → tampilkan error
- Tombol flash dan flip camera

---

### 5️⃣ **AI FOOD DETECTION PAGE** (`lib/page/food_detection_screen.dart`)

#### 🎨 **Tampilan UI:**
```
┌─────────────────────────────────┐
│  ← Back    AI Deteksi Makanan   │
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │   [PREVIEW IMAGE]       │   │  ← Preview foto yang dipilih
│  │   atau                  │   │
│  │   [PLACEHOLDER]         │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   📷 Pilih Gambar       │   │  ← Tombol pilih dari galeri
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   🔍 Deteksi Makanan    │   │  ← Tombol proses AI
│  └─────────────────────────┘   │
│                                 │
│  ─────── HASIL DETEKSI ────────  │
│                                 │
│  🍜 Nasi Goreng                 │  ← Hasil prediksi
│  Confidence: 95.3%              │
│                                 │
│  Kalori: ~450 kcal              │  ← Info nutrisi
│  Protein: 12g                   │
│  Karbohidrat: 65g               │
│                                 │
│  ┌─────────────────────────┐   │
│  │   ✅ Tambah ke Riwayat  │   │  ← Tombol simpan
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

#### ⚙️ **Fungsi:**
- Pilih foto dari galeri (image_picker)
- Proses foto dengan TensorFlow Lite model
- Deteksi 13 jenis makanan Indonesia:
  1. Ayam Goreng
  2. Burger
  3. French Fries
  4. Gado-Gado
  5. Ikan Goreng
  6. Mie Goreng
  7. Nasi Goreng
  8. Nasi Padang
  9. Pizza
  10. Rawon
  11. Rendang
  12. Sate
  13. Soto
- Tampilkan confidence score
- Estimasi kalori dari database
- Tombol tambah ke riwayat → Food Detail Screen

---

### 6️⃣ **FOOD DETAIL SCREEN** (`lib/page/food_detail_screen.dart`)

#### 🎨 **Tampilan UI:**
```
┌─────────────────────────────────┐
│  ← Back    Detail Makanan       │
│                                 │
│  ┌─────────────────────────┐   │
│  │   [FOOD IMAGE]          │   │
│  └─────────────────────────┘   │
│                                 │
│  🍜 Nasi Goreng                 │  ← Nama makanan (besar)
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  📊 Informasi Nutrisi           │
│                                 │
│  🔥 Kalori:        450 kcal     │
│  🥩 Protein:       12 g         │
│  🍚 Karbohidrat:   65 g         │
│  🧈 Lemak:         15 g         │
│  🧂 Garam:         2.5 g        │
│  🍬 Gula:          8 g          │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  ⏰ Waktu Makan                 │
│  ○ Sarapan  ○ Siang            │
│  ● Malam    ○ Snack            │  ← Radio button
│                                 │
│  🍽️ Jumlah Porsi               │
│  [-]  1.0  [+]                 │  ← Counter porsi
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ✅ Simpan ke Riwayat    │   │  ← Tombol simpan
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

#### ⚙️ **Fungsi:**
- Tampilkan detail makanan yang terdeteksi
- Foto makanan (jika ada)
- Informasi nutrisi lengkap
- Pilih waktu makan (sarapan/siang/malam/snack)
- Atur jumlah porsi (increment/decrement)
- Kalori otomatis dikalikan dengan porsi
- Simpan ke database via API `/history_makanan.php`
- Redirect kembali ke Home setelah simpan

---

### 7️⃣ **REPORT SCREEN (Hasil Scan Barcode)** (`lib/page/hasil_integrated.dart`)

#### 🎨 **Tampilan UI:**
```
┌─────────────────────────────────┐
│  ← Back    Detail Produk        │
│                                 │
│  ┌─────────────────────────┐   │
│  │   [PRODUCT IMAGE]       │   │
│  └─────────────────────────┘   │
│                                 │
│  🏷️ Ultra Milk Full Cream       │  ← Nama produk
│  Merek: Ultra Milk              │
│  Kategori: Minuman              │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  📊 Informasi Nutrisi           │
│  Per 200ml                      │
│                                 │
│  🔥 Kalori:        130 kcal     │
│  🥩 Protein:       6.4 g        │
│  🍚 Karbohidrat:   9.6 g        │
│  🧈 Lemak Total:   6.8 g        │
│  🧈 Lemak Jenuh:   4.2 g        │
│  🍬 Gula:          9.6 g        │
│  🧂 Garam:         0.1 g        │
│  🌾 Serat:         0 g          │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  ⚠️ Peringatan Alergi           │
│  ☑️ Mengandung Susu             │
│  ☐ Mengandung Gluten            │
│  ☐ Mengandung Kacang            │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  📝 Komposisi Bahan:            │
│  Susu Segar, Vitamin D,         │
│  Vitamin B2                     │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  ⏰ Waktu Makan: [Dropdown]     │
│  🍽️ Jumlah Porsi: [-] 1.0 [+]  │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ✅ Simpan ke Riwayat    │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

#### ⚙️ **Fungsi:**
- Tampilkan detail produk dari database
- Foto produk (jika ada)
- Informasi nutrisi lengkap per serving
- Komposisi bahan
- Peringatan alergi (gluten, kacang, telur, susu, seafood)
- Tingkat gula/garam/lemak (rendah/sedang/tinggi)
- Pilih waktu makan
- Atur jumlah porsi
- Simpan ke riwayat makanan
- Data dari API `/products.php?id=xxx`

---

### 8️⃣ **FOOD HISTORY SCREEN** (`lib/page/home_integrated.dart` - FoodHistoryScreen)

#### 🎨 **Tampilan UI:**
```
┌─────────────────────────────────┐
│  ← Back    Riwayat Makanan      │
│                                 │
│  📅 Filter Tanggal              │
│  [Start Date] - [End Date]      │
│  [🔍 Filter]                    │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  📊 Ringkasan                   │
│  Total Kalori: 1,850 kcal       │
│  Total Item: 8 makanan          │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  📆 28 Feb 2026                 │
│  ┌─────────────────────────┐   │
│  │ 🌅 Sarapan - 07:30      │   │
│  │ Nasi Goreng             │   │
│  │ 450 kcal • 1.0 porsi    │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ☀️ Siang - 12:45        │   │
│  │ Ayam Goreng + Nasi      │   │
│  │ 650 kcal • 1.0 porsi    │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🌙 Malam - 19:15        │   │
│  │ Soto Ayam               │   │
│  │ 350 kcal • 1.0 porsi    │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🍪 Snack - 15:00        │   │
│  │ Biskuit Cokelat         │   │
│  │ 200 kcal • 0.5 porsi    │   │
│  └─────────────────────────┘   │
│                                 │
│  [Load More...]                 │
│                                 │
└─────────────────────────────────┘
```

#### ⚙️ **Fungsi:**
- Tampilkan semua riwayat makanan user
- Filter berdasarkan tanggal (start & end date)
- Ringkasan total kalori dan jumlah item
- Grouping by date
- Setiap item menampilkan:
  - Icon waktu makan (sarapan/siang/malam/snack)
  - Waktu konsumsi
  - Nama makanan
  - Kalori dan porsi
- Pagination (load more)
- Data dari API `/history_makanan.php?user_id=xxx`
- Swipe to delete (opsional)

---

### 9️⃣ **USER PROFILE SCREEN** (`lib/page/user_profile.dart`)

#### 🎨 **Tampilan UI:**
```
┌─────────────────────────────────┐
│  ← Back    Profil Saya          │
│                                 │
│       ┌─────────┐               │
│       │  👤     │               │  ← Avatar/foto profil
│       └─────────┘               │
│                                 │
│      [Username]                 │
│      [email@example.com]        │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  📝 Informasi Pribadi           │
│                                 │
│  Nama Lengkap:                  │
│  [Input Field]                  │
│                                 │
│  Usia:                          │
│  [Input Field] tahun            │
│                                 │
│  Berat Badan:                   │
│  [Input Field] kg               │
│                                 │
│  Tinggi Badan:                  │
│  [Input Field] cm               │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  🎯 Target Kalori Harian        │
│  [Input Field] kcal             │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  🏥 Riwayat Kesehatan           │
│                                 │
│  ☑️ Diabetes                    │
│  ☐ Kolesterol Tinggi            │
│  ☐ Hipertensi                   │
│  ☐ Penyakit Jantung             │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  ⚠️ Alergi Makanan              │
│                                 │
│  ☐ Gluten                       │
│  ☑️ Kacang                      │
│  ☐ Telur                        │
│  ☑️ Susu                        │
│  ☐ Seafood                      │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  🔔 Pengaturan Notifikasi       │
│                                 │
│  Sarapan:  [Toggle] 07:00       │
│  Siang:    [Toggle] 12:00       │
│  Malam:    [Toggle] 19:00       │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                 │
│  ┌─────────────────────────┐   │
│  │   💾 Simpan Perubahan   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   🚪 Logout             │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

#### ⚙️ **Fungsi:**
- Tampilkan dan edit profil user
- Upload foto profil (opsional)
- Edit informasi pribadi:
  - Nama lengkap
  - Usia
  - Berat badan
  - Tinggi badan
- Set target kalori harian
- Checklist riwayat kesehatan:
  - Diabetes
  - Kolesterol
  - Hipertensi
  - Penyakit jantung
- Checklist alergi makanan:
  - Gluten, Kacang, Telur, Susu, Seafood
- Pengaturan notifikasi reminder:
  - Toggle on/off untuk sarapan/siang/malam
  - Set waktu notifikasi
- Tombol simpan → update ke API `/profile.php`
- Tombol logout → clear session & redirect ke login

---

## 🔧 FITUR BACKEND API

### API Endpoints:

1. **`/login.php`**
   - Method: POST
   - Input: `{username, password}`
   - Output: `{success, message, data: {id, username, email}}`

2. **`/register.php`**
   - Method: POST
   - Input: `{username, password, email}`
   - Output: `{success, message, data: {id, username, email}}`

3. **`/profile.php`**
   - Method: GET - `?user_id=xxx`
   - Output: Profile data lengkap
   - Method: POST - Create profile
   - Method: PUT - Update profile

4. **`/products.php`**
   - Method: GET - `?barcode=xxx` atau `?id=xxx`
   - Output: Product data lengkap

5. **`/history_makanan.php`**
   - Method: GET - `?user_id=xxx&today=1` (hari ini)
   - Method: GET - `?user_id=xxx&page=1&limit=50` (history)
   - Method: POST - Add food to history
   - Method: DELETE - Delete history item

---

## 🎨 DESIGN SYSTEM

### Warna Utama:
- **Background:** `#AAB8AB` (Abu-abu kehijauan)
- **Card:** `#E6EEE6` (Putih kehijauan)
- **Brand Green:** `#13721C` (Hijau tua)
- **Button Green:** `#549E61` (Hijau sedang)
- **Text:** `#000000` (Hitam)
- **Text White:** `#FFFFFF` (Putih)

### Typography:
- **Title:** Padauk, 59-65px, Bold
- **Subtitle:** Inter, 28px, Medium
- **Body:** Inter, 18-26px, Regular
- **Button:** Inter, 24px, Medium

### Spacing:
- Side Padding: 20-32px
- Card Radius: 10px
- Button Height: 60px
- Button Radius: 55px

---

## 📊 FLOW APLIKASI

```
START
  ↓
LOGIN PAGE
  ↓ (login berhasil)
HOME PAGE
  ├→ Scan Barcode → SCAN PAGE → REPORT SCREEN → (simpan) → HOME
  ├→ AI Detection → FOOD DETECTION → FOOD DETAIL → (simpan) → HOME
  ├→ Lihat Riwayat → FOOD HISTORY SCREEN
  └→ Profile → USER PROFILE SCREEN → (logout) → LOGIN PAGE
```

---

## 🔐 SESSION MANAGEMENT

Data yang disimpan di SharedPreferences:
- `IS_LOGIN`: boolean (true/false)
- `ID_User`: string (user ID)
- `NAMA`: string (username)
- `EMAIL`: string (email)

---

## 📱 FITUR UTAMA

1. ✅ **Login & Register** dengan validasi
2. ✅ **Scan Barcode** produk makanan
3. ✅ **AI Detection** 13 jenis makanan Indonesia
4. ✅ **Tracking Kalori** harian dengan progress bar
5. ✅ **Riwayat Makanan** dengan filter tanggal
6. ✅ **Profil Kesehatan** lengkap dengan alergi
7. ✅ **Notifikasi Reminder** waktu makan
8. ✅ **Database MySQL** dengan PHP API
9. ✅ **Multi-platform** (Android, iOS, Linux, Windows)

---

## 🚀 TEKNOLOGI YANG DIGUNAKAN

- **Frontend:** Flutter/Dart
- **Backend:** PHP + MySQL
- **AI Model:** TensorFlow Lite (Float16)
- **Camera:** mobile_scanner
- **Image Picker:** image_picker
- **Notifications:** flutter_local_notifications
- **HTTP:** http package
- **State Management:** StatefulWidget
- **Storage:** SharedPreferences

---

**Dokumentasi dibuat: 28 Februari 2026**
