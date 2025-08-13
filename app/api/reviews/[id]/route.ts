import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { deleteDoc, doc } from 'firebase/firestore'

// DELETE: Yorum sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const reviewRef = doc(db, 'reviews', id)
    await deleteDoc(reviewRef)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    )
  }
}
