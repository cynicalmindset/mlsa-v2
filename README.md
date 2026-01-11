# MLSA App 🎓📱

MLSA is a mobile application built for Microsoft Learn Student Ambassadors to manage society events, domains, and user engagement with a clean and modern UI.

---

## ✨ Features
- Onboarding screen (shown only for logged-out users)
- Login & Registration
- Home dashboard
- Society events & domains
- Event detail screen (dynamic routing)
- Pull-to-refresh support
- Clean UI/UX
- Android APK build support

---

## 🛠 Tech Stack
- React Native (Expo)
- Expo Router
- TypeScript
- Supabase (Backend & Auth)
- AsyncStorage
- EAS Build

---

## 📂 Project Structure
```
app/
 ├── index.tsx          # Onboarding & auth check
 ├── (main)/            # Main app screens
 ├── login.tsx
 ├── register.tsx
components/
assets/
constants/
helpers/
services/
```

---

## ✅ Prerequisites
Make sure the following are installed on your system:

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- EAS CLI
- Android Studio or a physical Android device

---

## 📦 Install & Run (Step by Step)

### 1️⃣ Clone the repository
```bash
git clone <your-repo-url>
cd mlsa-v2
```

### 2️⃣ Install dependencies
```bash
npm install
```
or
```bash
yarn install
```

### 3️⃣ Start the development server
```bash
npx expo start
```

- Press **a** to run on Android Emulator
- Scan QR code to run on physical device using Expo Go

---

## 🔄 Clear Cache (If App Breaks)
```bash
npx expo start -c
```

---

## 📱 Build Android APK
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

## 🔐 Authentication Flow
- Logged-out users → Onboarding screen
- Logged-in users → Home screen
- Login state stored using AsyncStorage

---

## 🎨 App Branding
- App icon configured in `app.json`
- Android adaptive icon supported
- Custom splash screen

---

## 🧪 Tested On
- Android Emulator
- Physical Android Devices

---

## 🚀 Future Improvements
- Push notifications
- Event registration
- Admin dashboard
- Performance optimization

---

## 👨‍💻 Developer
Yash Raj  
UI/UX Designer & React Native Developer

---

## 📄 License
This project is intended for educational and internal use.
