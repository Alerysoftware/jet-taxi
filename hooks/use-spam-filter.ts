// Spam filtreleme sistemi
export function useSpamFilter() {
  // Spam kelimeleri (Türkçe ve İngilizce)
  const spamWords = [
    // Hakaret ve kötü sözler
    'aptal', 'salak', 'gerizekalı', 'ahmak', 'beyinsiz',
    'idiot', 'stupid', 'fool', 'moron', 'dumb',
    
    // Tehdit ve şiddet
    'öldür', 'katlet', 'vur', 'döv', 'kır',
    'kill', 'murder', 'beat', 'break', 'destroy',
    
    // Spam ve reklam
    'kazan', 'para', 'ücretsiz', 'bedava', 'indirim',
    'win', 'money', 'free', 'discount', 'offer',
    
    // Uygunsuz içerik
    'küfür', 'hakaret', 'sapık', 'çirkin', 'iğrenç',
    'curse', 'insult', 'pervert', 'ugly', 'disgusting'
  ]

  // Yorum metnini analiz et
  const analyzeComment = (text: string, name: string): {
    isSpam: boolean
    spamScore: number
    reasons: string[]
  } => {
    let spamScore = 0
    const reasons: string[] = []
    const lowerText = text.toLowerCase()
    const lowerName = name.toLowerCase()

    // 1. Spam kelime kontrolü
    const foundSpamWords = spamWords.filter(word => 
      lowerText.includes(word.toLowerCase())
    )
    
    if (foundSpamWords.length > 0) {
      spamScore += foundSpamWords.length * 10
      reasons.push(`Spam kelimeler: ${foundSpamWords.join(', ')}`)
    }

    // 2. Çok kısa yorum kontrolü
    if (text.length < 10) {
      spamScore += 5
      reasons.push('Çok kısa yorum')
    }

    // 3. Çok uzun yorum kontrolü
    if (text.length > 500) {
      spamScore += 5
      reasons.push('Çok uzun yorum')
    }

    // 4. Tekrar eden karakterler
    const repeatedChars = text.match(/(.)\1{4,}/g)
    if (repeatedChars) {
      spamScore += 15
      reasons.push('Tekrar eden karakterler')
    }

    // 5. Büyük harf spam
    const upperCaseRatio = (text.match(/[A-ZĞÜŞİÖÇ]/g) || []).length / text.length
    if (upperCaseRatio > 0.7) {
      spamScore += 10
      reasons.push('Çok fazla büyük harf')
    }

    // 6. Sayı spam
    const numberRatio = (text.match(/[0-9]/g) || []).length / text.length
    if (numberRatio > 0.3) {
      spamScore += 8
      reasons.push('Çok fazla sayı')
    }

    // 7. Link kontrolü
    const hasLinks = /https?:\/\/|www\.|\.com|\.net|\.org/i.test(text)
    if (hasLinks) {
      spamScore += 20
      reasons.push('Link içeriyor')
    }

    // 8. İsim kontrolü
    if (name.length < 2 || name.length > 50) {
      spamScore += 5
      reasons.push('Geçersiz isim')
    }

    // Spam eşiği
    const isSpam = spamScore >= 15

    return {
      isSpam,
      spamScore,
      reasons
    }
  }

  // Yorumu filtrele ve kaydet
  const filterAndSaveComment = async (comment: {
    name: string
    text: string
    rating: number
  }) => {
    const analysis = analyzeComment(comment.text, comment.name)
    
    return {
      ...comment,
      isSpam: analysis.isSpam,
      spamScore: analysis.spamScore,
      spamReasons: analysis.reasons,
      approved: !analysis.isSpam, // Spam değilse onayla
      created_at: new Date()
    }
  }

  return {
    analyzeComment,
    filterAndSaveComment,
    spamWords
  }
}
