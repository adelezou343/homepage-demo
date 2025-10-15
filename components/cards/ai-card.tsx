import Link from 'next/link'
import Image from 'next/image'
import { Brain, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface AICardProps {
  article: {
    id: string
    title: string
    category: string
    coverImage: string | null
    createdAt: Date | string
  }
}

const categoryLabels: Record<string, string> = {
  SIDE_HUSTLE: 'AI副业',
  TIPS: 'AI技巧',
  AGENTS: 'AI智能体',
  CODING: 'AI编程',
}

const categoryColors: Record<string, string> = {
  SIDE_HUSTLE: 'from-green-500 to-emerald-500',
  TIPS: 'from-blue-500 to-cyan-500',
  AGENTS: 'from-purple-500 to-pink-500',
  CODING: 'from-orange-500 to-red-500',
}

export function AICard({ article }: AICardProps) {
  return (
    <Link href={`/ai/${article.id}`}>
      <div className="group h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Cover Image */}
        <div className="relative w-full h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/10 overflow-hidden">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Brain className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
          {/* Category Badge */}
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[article.category]} text-white text-xs font-medium`}>
            {categoryLabels[article.category]}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(article.createdAt)}
          </div>
        </div>
      </div>
    </Link>
  )
}
