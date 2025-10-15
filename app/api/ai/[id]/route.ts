import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const article = await prisma.aIArticle.findUnique({
      where: { id },
    })

    if (!article || !article.published) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching AI article:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI article' },
      { status: 500 }
    )
  }
}
