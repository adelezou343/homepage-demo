import { prisma } from '@/lib/prisma'
import { ReadingCard } from '@/components/cards/reading-card'

async function getReadingNotes() {
  const notes = await prisma.readingNote.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
  return notes
}

export default async function ReadingPage() {
  const notes = await getReadingNotes()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">读书笔记</h1>
        <p className="text-muted-foreground">
          记录阅读过程中的思考与收获
        </p>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            暂无读书笔记，敬请期待...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <ReadingCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  )
}
