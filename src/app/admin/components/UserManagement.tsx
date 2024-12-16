'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2, Edit } from 'lucide-react'
import { UserPermissionModal } from './UserPermissionModal'

// 更新模拟数据
const initialUsers = [
  { id: 1, username: 'user1', name: '张三', createdAt: '2023-06-01T10:00:00Z', pages: ['首页', '机场管理'], apis: ['获取用户信息', '更新机场状态'] },
  { id: 2, username: 'user2', name: '李四', createdAt: '2023-06-02T14:30:00Z', pages: ['首页', '异常管理'], apis: ['获取异常列表', '上传图片'] },
]

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)

  const handleAddUser = () => {
    // 这里应该打开一个添加用户的模态框或跳转到添加用户页面
    console.log('添加用户')
  }

  const handleEditUser = (user: typeof users[0]) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('确定要删除这个用户吗？')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
    }
  }

  const handleSavePermissions = (userId: number, pages: string[], apis: string[]) => {
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === userId ? { ...user, pages, apis } : user
    ))
  }

  return (
    <div>
      <div className="mb-4">
        <Button onClick={handleAddUser}>
          <PlusCircle className="mr-2 h-4 w-4" />
          添加用户
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>用户名</TableHead>
            <TableHead>姓名</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>可访问页面</TableHead>
            <TableHead>可访问API</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
              <TableCell>{user.pages.join(', ')}</TableCell>
              <TableCell>{user.apis.join(', ')}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UserPermissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={handleSavePermissions}
      />
    </div>
  )
}

