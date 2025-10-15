import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ReadingCardProps {
  note: {
    id: string
    title: string
    bookName: string
    author: string | null
    coverImage: string | null
    createdAt: Date | string
  }
}

export function ReadingCard({ note }: ReadingCardProps) {
  return (
    <Link href={`/reading/${note.id}`}>
      <div className="group h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Cover Image */}
        <div className="relative w-full h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 overflow-hidden">
          {note.coverImage ? (
            <Image
              src={note.coverImage}
              alt={note.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {note.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            《{note.bookName}》{note.author && ` · ${note.author}`}
          </p>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(note.createdAt)}
          </div>
        </div>
      </div>
    </Link>
  )
}
