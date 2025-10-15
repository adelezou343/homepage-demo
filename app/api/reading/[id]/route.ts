import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const note = await prisma.readingNote.findUnique({
      where: { id },
    })

    if (!note || !note.published) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    return NextResponse.json(note)
  } catch (error) {
    console.error('Error fetching reading note:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reading note' },
      { status: 500 }
    )
  }
}
