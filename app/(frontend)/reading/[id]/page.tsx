import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { formatDate } from '@/lib/utils'
import { Calendar, BookOpen, User } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getReadingNote(id: string) {
  try {
    const note = await prisma.readingNote.findUnique({
      where: { id },
    })

    if (!note || !note.published) {
      notFound()
    }

    return note
  } catch (error) {
    console.error('Failed to fetch reading note:', error)
    notFound()
  }
}

export default async function ReadingNotePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const note = await getReadingNote(id)

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Cover Image */}
      {note.coverImage && (
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={note.coverImage}
            alt={note.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{note.title}</h1>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>《{note.bookName}》</span>
          </div>
          {note.author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{note.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(note.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </article>

      {/* Additional Images */}
      {note.images && JSON.parse(note.images).length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">相关图片</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {JSON.parse(note.images).map((img: string, idx: number) => (
              <div key={idx} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={img}
                  alt={`Image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
