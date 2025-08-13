import { useState, useEffect } from 'react'
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc,
  serverTimestamp 
} from 'firebase/firestore'
import { db, type Review, type CreateReview } from '@/lib/firebase'
import { useSpamFilter } from './use-spam-filter'

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { filterAndSaveComment } = useSpamFilter()

  // Fetch all approved reviews with real-time updates
  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      where('approved', '==', true),
      orderBy('created_at', 'desc')
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviewsData: Review[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        reviewsData.push({
          id: doc.id,
          name: data.name,
          text: data.text,
          rating: data.rating,
          created_at: data.created_at?.toDate() || new Date(),
          approved: data.approved,
          isSpam: data.isSpam || false,
          spamScore: data.spamScore || 0,
          spamReasons: data.spamReasons || []
        })
      })
      setReviews(reviewsData)
      setLoading(false)
    }, (error) => {
      setError(error.message)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Add new review with spam filtering
  const addReview = async (review: CreateReview) => {
    try {
      // Spam filtreleme uygula
      const filteredComment = await filterAndSaveComment(review)
      
      const docRef = await addDoc(collection(db, 'reviews'), {
        ...filteredComment,
        created_at: serverTimestamp()
      })
      
      // Spam ise kullanıcıya bilgi ver
      if (filteredComment.isSpam) {
        return { 
          success: true, 
          id: docRef.id, 
          isSpam: true, 
          message: 'Yorumunuz spam olarak algılandı ve yayınlanmadı.' 
        }
      }
      
      return { success: true, id: docRef.id, isSpam: false }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add review')
      return { success: false, error: err }
    }
  }

  // Delete review (admin function)
  const deleteReview = async (id: string) => {
    try {
      const reviewRef = doc(db, 'reviews', id)
      await deleteDoc(reviewRef)
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete review')
      return { success: false, error: err }
    }
  }

  return {
    reviews,
    loading,
    error,
    addReview,
    deleteReview
  }
}
