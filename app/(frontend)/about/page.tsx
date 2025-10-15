import { prisma } from '@/lib/prisma'
import { Mail, Globe, User } from 'lucide-react'
import Image from 'next/image'

async function getProfile() {
  const profile = await prisma.profile.findFirst()
  return profile || {
    name: '您的名字',
    bio: '这是您的个人简介，请在后台管理系统中编辑。\n\n' +
      '您可以在这里介绍自己的背景、兴趣爱好、专业技能等。\n\n' +
      '这个网站是您记录学习、分享思考的个人空间。',
    avatar: null,
    website: null,
    email: null,
  }
}

export default async function AboutPage() {
  const profile = await getProfile()

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-card border border-border rounded-xl p-8 md:p-12">
        {/* Avatar and Name */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
          <div className="flex-shrink-0">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={150}
                height={150}
                className="rounded-full border-4 border-primary"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <User className="w-16 h-16 md:w-20 md:h-20 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {profile.name}
            </h1>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{profile.email}</span>
                </a>
              )}
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">个人网站</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mb-4">关于我</h2>
          <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {profile.bio}
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-background rounded-lg p-6 border border-border">
            <h3 className="font-semibold text-lg mb-3">兴趣爱好</h3>
            <p className="text-muted-foreground text-sm">
              阅读、写作、AI 技术探索、持续学习
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border">
            <h3 className="font-semibold text-lg mb-3">关注领域</h3>
            <p className="text-muted-foreground text-sm">
              人工智能、个人成长、知识管理、技术实践
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
