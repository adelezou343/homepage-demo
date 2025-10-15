import { prisma } from '@/lib/prisma'
import { InsightCard } from '@/components/cards/insight-card'

async function getInsights() {
  const insights = await prisma.insight.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
  return insights
}

export default async function InsightsPage() {
  const insights = await getInsights()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">体悟成长</h1>
        <p className="text-muted-foreground">
          记录生活中的思考与感悟，见证成长的每一步
        </p>
      </div>

      {insights.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            暂无体悟记录，敬请期待...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      )}
    </div>
  )
}
