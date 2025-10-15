'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Brain, Heart, User } from 'lucide-react'
import { motion } from 'framer-motion'

const modules = [
  {
    title: '读书',
    description: '记录阅读心得，分享书中智慧',
    icon: BookOpen,
    href: '/reading',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'AI成长',
    description: '探索AI世界，记录学习与实践',
    icon: Brain,
    href: '/ai',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: '体悟成长',
    description: '生活感悟，成长轨迹',
    icon: Heart,
    href: '/insights',
    color: 'from-orange-500 to-red-500',
  },
  {
    title: '关于我',
    description: '了解更多关于我的信息',
    icon: User,
    href: '/about',
    color: 'from-green-500 to-emerald-500',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 md:mb-24"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
          欢迎来到我的个人空间
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          这里记录着我的学习历程、思考感悟与成长足迹
        </p>
        <Link
          href="/reading"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          开始探索
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Modules Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <motion.div key={module.href} variants={item}>
              <Link href={module.href}>
                <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {module.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 md:mt-24 text-center"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { label: '文章', value: '0+' },
            { label: '读书笔记', value: '0+' },
            { label: 'AI 实践', value: '0+' },
            { label: '生活感悟', value: '0+' },
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
