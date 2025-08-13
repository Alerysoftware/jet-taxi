import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Firebase Security Rules (console.firebase.google.com > Firestore > Rules)
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /reviews/{document} {
//       allow read: if true;
//       allow create: if true;
//       allow delete: if true;
//     }
//   }
// }

// Types for our database
export interface Review {
  id: string
  name: string
  text: string
  rating: number
  created_at?: Date
  approved: boolean
  isSpam?: boolean
  spamScore?: number
  spamReasons?: string[]
}

export interface CreateReview {
  name: string
  text: string
  rating: number
}
