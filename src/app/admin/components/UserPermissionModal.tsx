import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface UserPermissionModalProps {
  isOpen: boolean
  onClose: () => void
  user: { id: number; username: string; name: string; createdAt: string; pages: string[]; apis: string[] } | null
  onSave: (userId: number, pages: string[], apis: string[]) => void
}

const allPages = ['首页', '机场管理', '异常管理', '任务管理']
const allApis = ['获取用户信息', '更新机场状态', '获取异常列表', '上传图片', '执行任务']

export function UserPermissionModal({ isOpen, onClose, user, onSave }: UserPermissionModalProps) {
  const [selectedPages, setSelectedPages] = useState<string[]>([])
  const [selectedApis, setSelectedApis] = useState<string[]>([])

  useEffect(() => {
    if (user) {
      setSelectedPages(user.pages)
      setSelectedApis(user.apis)
    }
  }, [user])

  const handleSave = () => {
    if (user) {
      onSave(user.id, selectedPages, selectedApis)
      onClose()
    }
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑用户权限</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            <Label>用户名:</Label>
            <span>{user.username}</span>
            <Label>姓名:</Label>
            <span>{user.name}</span>
            <Label>创建时间:</Label>
            <span>{new Date(user.createdAt).toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label className="font-bold">可访问页面</Label>
            {allPages.map((page) => (
              <div key={page} className="flex items-center space-x-2">
                <Checkbox
                  id={`page-${page}`}
                  checked={selectedPages.includes(page)}
                  onCheckedChange={(checked) => {
                    setSelectedPages(prev =>
                      checked
                        ? [...prev, page]
                        : prev.filter(p => p !== page)
                    )
                  }}
                />
                <Label htmlFor={`page-${page}`}>{page}</Label>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label className="font-bold">可访问API</Label>
            {allApis.map((api) => (
              <div key={api} className="flex items-center space-x-2">
                <Checkbox
                  id={`api-${api}`}
                  checked={selectedApis.includes(api)}
                  onCheckedChange={(checked) => {
                    setSelectedApis(prev =>
                      checked
                        ? [...prev, api]
                        : prev.filter(a => a !== api)
                    )
                  }}
                />
                <Label htmlFor={`api-${api}`}>{api}</Label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>取消</Button>
          <Button type="button" onClick={handleSave}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

