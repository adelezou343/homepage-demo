const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🔐 创建管理员账户...')

  const hashedPassword = await bcrypt.hash('admin123', 10)

  // 检查是否已存在管理员
  const existing = await prisma.admin.findUnique({
    where: { username: 'admin' },
  })

  if (existing) {
    console.log('⚠️  管理员账户已存在')
    console.log('账号: admin')
    console.log('密码: admin123')
    return
  }

  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
    },
  })

  console.log('✅ 管理员账户创建成功！')
  console.log('\n📋 登录信息：')
  console.log('账号: admin')
  console.log('密码: admin123')
  console.log('\n🔗 登录地址: http://localhost:3000/admin/login')
}

main()
  .catch((e) => {
    console.error('❌ 错误:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
