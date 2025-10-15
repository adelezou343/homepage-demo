'use client'

import { useState, useEffect } from 'react'
import { AICard } from '@/components/cards/ai-card'
import { Loader2 } from 'lucide-react'

type Category = 'ALL' | 'SIDE_HUSTLE' | 'TIPS' | 'AGENTS' | 'CODING'

const categories = [
  { value: 'ALL' as Category, label: '全部' },
  { value: 'SIDE_HUSTLE' as Category, label: 'AI副业' },
  { value: 'TIPS' as Category, label: 'AI技巧' },
  { value: 'AGENTS' as Category, label: 'AI智能体' },
  { value: 'CODING' as Category, label: 'AI编程' },
]

interface Article {
  id: string
  title: string
  category: string
  coverImage: string | null
  createdAt: string
}

export default function AIPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [selectedCategory])

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const url = selectedCategory === 'ALL'
        ? '/api/ai'
        : `/api/ai?category=${selectedCategory}`
      const res = await fetch(url)
      const data = await res.json()
      setArticles(data.articles || [])
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">AI 成长</h1>
        <p className="text-muted-foreground">
          探索 AI 世界，记录学习与实践
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === cat.value
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            暂无文章，敬请期待...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <AICard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
