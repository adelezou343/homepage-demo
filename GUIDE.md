# 个人网站项目 - 使用指南

## 🎉 项目概述

这是一个基于 Next.js 15 构建的现代化个人网站，支持深色/浅色主题切换，完全响应式设计。

## ✅ 已完成功能

### 前台功能
- ✅ **首页** - 现代化 Hero 区域 + 模块入口
- ✅ **我的页面** - 个人信息展示
- ✅ **读书模块** - 读书笔记列表 + 详情页
- ✅ **AI 成长模块** - 4 个分类（副业/技巧/智能体/编程）+ 文章列表 + 详情
- ✅ **体悟成长模块** - 日记列表 + 详情页
- ✅ **主题切换** - 深色/浅色模式
- ✅ **响应式导航栏** - 支持移动端

### 技术栈
- Next.js 15 + React 19 + TypeScript
- TailwindCSS (主题系统)
- Prisma ORM + SQLite
- Framer Motion (动画)
- React Markdown (Markdown 渲染)

## 🚀 快速开始

### 1. 启动开发服务器
```bash
npm run dev
```

访问：http://localhost:3000

### 2. 添加测试数据

使用 Prisma Studio 可视化管理数据库：

```bash
npx prisma studio
```

浏览器会自动打开 http://localhost:5555

#### 添加个人信息 (Profile)
1. 点击 "Profile" 表
2. 点击 "Add record"
3. 填写：
   - name: 你的名字
   - bio: 个人简介
   - email: 邮箱（可选）
   - website: 网站链接（可选）
4. 点击 "Save 1 change"

#### 添加读书笔记 (ReadingNote)
1. 点击 "ReadingNote" 表
2. 点击 "Add record"
3. 填写：
   - title: 笔记标题
   - bookName: 书名
   - author: 作者（可选）
   - content: Markdown 格式内容
   - published: 勾选（表示发布）
4. 点击 "Save 1 change"

#### 添加 AI 文章 (AIArticle)
1. 点击 "AIArticle" 表
2. 点击 "Add record"
3. 填写：
   - title: 文章标题
   - content: Markdown 格式内容
   - category: 选择分类
     - SIDE_HUSTLE (AI副业)
     - TIPS (AI技巧)
     - AGENTS (AI智能体)
     - CODING (AI编程)
   - published: 勾选
4. 点击 "Save 1 change"

#### 添加体悟日记 (Insight)
1. 点击 "Insight" 表
2. 点击 "Add record"
3. 填写：
   - title: 标题
   - content: Markdown 格式内容
   - mood: 心情标签（如：开心、思考、感悟）
   - published: 勾选
4. 点击 "Save 1 change"

### 3. Markdown 内容示例

```markdown
# 这是一个标题

这是正文内容，支持 **粗体** 和 *斜体*。

## 二级标题

- 列表项 1
- 列表项 2
- 列表项 3

### 代码示例

\`\`\`javascript
console.log('Hello World')
\`\`\`

> 这是引用内容
```

## 📁 项目结构

```
homepage-demo/
├── app/
│   ├── (frontend)/          # 前台页面
│   │   ├── page.tsx         # 首页
│   │   ├── about/           # 我的页面
│   │   ├── reading/         # 读书模块
│   │   ├── ai/              # AI成长模块
│   │   └── insights/        # 体悟成长
│   ├── api/                 # API 路由
│   └── layout.tsx           # 根布局
├── components/              # 组件
│   ├── ui/                  # UI 基础组件
│   ├── layout/              # 布局组件
│   └── cards/               # 卡片组件
├── lib/                     # 工具库
│   ├── prisma.ts           # Prisma 客户端
│   └── utils.ts            # 工具函数
├── prisma/                  # 数据库
│   ├── schema.prisma       # 数据模型
│   └── dev.db              # SQLite 数据库
└── public/                  # 静态资源
```

## 🎨 可访问页面

- `/` - 首页
- `/about` - 我的页面
- `/reading` - 读书笔记列表
- `/reading/[id]` - 读书笔记详情
- `/ai` - AI 成长（带分类筛选）
- `/ai/[id]` - AI 文章详情
- `/insights` - 体悟成长列表
- `/insights/[id]` - 体悟详情

## ⏳ 待开发功能

1. **后台管理系统**
   - 登录认证
   - 内容管理（增删改查）
   - 图片上传

2. **图片上传功能**
   - 封面图上传
   - 内容图片上传

3. **优化项**
   - 滚动加载优化
   - SEO 优化
   - 性能优化

## 🔧 常用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 打开 Prisma Studio
npx prisma studio

# 重置数据库（清空所有数据）
npx prisma db push --force-reset

# 生成 Prisma Client
npx prisma generate
```

## 🐛 常见问题

### 1. 页面显示"暂无内容"
- 原因：数据库中没有数据
- 解决：使用 `npx prisma studio` 添加测试数据

### 2. 数据库错误
- 原因：Prisma Client 未生成
- 解决：运行 `npx prisma generate`

### 3. 主题切换不生效
- 原因：浏览器缓存
- 解决：刷新页面或清除缓存

## 📝 下一步

建议按以下顺序继续开发：

1. **添加测试数据** - 使用 Prisma Studio 添加一些示例内容
2. **测试所有页面** - 确保功能正常
3. **开发后台管理** - 方便日后添加内容
4. **部署到生产环境** - 使用 Vercel/Netlify

## 🎯 部署建议

推荐使用 Vercel 部署：

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 修改数据库为 PostgreSQL（生产环境）
4. 配置环境变量

---

祝使用愉快！🎉
