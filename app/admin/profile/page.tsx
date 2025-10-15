'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Globe, Loader2, Save } from 'lucide-react'

interface ProfileData {
  id?: string
  name: string
  bio: string
  email: string
  website: string
  avatar: string
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    bio: '',
    email: '',
    website: '',
    avatar: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/admin/profile')
      const data = await res.json()
      if (data) {
        setProfile({
          id: data.id,
          name: data.name || '',
          bio: data.bio || '',
          email: data.email || '',
          website: data.website || '',
          avatar: data.avatar || '',
        })
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      if (!res.ok) {
        throw new Error('Failed to save')
      }

      const data = await res.json()
      setProfile({ ...profile, id: data.id })
      setMessage('保存成功！')
      setTimeout(() => setMessage(''), 3000)
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">个人信息管理</h1>
          <p className="text-muted-foreground">编辑您的个人资料</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8">
          {message && (
            <div className={`mb-6 p-3 rounded-lg ${message.includes('成功') ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
              {message}
            </div>
          )}

          <div className="space-y-6">
            {/* 名字 */}
            <div>
              <label className="block text-sm font-medium mb-2">
                姓名 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="请输入您的名字"
                  required
                />
              </div>
            </div>

            {/* 简介 */}
            <div>
              <label className="block text-sm font-medium mb-2">个人简介</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary min-h-32"
                placeholder="介绍一下自己吧..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                支持换行，前台会保留格式
              </p>
            </div>

            {/* 邮箱 */}
            <div>
              <label className="block text-sm font-medium mb-2">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* 网站 */}
            <div>
              <label className="block text-sm font-medium mb-2">个人网站</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="url"
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* 头像URL */}
            <div>
              <label className="block text-sm font-medium mb-2">头像 URL</label>
              <input
                type="url"
                value={profile.avatar}
                onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/avatar.jpg"
              />
              {profile.avatar && (
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground mb-2">头像预览：</p>
                  <img
                    src={profile.avatar}
                    alt="Avatar preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>

            {/* 提交按钮 */}
            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                disabled={saving || !profile.name}
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    保存中...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    保存信息
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
