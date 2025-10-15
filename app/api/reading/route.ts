import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '9')
    const skip = (page - 1) * limit

    const [notes, total] = await Promise.all([
      prisma.readingNote.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.readingNote.count({ where: { published: true } }),
    ])

    return NextResponse.json({
      notes,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching reading notes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reading notes' },
      { status: 500 }
    )
  }
}
