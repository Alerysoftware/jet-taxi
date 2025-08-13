import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where, orderBy, addDoc, serverTimestamp } from 'firebase/firestore'

// Spam filtreleme fonksiyonu
function analyzeComment(text: string, name: string): {
  isSpam: boolean
  spamScore: number
  reasons: string[]
} {
  const spamWords = {
    // Türkçe hakaret ve kötü sözler
    turkish: [
      'aptal', 'salak', 'gerizekalı', 'ahmak', 'beyinsiz', 'şoför',
      'küfür', 'hakaret', 'sapık', 'çirkin', 'iğrenç', 'pislik',
      'ahmak', 'dangalak', 'salak', 'mal', 'ahmak', 'budala'
    ],
    
    // İngilizce hakaret ve kötü sözler
    english: [
      'idiot', 'stupid', 'fool', 'moron', 'dumb', 'asshole',
      'bitch', 'bastard', 'fuck', 'shit', 'damn', 'hell',
      'stupid', 'foolish', 'ignorant', 'retarded', 'imbecile'
    ],
    
    // Rusça hakaret ve kötü sözler
    russian: [
      'идиот', 'дурак', 'тупица', 'дебил', 'кретин', 'придурок',
      'сука', 'блять', 'хуй', 'пизда', 'говно', 'дерьмо',
      'мудак', 'козел', 'сволочь', 'подонок', 'ублюдок'
    ],
    
    // Rumca hakaret ve kötü sözler
    greek: [
      'ηλίθιος', 'βλάκας', 'χαζός', 'κρετίνος', 'μαλάκας', 'αρχίδι',
      'γαμώτο', 'σκατά', 'πουτάνα', 'μαλάκα', 'βρωμιάρης', 'παλιάνθρωπος'
    ],
    
    // Tehdit ve şiddet (çok dilli)
    threats: [
      // Türkçe
      'öldür', 'katlet', 'vur', 'döv', 'kır', 'öldüreceğim', 'yok edeceğim',
      // İngilizce
      'kill', 'murder', 'beat', 'break', 'destroy', 'eliminate', 'annihilate',
      // Rusça
      'убить', 'убивать', 'уничтожить', 'разбить', 'сломать', 'истребить',
      // Rumca
      'σκοτώσω', 'θανατώσω', 'καταστρέψω', 'θα σκοτώσω', 'θα σε σκοτώσω'
    ],
    
    // Spam ve reklam (çok dilli)
    spam: [
      // Türkçe
      'kazan', 'para', 'ücretsiz', 'bedava', 'indirim', 'fırsat', 'kampanya',
      // İngilizce
      'win', 'money', 'free', 'discount', 'offer', 'opportunity', 'chance',
      // Rusça
      'выиграй', 'деньги', 'бесплатно', 'скидка', 'предложение', 'шанс',
      // Rumca
      'κερδίστε', 'χρήματα', 'δωρεάν', 'έκπτωση', 'προσφορά', 'ευκαιρία'
    ]
  }

  let spamScore = 0
  const reasons: string[] = []
  const lowerText = text.toLowerCase()
  const lowerName = name.toLowerCase()

  // 1. Çok dilli spam kelime kontrolü
  let foundSpamWords: string[] = []
  
  // Tüm dillerdeki kelimeleri kontrol et
  Object.values(spamWords).flat().forEach(word => {
    if (lowerText.includes(word.toLowerCase())) {
      foundSpamWords.push(word)
    }
  })
  
  if (foundSpamWords.length > 0) {
    spamScore += foundSpamWords.length * 10
    
    // Dil bazlı kategorilendirme
    const turkishInsults = foundSpamWords.filter(word => 
      spamWords.turkish.includes(word)
    )
    const englishInsults = foundSpamWords.filter(word => 
      spamWords.english.includes(word)
    )
    const russianInsults = foundSpamWords.filter(word => 
      spamWords.russian.includes(word)
    )
    const greekInsults = foundSpamWords.filter(word => 
      spamWords.greek.includes(word)
    )
    const threats = foundSpamWords.filter(word => 
      spamWords.threats.includes(word)
    )
    
    // Kullanıcı dostu mesajlar
    if (threats.length > 0) {
      reasons.push('Tehdit ve şiddet içeren ifadeler tespit edildi')
    } else if (turkishInsults.length > 0) {
      reasons.push('Türkçe hakaret ve kötü sözler içeriyor')
    } else if (englishInsults.length > 0) {
      reasons.push('İngilizce hakaret ve kötü sözler içeriyor')
    } else if (russianInsults.length > 0) {
      reasons.push('Rusça hakaret ve kötü sözler içeriyor')
    } else if (greekInsults.length > 0) {
      reasons.push('Rumca hakaret ve kötü sözler içeriyor')
    } else if (foundSpamWords.some(word => spamWords.spam.includes(word))) {
      reasons.push('Spam ve reklam içerikleri tespit edildi')
    } else {
      reasons.push('Uygunsuz içerik tespit edildi')
    }
  }

  // 2. Çok kısa yorum kontrolü
  if (text.length < 10) {
    spamScore += 5
    reasons.push('Yorum çok kısa (en az 10 karakter olmalı)')
  }

  // 3. Çok uzun yorum kontrolü
  if (text.length > 500) {
    spamScore += 5
    reasons.push('Yorum çok uzun (en fazla 500 karakter olmalı)')
  }

  // 4. Tekrar eden karakterler
  const repeatedChars = text.match(/(.)\1{4,}/g)
  if (repeatedChars) {
    spamScore += 15
    reasons.push('Çok fazla tekrar eden karakter')
  }

  // 5. Büyük harf spam
  const upperCaseRatio = (text.match(/[A-ZĞÜŞİÖÇ]/g) || []).length / text.length
  if (upperCaseRatio > 0.7) {
    spamScore += 10
    reasons.push('Çok fazla büyük harf kullanımı')
  }

  // 6. Sayı spam
  const numberRatio = (text.match(/[0-9]/g) || []).length / text.length
  if (numberRatio > 0.3) {
    spamScore += 8
    reasons.push('Çok fazla sayı kullanımı')
  }

  // 7. Link kontrolü
  const hasLinks = /https?:\/\/|www\.|\.com|\.net|\.org/i.test(text)
  if (hasLinks) {
    spamScore += 20
    reasons.push('Link ve reklam içerikleri yasak')
  }

  // 8. İsim kontrolü
  if (name.length < 2 || name.length > 50) {
    spamScore += 5
    reasons.push('Geçersiz isim (2-50 karakter arası olmalı)')
  }

  // Spam eşiği
  const isSpam = spamScore >= 15

  return {
    isSpam,
    spamScore,
    reasons
  }
}

