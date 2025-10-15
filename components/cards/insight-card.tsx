import Link from 'next/link'
import Image from 'next/image'
import { Heart, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface InsightCardProps {
  insight: {
    id: string
    title: string
    mood: string | null
    coverImage: string | null
    createdAt: Date | string
  }
}

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <Link href={`/insights/${insight.id}`}>
      <div className="group h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Cover Image */}
        <div className="relative w-full h-48 bg-gradient-to-br from-orange-500/10 to-red-500/10 overflow-hidden">
          {insight.coverImage ? (
            <Image
              src={insight.coverImage}
              alt={insight.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Heart className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
          {/* Mood Badge */}
          {insight.mood && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium">
              {insight.mood}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {insight.title}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(insight.createdAt)}
          </div>
        </div>
      </div>
    </Link>
  )
}
