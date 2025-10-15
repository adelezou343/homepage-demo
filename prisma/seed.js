const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 开始添加测试数据...')

  // 1. 添加个人信息
  const profile = await prisma.profile.create({
    data: {
      name: '张三',
      bio: '一名热爱学习的技术爱好者，专注于 AI 领域的探索与实践。\n\n喜欢阅读、写作、分享。希望通过这个网站记录自己的成长历程，与大家交流学习心得。\n\n座右铭：持续学习，不断进步。',
      email: 'zhangsan@example.com',
      website: 'https://example.com',
      avatar: null,
    },
  })
  console.log('✅ 个人信息已添加:', profile.name)

  // 2. 添加读书笔记
  const reading1 = await prisma.readingNote.create({
    data: {
      title: '《原则》读书笔记 - 如何做出更好的决策',
      bookName: '原则',
      author: '瑞·达利欧',
      content: `# 核心观点

这本书讲述了桥水基金创始人瑞·达利欧的人生和工作原则。

## 主要收获

1. **拥抱现实，应对现实**
   - 真相是任何良好结果的基础
   - 做到极度求真、极度透明

2. **做到头脑极度开放**
   - 认识到自己的盲点
   - 三角验证自己的观点

3. **建立有效的机制**
   - 把决策制定系统化
   - 建立良好的反馈循环

## 我的思考

这本书让我意识到，建立自己的原则体系是多么重要。每个人都应该：
- 总结自己的经验教训
- 形成系统的决策方法
- 不断迭代优化

> "痛苦 + 反思 = 进步"`,
      published: true,
    },
  })
  console.log('✅ 读书笔记已添加:', reading1.title)

  const reading2 = await prisma.readingNote.create({
    data: {
      title: '《深度工作》笔记 - 如何在信息时代保持专注',
      bookName: '深度工作',
      author: '卡尔·纽波特',
      content: `# 什么是深度工作

深度工作是指在无干扰的状态下专注进行职业活动，使个人的认知能力达到极限。

## 四条准则

### 1. 工作要深入
- 建立深度工作的仪式
- 选择合适的深度工作哲学

### 2. 拥抱无聊
- 不要在等待时就掏出手机
- 有计划地使用网络

### 3. 远离社交媒体
- 评估社交媒体的价值
- 减少浅层次的娱乐

### 4. 摒弃浮浅
- 减少浮浅工作
- 固定日程工作

## 实践建议

我现在的做法：
1. 每天早上 9-12 点是深度工作时间
2. 关闭所有通知
3. 使用番茄工作法保持专注`,
      published: true,
    },
  })
  console.log('✅ 读书笔记已添加:', reading2.title)

  // 3. 添加 AI 文章
  const ai1 = await prisma.aIArticle.create({
    data: {
      title: 'ChatGPT Prompt 工程：如何写出高质量的提示词',
      category: 'TIPS',
      content: `# 什么是 Prompt 工程

Prompt 工程是一门艺术，也是一门科学。好的 Prompt 能让 AI 输出高质量的内容。

## 核心技巧

### 1. 明确角色
\`\`\`
你是一位资深的 Python 开发工程师...
\`\`\`

### 2. 提供上下文
- 背景信息
- 目标受众
- 期望风格

### 3. 给出示例
Few-shot learning 非常有效

### 4. 设定约束
- 字数限制
- 格式要求
- 输出结构

## 实用模板

**文章生成模板：**
\`\`\`
请以 [角色] 的身份，为 [目标受众] 写一篇关于 [主题] 的文章。
文章应该：
1. [要求1]
2. [要求2]
风格：[风格描述]
\`\`\`

## 总结

好的 Prompt = 清晰的角色 + 充分的上下文 + 具体的要求`,
      published: true,
    },
  })
  console.log('✅ AI 文章已添加:', ai1.title)

  const ai2 = await prisma.aIArticle.create({
    data: {
      title: 'AI 副业实战：利用 ChatGPT 做知识变现',
      category: 'SIDE_HUSTLE',
      content: `# AI 时代的知识变现

AI 工具的出现，大大降低了内容创作的门槛。

## 可行的方向

### 1. 写作变现
- 公众号文章
- 小红书笔记
- 知乎回答

### 2. 课程制作
- 录制教程视频
- 制作付费课程
- 一对一咨询

### 3. 工具开发
- Chrome 插件
- 小程序
- API 服务

## 实操案例

我的实践：
1. 每天用 ChatGPT 写 2 篇文章
2. 发布到多个平台
3. 积累粉丝后开课程

**月收入：** 从 0 到 5000+

## 关键建议

- 找到自己的细分领域
- 持续输出高质量内容
- 建立个人品牌`,
      published: true,
    },
  })
  console.log('✅ AI 文章已添加:', ai2.title)

  const ai3 = await prisma.aIArticle.create({
    data: {
      title: 'Cursor AI 编程实战：10 倍提升开发效率',
      category: 'CODING',
      content: `# Cursor：最强 AI 编程助手

Cursor 是基于 VSCode 的 AI 编程工具，集成了 GPT-4。

## 核心功能

### 1. AI 补全
- 智能代码补全
- 理解上下文
- 多行生成

### 2. AI Chat
- 直接在编辑器对话
- 解释代码
- 生成测试

### 3. AI Edit
- 选中代码修改
- 重构优化
- 修复 Bug

## 使用技巧

**快捷键：**
- \`Cmd + K\`: 快速编辑
- \`Cmd + L\`: 打开聊天
- \`Tab\`: 接受补全

**最佳实践：**
1. 写清楚注释
2. 给 AI 提供足够上下文
3. 多次迭代优化

## 实际效果

使用 Cursor 后：
- 开发速度提升 10 倍
- Bug 减少 50%
- 代码质量提升

强烈推荐！`,
      published: true,
    },
  })
  console.log('✅ AI 文章已添加:', ai3.title)

  // 4. 添加体悟成长
  const insight1 = await prisma.insight.create({
    data: {
      title: '关于持续学习的思考',
      mood: '思考',
      content: `# 学习是一场马拉松

最近一直在思考"如何保持持续学习"这个话题。

## 我的感悟

### 1. 不要追求速度
学习不是短跑，而是马拉松。重要的是：
- 保持节奏
- 持续进步
- 享受过程

### 2. 建立系统
- 每天固定时间学习
- 做好笔记和总结
- 定期复习回顾

### 3. 输出倒逼输入
- 写博客
- 做分享
- 教别人

## 最近的实践

这个月我：
1. 每天早起 1 小时学习
2. 每周写 2 篇文章
3. 每月读完 2 本书

**感受：** 虽然每天进步很小，但积累下来收获巨大。

> "日拱一卒，功不唐捐"`,
      published: true,
    },
  })
  console.log('✅ 体悟日记已添加:', insight1.title)

  const insight2 = await prisma.insight.create({
    data: {
      title: '2024 年度总结：拥抱变化，持续成长',
      mood: '感恩',
      content: `# 回顾这一年

2024 年即将结束，是时候做个年度总结了。

## 数据统计

**阅读：** 读完 24 本书
**写作：** 发布 100+ 篇文章
**学习：** 完成 5 门课程
**收入：** 副业收入达 5 位数

## 重要突破

### 1. 技术成长
- 掌握了 AI 应用开发
- 学会了 Next.js
- 理解了产品思维

### 2. 认知升级
- 建立了系统的知识管理体系
- 形成了自己的学习方法论
- 找到了适合自己的节奏

### 3. 收入增长
- 开始做知识付费
- AI 副业月入 5000+
- 实现了睡后收入

## 明年计划

1. 继续深耕 AI 领域
2. 打造个人品牌
3. 帮助更多人成长

## 感悟

最大的收获是：**找到了自己热爱并擅长的事情。**

接下来，继续努力！加油！💪`,
      published: true,
    },
  })
  console.log('✅ 体悟日记已添加:', insight2.title)

  console.log('\n🎉 测试数据添加完成！')
  console.log('\n📊 数据统计：')
  console.log('- 个人信息: 1 条')
  console.log('- 读书笔记: 2 条')
  console.log('- AI 文章: 3 条')
  console.log('- 体悟日记: 2 条')
  console.log('\n✨ 现在可以访问 http://localhost:3000 查看效果！')
}

main()
  .catch((e) => {
    console.error('❌ 错误:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
