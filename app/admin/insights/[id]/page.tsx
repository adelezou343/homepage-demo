'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Loader2, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface FormData {
  title: string
  mood: string
  content: string
  published: boolean
  coverImage: string
}

export default function InsightEditPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'

  const [formData, setFormData] = useState<FormData>({
    title: '',
    mood: '',
    content: '',
    published: false,
    coverImage: '',
  })
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isNew) {
      fetchInsight()
    }
  }, [])

  const fetchInsight = async () => {
    try {
      const res = await fetch(`/api/insights/${params.id}`)
      const data = await res.json()
      if (data) {
        setFormData({
          title: data.title || '',
          mood: data.mood || '',
          content: data.content || '',
          published: data.published || false,
          coverImage: data.coverImage || '',
        })
      }
    } catch (error) {
      console.error('Failed to fetch insight:', error)
      setMessage('加载失败')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const url = isNew ? '/api/admin/insights' : `/api/admin/insights/${params.id}`
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to save')
      }

      setMessage('保存成功！')
      setTimeout(() => {
        router.push('/admin/insights')
      }, 1000)
    } catch (error) {
      setMessage('保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href="/admin/insights"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          返回列表
        </Link>
        <h1 className="text-3xl font-bold">{isNew ? '新建' : '编辑'} 体悟日记</h1>
      </div>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8">
          {message && (
            <div className={`mb-6 p-3 rounded-lg ${message.includes('成功') ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
              {message}
            </div>
          )}

          <div className="space-y-6">
            {/* 标题 */}
            <div>
              <label className="block text-sm font-medium mb-2">
                日记标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="例如：关于时间管理的一些思考"
                required
              />
            </div>

            {/* 心情标签 */}
            <div>
              <label className="block text-sm font-medium mb-2">心情标签</label>
              <input
                type="text"
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="例如：思考、感恩、平静"
              />
              <p className="text-xs text-muted-foreground mt-1">
                选填，可以用来描述当时的心情状态
              </p>
            </div>

            {/* 封面图 */}
            <div>
              <label className="block text-sm font-medium mb-2">封面图 URL</label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            {/* 内容 */}
            <div>
              <label className="block text-sm font-medium mb-2">
                日记内容 (支持 Markdown) <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                rows={20}
                placeholder="# 标题&#10;&#10;## 章节&#10;&#10;这是内容...&#10;&#10;**粗体** *斜体*"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                支持 Markdown 格式：# 标题, **粗体**, *斜体*, - 列表等
              </p>
            </div>

            {/* 发布状态 */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 rounded border-border"
              />
              <label htmlFor="published" className="text-sm font-medium cursor-pointer">
                发布到前台（取消勾选则保存为草稿）
              </label>
            </div>

            {/* 按钮 */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    保存中...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    保存日记
                  </>
                )}
              </button>
              <Link
                href="/admin/insights"
                className="px-6 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                取消
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
