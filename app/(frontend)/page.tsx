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
    gradient: 'from-blue-500 via-cyan-400 to-teal-500',
    iconBg: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    title: 'AI成长',
    description: '探索AI世界，记录学习与实践',
    icon: Brain,
    href: '/ai',
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    iconBg: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    title: '体悟成长',
    description: '生活感悟，成长轨迹',
    icon: Heart,
    href: '/insights',
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    iconBg: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    title: '关于我',
    description: '了解更多关于我的信息',
    icon: User,
    href: '/about',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    iconBg: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
    iconColor: 'text-green-600 dark:text-green-400',
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
        transition={{ duration: 0.6 }}
        className="text-center mb-20 md:mb-28"
      >
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          ✨ 持续更新中
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            欢迎来到
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            我的个人空间
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          这里记录着我的学习历程、思考感悟与成长足迹<br />
          与你分享知识、经验和人生感悟
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/reading"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105 px-8 py-3.5 rounded-xl font-medium transition-all duration-300"
          >
            开始探索
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-card border-2 border-border hover:border-primary text-foreground hover:text-primary px-8 py-3.5 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
          >
            关于我
          </Link>
        </div>
      </motion.div>

      {/* Modules Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-20"
      >
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <motion.div key={module.href} variants={item}>
              <Link href={module.href}>
                <div className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card/50 backdrop-blur-sm p-8 hover:shadow-2xl hover:border-primary/50 transition-all duration-500 h-full hover:-translate-y-2">
                  {/* 渐变背景装饰 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${module.iconBg} flex items-center justify-center ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300`}>
                        <Icon className={`w-8 h-8 ${module.iconColor}`} />
                      </div>
                      <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {module.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {module.description}
                      </p>
                    </div>
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
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-16 md:mt-24"
      >
        <div className="relative max-w-4xl mx-auto p-8 md:p-12 rounded-3xl border-2 border-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl" />

          <div className="relative">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              创作统计
            </h2>
            <p className="text-center text-muted-foreground mb-10">持续记录，不断成长</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: '文章', value: '0+', icon: '📝', color: 'from-blue-500 to-cyan-500' },
                { label: '读书笔记', value: '0+', icon: '📚', color: 'from-purple-500 to-pink-500' },
                { label: 'AI 实践', value: '0+', icon: '🤖', color: 'from-orange-500 to-red-500' },
                { label: '生活感悟', value: '0+', icon: '💭', color: 'from-green-500 to-emerald-500' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="group text-center p-4 rounded-2xl hover:bg-card/50 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className={`text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
