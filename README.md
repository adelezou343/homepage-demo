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

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 3. 添加内容

使用 Prisma Studio 管理数据：

```bash
npx prisma studio
```

详细使用指南请查看 [GUIDE.md](./GUIDE.md)

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
