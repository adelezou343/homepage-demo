import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // 获取第一个 Profile（假设只有一个）
    const profile = await prisma.profile.findFirst()

    if (!profile) {
      // 如果没有 profile，返回默认数据
      return NextResponse.json({
        name: '您的名字',
        bio: '这是您的个人简介，请在后台管理系统中编辑。',
        avatar: null,
        website: null,
        email: null,
      })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}
