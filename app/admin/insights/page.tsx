import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Edit, Trash2, Plus } from 'lucide-react'

async function getInsights() {
  return await prisma.insight.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export default async function AdminInsightsPage() {
  const insights = await getInsights()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">体悟日记管理</h1>
          <p className="text-muted-foreground">共 {insights.length} 篇日记</p>
        </div>
        <Link
          href="/admin/insights/new"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          新建日记
        </Link>
      </div>

      {/* 列表 */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-6 py-3 font-medium">标题</th>
              <th className="text-left px-6 py-3 font-medium">心情</th>
              <th className="text-left px-6 py-3 font-medium">状态</th>
              <th className="text-left px-6 py-3 font-medium">创建时间</th>
              <th className="text-right px-6 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {insights.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  暂无日记，点击右上角新建
                </td>
              </tr>
            ) : (
              insights.map((insight) => (
                <tr key={insight.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="font-medium">{insight.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    {insight.mood && (
                      <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-orange-500/10 text-orange-600">
                        {insight.mood}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                        insight.published
                          ? 'bg-green-500/10 text-green-600'
                          : 'bg-gray-500/10 text-gray-600'
                      }`}
                    >
                      {insight.published ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {formatDate(insight.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/insights/${insight.id}`}
                        className="p-2 hover:bg-accent rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 hover:bg-accent rounded-lg transition-colors text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
