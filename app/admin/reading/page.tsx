import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Edit, Trash2, Plus } from 'lucide-react'

async function getReadingNotes() {
  return await prisma.readingNote.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export default async function AdminReadingPage() {
  const notes = await getReadingNotes()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">读书笔记管理</h1>
          <p className="text-muted-foreground">共 {notes.length} 篇笔记</p>
        </div>
        <Link
          href="/admin/reading/new"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          新建笔记
        </Link>
      </div>

      {/* 列表 */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-6 py-3 font-medium">标题</th>
              <th className="text-left px-6 py-3 font-medium">书名</th>
              <th className="text-left px-6 py-3 font-medium">状态</th>
              <th className="text-left px-6 py-3 font-medium">创建时间</th>
              <th className="text-right px-6 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {notes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  暂无笔记，点击右上角新建
                </td>
              </tr>
            ) : (
              notes.map((note: any) => (
                <tr key={note.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="font-medium">{note.title}</div>
                  </td>
                  <td className="px-6 py-4">{note.bookName}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                        note.published
                          ? 'bg-green-500/10 text-green-600'
                          : 'bg-gray-500/10 text-gray-600'
                      }`}
                    >
                      {note.published ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {formatDate(note.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/reading/${note.id}`}
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
