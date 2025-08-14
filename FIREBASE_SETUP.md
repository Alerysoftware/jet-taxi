# 🔥 Firebase Kurulum Rehberi

## 📋 Gerekli Adımlar:

### 1. Firebase Console'a Gidin:
- [Firebase Console](https://console.firebase.google.com/)
- Google hesabınızla giriş yapın

### 2. Yeni Proje Oluşturun:
- **"Create a project"** butonuna tıklayın
- Proje adı: `jet-taxi` (veya istediğiniz ad)
- Google Analytics'i etkinleştirin (opsiyonel)

### 3. Firestore Database Kurun:
- Sol menüde **"Firestore Database"** seçin
- **"Create database"** butonuna tıklayın
- **"Start in test mode"** seçin (güvenlik kuralları daha sonra eklenir)

### 4. Web App Ekleme:
- **"Add app"** butonuna tıklayın
- **Web** simgesini seçin
- App nickname: `jet-taxi-web`
- **"Register app"** butonuna tıklayın

### 5. Firebase Config Bilgilerini Kopyalayın:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 6. Environment Variables (.env.local) Dosyasını Düzenleyin:
```bash
# .env.local dosyasını proje ana dizininde oluşturun
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 7. Firestore Security Rules:
- Firebase Console > Firestore Database > Rules
- `firestore.rules` dosyasındaki kuralları kopyalayın
- **"Publish"** butonuna tıklayın

### 8. Firestore Indexes:
- Firebase Console > Firestore Database > Indexes
- `firestore.indexes.json` dosyasındaki indexleri ekleyin
- **"Create index"** butonuna tıklayın

## 🚨 Önemli Notlar:

- `.env.local` dosyası `.gitignore`'da olmalı
- Firebase config bilgileri public olabilir (client-side)
- Security rules production'da daha sıkı olmalı
- Indexes oluşturulana kadar bazı sorgular çalışmayabilir

## ✅ Test Etme:

1. `npm run dev` ile projeyi başlatın
2. Reviews sayfasına gidin
3. Yorum eklemeyi deneyin
4. Firebase Console'da verileri kontrol edin

## 🔧 Sorun Giderme:

- **Permission denied**: Security rules'ı kontrol edin
- **Index not found**: Composite indexes'i oluşturun
- **Config error**: Environment variables'ı kontrol edin
