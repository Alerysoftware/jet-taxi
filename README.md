# 🚕 Elite Taxi - Professional Taxi Service

Professional taxi service website for Famagusta, Cyprus. Built with Next.js 15, TypeScript, and Firebase.

## ✨ Features

- **Multi-language Support**: Turkish, English, Russian, and Greek
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **PWA Support**: Progressive Web App with offline functionality
- **Real-time Reviews**: Customer review system with spam protection
- **Booking System**: Advanced taxi booking with price calculation
- **Admin Dashboard**: Business analytics and management panel
- **Performance Optimized**: Image optimization, code splitting, lazy loading
- **SEO Optimized**: Structured data, meta tags, sitemap

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Backend**: Firebase Firestore, Firebase Auth
- **Deployment**: Vercel (recommended)
- **PWA**: Service Worker, Manifest
- **Testing**: Jest, React Testing Library

## 📁 Project Structure

```
jet-taxi/
├── app/                    # Next.js 13+ app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── reviews/           # Reviews page
│   └── services/          # Services page
├── components/            # Reusable components
│   ├── ui/               # UI components (Radix UI)
│   └── ...               # Feature components
├── contexts/              # React contexts
├── hooks/                 # Custom hooks
├── lib/                   # Utilities and configurations
├── public/                # Static assets
└── styles/                # Global styles
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jet-taxi.git
   cd jet-taxi
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
   GOOGLE_TRANSLATE_API_KEY=your_translate_key
   ```

4. **Firebase Setup**
   - Create Firebase project
   - Enable Firestore
   - Set up security rules
   - Add web app configuration

5. **Run Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

## 🔧 Configuration

### Firebase Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{document} {
      allow read: if true;
      allow create: if true;
      allow update: if false;
      allow delete: if false;
    }
    
    match /bookings/{document} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
      allow delete: if false;
    }
  }
}
```

### PWA Configuration
- Service Worker: `/public/sw.js`
- Manifest: `/public/manifest.json`
- Icons: `/public/images/`

## 📱 PWA Features

- **Offline Support**: Service worker caching
- **Installable**: Add to home screen
- **Push Notifications**: Background sync
- **Responsive**: Mobile-first design

## 🌐 Multi-language Support

Supported languages:
- 🇹🇷 Turkish (default)
- 🇬🇧 English
- 🇷🇺 Russian
- 🇬🇷 Greek

Language context: `contexts/language-context.tsx`

## 🎨 UI Components

Built with Radix UI primitives and Tailwind CSS:
- Responsive design
- Dark/light theme support
- Accessible components
- Custom animations

## 📊 Admin Dashboard

Features:
- Business analytics
- Review management
- Booking overview
- Performance metrics

Access: `/admin/dashboard`

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 📈 Performance

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Lazy loading components
- **Bundle Optimization**: Tree shaking, minification
- **Caching**: Service worker, HTTP caching
- **Monitoring**: Performance metrics tracking

## 🔒 Security Features

- **Rate Limiting**: API request throttling
- **Input Validation**: Zod schema validation
- **Spam Protection**: Review filtering system
- **CORS**: Cross-origin request handling
- **Logging**: Comprehensive error tracking

## 📝 API Endpoints

### Reviews
- `GET /api/reviews` - Fetch reviews
- `POST /api/reviews` - Add new review

### Bookings
- `GET /api/booking` - Fetch bookings
- `POST /api/booking` - Create booking

### Translation
- `POST /api/translate` - Translate text

## 🎯 SEO Features

- **Meta Tags**: Dynamic meta information
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine directives
- **Open Graph**: Social media optimization

## 🔧 Development

### Code Style
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Husky pre-commit hooks

### Git Workflow
1. Feature branch creation
2. Development and testing
3. Pull request review
4. Merge to main branch

## 📚 Documentation

- **API Docs**: Inline JSDoc comments
- **Component Docs**: Storybook (planned)
- **Deployment Guide**: This README
- **Contributing Guide**: CONTRIBUTING.md

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Support

- **Website**: [jettaxi.com](https://jettaxi.com)
- **Phone**: +90 533 880 68 08
- **WhatsApp**: [WhatsApp Link](https://wa.me/905338806808)
- **Email**: info@jettaxi.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Firebase for backend services
- Tailwind CSS for styling
- Radix UI for accessible components

---

**Built with ❤️ for Elite Taxi customers**
