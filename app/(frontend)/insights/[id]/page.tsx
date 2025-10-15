import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { formatDate } from '@/lib/utils'
import { Calendar, Heart } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getInsight(id: string) {
  try {
    const insight = await prisma.insight.findUnique({
      where: { id },
    })

    if (!insight || !insight.published) {
      notFound()
    }

    return insight
  } catch (error) {
    console.error('Failed to fetch insight:', error)
    notFound()
  }
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const insight = await getInsight(id)

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Cover Image */}
      {insight.coverImage && (
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={insight.coverImage}
            alt={insight.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 mb-4">
          {insight.mood && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium">
              <Heart className="w-3.5 h-3.5" />
              {insight.mood}
            </span>
          )}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(insight.createdAt)}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{insight.title}</h1>
      </div>

      {/* Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown>{insight.content}</ReactMarkdown>
      </article>

      {/* Additional Images */}
      {insight.images && JSON.parse(insight.images).length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">相关图片</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {JSON.parse(insight.images).map((img: string, idx: number) => (
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
