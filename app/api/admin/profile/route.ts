import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

// 获取个人信息
export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await prisma.profile.findFirst()
    return NextResponse.json(profile || null)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

// 创建或更新个人信息
export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { name, bio, email, website, avatar } = data

    // 检查是否已存在
    const existing = await prisma.profile.findFirst()

    let profile
    if (existing) {
      // 更新
      profile = await prisma.profile.update({
        where: { id: existing.id },
        data: {
          name,
          bio,
          email: email || null,
          website: website || null,
          avatar: avatar || null,
        },
      })
    } else {
      // 创建
      profile = await prisma.profile.create({
        data: {
          name,
          bio,
          email: email || null,
          website: website || null,
          avatar: avatar || null,
        },
      })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error saving profile:', error)
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    )
  }
}