// GET: Yorumları getir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get('all') === 'true'

    let q
    if (showAll) {
      // Admin için tüm yorumları getir (spam dahil)
      q = query(collection(db, 'reviews'), orderBy('created_at', 'desc'))
    } else {
      // Normal kullanıcılar için sadece onaylanan yorumları getir
      q = query(
        collection(db, 'reviews'),
        where('approved', '==', true),
        orderBy('created_at', 'desc')
      )
    }

    const querySnapshot = await getDocs(q)
    const reviews = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({ reviews })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST: Yeni yorum ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, text, rating } = body

    if (!name || !text || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Spam analizi yap
    const spamAnalysis = analyzeComment(text, name)
    
    // Özel durumlar için daha spesifik mesajlar (çok dilli)
    let userMessage = 'Üzgünüz, yorumunuz yayınlanamadı. Lütfen daha uygun bir dil kullanın.'
    
    if (spamAnalysis.isSpam) {
      if (spamAnalysis.reasons.some(reason => reason.includes('Tehdit'))) {
        userMessage = 'Bu mesaj tehdit içeriyor, üzgünüz bunu yayınlayamayız.'
      } else if (spamAnalysis.reasons.some(reason => reason.includes('Türkçe hakaret'))) {
        userMessage = 'Bu mesaj Türkçe hakaret içeriyor, üzgünüz bunu yayınlayamayız.'
      } else if (spamAnalysis.reasons.some(reason => reason.includes('İngilizce hakaret'))) {
        userMessage = 'This message contains English insults, sorry we cannot publish this.'
      } else if (spamAnalysis.reasons.some(reason => reason.includes('Rusça hakaret'))) {
        userMessage = 'Это сообщение содержит русские оскорбления, извините, мы не можем это опубликовать.'
      } else if (spamAnalysis.reasons.some(reason => reason.includes('Rumca hakaret'))) {
        userMessage = 'Αυτό το μήνυμα περιέχει ελληνικές προσβολές, συγγνώμη δεν μπορούμε να το δημοσιεύσουμε.'
      } else if (spamAnalysis.reasons.some(reason => reason.includes('Link'))) {
        userMessage = 'Link ve reklam içerikleri yasak, üzgünüz bunu yayınlayamayız.'
      } else if (spamAnalysis.reasons.some(reason => reason.includes('Spam'))) {
        userMessage = 'Spam ve reklam içerikleri tespit edildi, üzgünüz bunu yayınlayamayız.'
      }
    }
    
    const docRef = await addDoc(collection(db, 'reviews'), {
      name,
      text,
      rating,
      created_at: serverTimestamp(),
      approved: !spamAnalysis.isSpam, // Spam değilse onayla
      isSpam: spamAnalysis.isSpam,
      spamScore: spamAnalysis.spamScore,
      spamReasons: spamAnalysis.reasons
    })

    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      isSpam: spamAnalysis.isSpam,
      message: spamAnalysis.isSpam ? userMessage : 'Yorumunuz başarıyla gönderildi!',
      reasons: spamAnalysis.reasons // Spam sebeplerini de döndür
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add review' },
      { status: 500 }
    )
  }
}
