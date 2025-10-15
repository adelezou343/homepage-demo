import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

// 创建体悟日记
export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { title, mood, content, published, coverImage } = data

    const insight = await prisma.insight.create({
      data: {
        title,
        mood: mood || null,
        content,
        published: published || false,
        coverImage: coverImage || null,
      },
    })

    return NextResponse.json(insight)
  } catch (error) {
    console.error('Error creating insight:', error)
    return NextResponse.json(
      { error: 'Failed to create insight' },
      { status: 500 }
    )
  }
}
