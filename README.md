# 📝 个人网站项目

一个基于 Next.js 15 构建的现代化个人网站，支持读书笔记、AI 探索、生活感悟等内容分享。

## ✨ 特性

- 🎨 **现代化设计** - 简洁美观的 UI 界面
- 🌓 **主题切换** - 支持深色/浅色模式
- 📱 **响应式布局** - 完美适配移动端和桌面端
- 📚 **内容模块**
  - 读书笔记 - 记录阅读心得
  - AI 成长 - 4 个分类（副业、技巧、智能体、编程）
  - 体悟成长 - 生活感悟日记
  - 个人介绍 - 展示个人信息
- ✍️ **Markdown 支持** - 使用 Markdown 编写内容
- 🎭 **动画效果** - 流畅的页面过渡动画

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS
- **数据库**: Prisma + SQLite
- **动画**: Framer Motion
- **Markdown**: React Markdown
- **图标**: Lucide React

## 🚀 快速开始

### 1. 环境配置

复制 `.env.example` 为 `.env`：

```bash
cp .env.example .env
```

### 2. 安装依赖

```bash
npm install
```

### 3. 初始化数据库

```bash
# 生成 Prisma Client
npx prisma generate

# 初始化数据库
npx prisma db push

# 创建管理员账号（账号：admin，密码：admin123）
node prisma/create-admin.js

# （可选）导入测试数据
node prisma/seed.js
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 5. 访问后台管理

访问 [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

- 用户名：`admin`
- 密码：`admin123`

## 🌐 部署到 Vercel

### 重要提示

⚠️ **生产环境必须使用 PostgreSQL**，SQLite 不支持 Vercel 部署。

### 步骤 1：准备数据库

选择一个 PostgreSQL 数据库服务：
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) ⭐ 推荐
- [Neon](https://neon.tech/) - 免费额度大
- [Supabase](https://supabase.com/) - 功能丰富
- [Railway](https://railway.app/) - 简单易用

获取 PostgreSQL 连接字符串，格式类似：
```
postgresql://user:password@host:5432/database?sslmode=require
```

### 步骤 2：部署到 Vercel

#### 方式一：通过 Vercel Dashboard

1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 在 **Environment Variables** 中添加：
   ```
   DATABASE_URL=postgresql://...（你的 PostgreSQL 连接字符串）
   JWT_SECRET=your-random-secret-key-here
   ```
5. 点击 "Deploy"

#### 方式二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 添加环境变量
vercel env add DATABASE_URL production
# 输入你的 PostgreSQL 连接字符串

vercel env add JWT_SECRET production
# 输入随机密钥
```

### 步骤 3：初始化生产数据库

部署成功后，在本地运行：

```bash
# 使用生产数据库连接字符串
DATABASE_URL="postgresql://..." npx prisma db push

# 创建管理员账号（可选）
DATABASE_URL="postgresql://..." node prisma/create-admin.js
```

### 本地开发配置

如果想在本地使用 SQLite：

1. 编辑 `prisma/schema.prisma`，修改数据源：
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

2. 重新生成 Prisma Client：
```bash
npx prisma generate
npx prisma db push
```



## 📁 项目结构

```
├── app/
│   ├── (frontend)/      # 前台页面
│   ├── api/             # API 路由
│   └── layout.tsx       # 根布局
├── components/          # React 组件
├── lib/                 # 工具库
├── prisma/              # 数据库配置
└── public/              # 静态资源
```

## 🎯 核心功能

### 首页
- Hero 展示区
- 模块导航卡片
- 统计数据展示

### 内容模块
- 卡片式列表展示
- Markdown 内容渲染
- 图片支持
- 分类筛选（AI 模块）

### 主题系统
- 深色/浅色主题
- 系统主题跟随
- 平滑过渡效果

## 📝 待开发

- [ ] 后台管理系统
- [ ] 图片上传功能
- [ ] 评论系统（可选）
- [ ] 搜索功能
- [ ] RSS 订阅

## 🔧 开发命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm start        # 启动生产服务器
```

## 📄 许可证

MIT

---

如需详细的使用教程，请查看 [使用指南](./GUIDE.md)
