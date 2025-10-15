import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { formatDate } from '@/lib/utils'
import { Calendar, Tag } from 'lucide-react'

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

async function getAIArticle(id: string) {
  const article = await prisma.aIArticle.findUnique({
    where: { id },
  })

  if (!article || !article.published) {
    notFound()
  }

  return article
}

export default async function AIArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = await getAIArticle(id)

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Cover Image */}
      {article.coverImage && (
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${categoryColors[article.category]} text-white text-sm font-medium`}>
            <Tag className="w-3.5 h-3.5" />
            {categoryLabels[article.category]}
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(article.createdAt)}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
      </div>

      {/* Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </article>

      {/* Additional Images */}
      {article.images && JSON.parse(article.images).length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">相关图片</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {JSON.parse(article.images).map((img: string, idx: number) => (
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
