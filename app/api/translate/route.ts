import { NextRequest, NextResponse } from 'next/server'

// Basit dil tespiti fonksiyonu
function detectLanguage(text: string): string {
  // Türkçe karakterler
  const turkishChars = /[çğıöşüÇĞIİÖŞÜ]/
  // Rusça karakterler
  const russianChars = /[а-яёА-ЯЁ]/
  // Rumca karakterler
  const greekChars = /[α-ωΑ-Ω]/
  
  if (turkishChars.test(text)) return 'tr'
  if (russianChars.test(text)) return 'ru'
  if (greekChars.test(text)) return 'el'
  
  // Varsayılan olarak İngilizce
  return 'en'
}

// Ücretsiz çeviri API'si (MyMemory)
async function translateWithMyMemory(text: string, targetLang: string, sourceLang: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
    )
    
    if (!response.ok) {
      throw new Error(`MyMemory API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.responseStatus === 200 && data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText
    } else {
      throw new Error('Invalid response from MyMemory API')
    }
    
  } catch (error) {
    console.error('MyMemory çeviri hatası:', error)
    throw error
  }
}

// Ana çeviri fonksiyonu
async function translateText(text: string, targetLang: string): Promise<string> {
  const sourceLang = detectLanguage(text)
  
  // Eğer aynı dil ise çeviri yapma
  if (sourceLang === targetLang) {
    return text
  }
  
  // Önce basit kelime çevirisi dene
  const simpleTranslations: { [key: string]: { [key: string]: string } } = {
    // İngilizce yaygın kelimeler
    'nice': {
      'tr': 'güzel',
      'ru': 'красиво',
      'el': 'ωραία'
    },
    'good': {
      'tr': 'iyi',
      'ru': 'хорошо',
      'el': 'καλά'
    },
    'excellent': {
      'tr': 'mükemmel',
      'ru': 'отлично',
      'el': 'εξαιρετικά'
    },
    'bad': {
      'tr': 'kötü',
      'ru': 'плохо',
      'el': 'κακά'
    },
    'test': {
      'tr': 'test',
      'ru': 'тест',
      'el': 'δοκιμή'
    },
    'great': {
      'tr': 'harika',
      'ru': 'великолепно',
      'el': 'υπέροχα'
    },
    'amazing': {
      'tr': 'inanılmaz',
      'ru': 'удивительно',
      'el': 'εκπληκτικά'
    },
    'perfect': {
      'tr': 'mükemmel',
      'ru': 'идеально',
      'el': 'τέλεια'
    },
    'wonderful': {
      'tr': 'harika',
      'ru': 'чудесно',
      'el': 'υπέροχα'
    },
    'fantastic': {
      'tr': 'fantastik',
      'ru': 'фантастично',
      'el': 'φανταστικά'
    },
    'awesome': {
      'tr': 'muhteşem',
      'ru': 'потрясающе',
      'el': 'καταπληκτικά'
    },
    'terrible': {
      'tr': 'korkunç',
      'ru': 'ужасно',
      'el': 'τρομερά'
    },
    'horrible': {
      'tr': 'berbat',
      'ru': 'ужасно',
      'el': 'φρικτά'
    },
    'awful': {
      'tr': 'korkunç',
      'ru': 'ужасно',
      'el': 'φρικτά'
    },
    'beautiful': {
      'tr': 'güzel',
      'ru': 'красиво',
      'el': 'όμορφα'
    },
    'ugly': {
      'tr': 'çirkin',
      'ru': 'уродливо',
      'el': 'άσχημα'
    },
    'fast': {
      'tr': 'hızlı',
      'ru': 'быстро',
      'el': 'γρήγορα'
    },
    'slow': {
      'tr': 'yavaş',
      'ru': 'медленно',
      'el': 'αργά'
    },
    'clean': {
      'tr': 'temiz',
      'ru': 'чисто',
      'el': 'καθαρά'
    },
    'dirty': {
      'tr': 'kirli',
      'ru': 'грязно',
      'el': 'βρώμικα'
    },
    'expensive': {
      'tr': 'pahalı',
      'ru': 'дорого',
      'el': 'ακριβά'
    },
    'cheap': {
      'tr': 'ucuz',
      'ru': 'дешево',
      'el': 'φτηνά'
    },
    'big': {
      'tr': 'büyük',
      'ru': 'большой',
      'el': 'μεγάλο'
    },
    'small': {
      'tr': 'küçük',
      'ru': 'маленький',
      'el': 'μικρό'
    },
    'hot': {
      'tr': 'sıcak',
      'ru': 'горячий',
      'el': 'ζεστό'
    },
    'cold': {
      'tr': 'soğuk',
      'ru': 'холодный',
      'el': 'κρύο'
    },
    'new': {
      'tr': 'yeni',
      'ru': 'новый',
      'el': 'νέο'
    },
    'old': {
      'tr': 'eski',
      'ru': 'старый',
      'el': 'παλιό'
    },
    'easy': {
      'tr': 'kolay',
      'ru': 'легко',
      'el': 'εύκολο'
    },
    'difficult': {
      'tr': 'zor',
      'ru': 'сложно',
      'el': 'δύσκολο'
    },
    'happy': {
      'tr': 'mutlu',
      'ru': 'счастливый',
      'el': 'ευτυχισμένος'
    },
    'sad': {
      'tr': 'üzgün',
      'ru': 'грустный',
      'el': 'λυπημένος'
    },
    'angry': {
      'tr': 'kızgın',
      'ru': 'злой',
      'el': 'θυμωμένος'
    },
    'tired': {
      'tr': 'yorgun',
      'ru': 'уставший',
      'el': 'κουρασμένος'
    },
    'hungry': {
      'tr': 'aç',
      'ru': 'голодный',
      'el': 'πεινασμένος'
    },
    'thirsty': {
      'tr': 'susamış',
      'ru': 'жаждущий',
      'el': 'διψασμένος'
    },
    // Türkçe yaygın kelimeler
    'güzel': {
      'en': 'beautiful',
      'ru': 'красиво',
      'el': 'όμορφα'
    },
    'iyi': {
      'en': 'good',
      'ru': 'хорошо',
      'el': 'καλά'
    },
    'mükemmel': {
      'en': 'perfect',
      'ru': 'идеально',
      'el': 'τέλεια'
    },
    'harika': {
      'en': 'wonderful',
      'ru': 'чудесно',
      'el': 'υπέροχα'
    },
    'kötü': {
      'en': 'bad',
      'ru': 'плохо',
      'el': 'κακά'
    },
    'hızlı': {
      'en': 'fast',
      'ru': 'быстро',
      'el': 'γρήγορα'
    },
    'temiz': {
      'en': 'clean',
      'ru': 'чисто',
      'el': 'καθαρά'
    },
    'pahalı': {
      'en': 'expensive',
      'ru': 'дорого',
      'el': 'ακριβά'
    },
    'büyük': {
      'en': 'big',
      'ru': 'большой',
      'el': 'μεγάλο'
    },
    'sıcak': {
      'en': 'hot',
      'ru': 'горячий',
      'el': 'ζεστό'
    },
    'yeni': {
      'en': 'new',
      'ru': 'новый',
      'el': 'νέο'
    },
    'kolay': {
      'en': 'easy',
      'ru': 'легко',
      'el': 'εύκολο'
    },
    'mutlu': {
      'en': 'happy',
      'ru': 'счастливый',
      'el': 'ευτυχισμένος'
    },
    'aç': {
      'en': 'hungry',
      'ru': 'голодный',
      'el': 'πεινασμένος'
    },
    // Rusça yaygın kelimeler
    'красиво': {
      'en': 'beautiful',
      'tr': 'güzel',
      'el': 'όμορφα'
    },
    'хорошо': {
      'en': 'good',
      'tr': 'iyi',
      'el': 'καλά'
    },
    'отлично': {
      'en': 'excellent',
      'tr': 'mükemmel',
      'el': 'εξαιρετικά'
    },
    // Rumca yaygın kelimeler
    'ωραία': {
      'en': 'nice',
      'tr': 'güzel',
      'ru': 'красиво'
    },
    'καλά': {
      'en': 'good',
      'tr': 'iyi',
      'ru': 'хорошо'
    }
  }
  
  // Önce basit kelime çevirisi dene
  if (simpleTranslations[text.toLowerCase()] && simpleTranslations[text.toLowerCase()][targetLang]) {
    console.log(`Basit çeviri kullanıldı: ${text} → ${simpleTranslations[text.toLowerCase()][targetLang]}`)
    return simpleTranslations[text.toLowerCase()][targetLang]
  }
  
  // Basit çeviri bulunamadıysa API kullan
  try {
    console.log(`API çevirisi deneniyor: ${text} (${sourceLang} → ${targetLang})`)
    const translatedText = await translateWithMyMemory(text, targetLang, sourceLang)
    console.log(`API çevirisi başarılı: ${text} → ${translatedText}`)
    return translatedText
  } catch (error) {
    console.error('API çevirisi başarısız, orijinal metin döndürülüyor:', error)
    return text
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, targetLang } = body

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const translatedText = await translateText(text, targetLang)
    const detectedLang = detectLanguage(text)

    return NextResponse.json({
      success: true,
      originalText: text,
      translatedText,
      sourceLanguage: detectedLang,
      targetLanguage: targetLang
    })

  } catch (error) {
    console.error('Çeviri hatası:', error)
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
}
