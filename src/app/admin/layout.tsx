'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Key } from 'lucide-react'
import { cn } from "@/lib/utils"

// 模拟当前用户数据
const currentUser = {
  name: '张三',
  email: 'zhangsan@example.com',
  avatarUrl: '/placeholder.svg'
}

const menuItems = [
  { href: '/admin/users', label: '用户管理' },
  { href: '/admin/airports', label: '机场管理' },
  { href: '/admin/anomalies', label: '异常管理' },
  { href: '/admin/tasks', label: '机场任务管理' },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-2xl font-semibold">无人机管理系统</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>个人资料</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Key className="mr-2 h-4 w-4" />
                <span>修改密码</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>退出登录</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Sidebar */}
        <aside className="w-64 mr-6">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.href
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

