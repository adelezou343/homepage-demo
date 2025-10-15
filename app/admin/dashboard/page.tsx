import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Brain, Heart, User, FileText } from 'lucide-react'

async function getStats() {
  const [readingCount, aiCount, insightCount, profile] = await Promise.all([
    prisma.readingNote.count(),
    prisma.aIArticle.count(),
    prisma.insight.count(),
    prisma.profile.findFirst(),
  ])

  return {
    readingCount,
    aiCount,
    insightCount,
    hasProfile: !!profile,
  }
}

export default async function AdminDashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect('/admin/login')
  }

  const stats = await getStats()

  const modules = [
    {
      title: '读书笔记',
      count: stats.readingCount,
      icon: BookOpen,
      href: '/admin/reading',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'AI 文章',
      count: stats.aiCount,
      icon: Brain,
      href: '/admin/ai',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: '体悟日记',
      count: stats.insightCount,
      icon: Heart,
      href: '/admin/insights',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: '个人信息',
      count: stats.hasProfile ? 1 : 0,
      icon: User,
      href: '/admin/profile',
      color: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">后台管理</h1>
        <p className="text-muted-foreground">
          欢迎回来，{session.username}！
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <Link key={module.href} href={module.href}>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold">{module.count}</div>
                </div>
                <h3 className="font-semibold">{module.title}</h3>
              </div>
            </Link>
          )
        })}
      </div>

      {/* 快捷操作 */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          快捷操作
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/reading?action=new"
            className="px-4 py-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-center font-medium"
          >
            + 新建读书笔记
          </Link>
          <Link
            href="/admin/ai?action=new"
            className="px-4 py-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-center font-medium"
          >
            + 新建 AI 文章
          </Link>
          <Link
            href="/admin/insights?action=new"
            className="px-4 py-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-center font-medium"
          >
            + 新建体悟日记
          </Link>
        </div>
      </div>
    </div>
  )
}
