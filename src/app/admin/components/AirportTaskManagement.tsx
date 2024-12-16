'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// 模拟数据
const tasks = [
  { id: 1, name: '航线1' },
  { id: 2, name: '航线2' },
  { id: 3, name: '航线3' },
]

export default function AirportTaskManagement() {
  const handleExecute = (taskId: number) => {
    console.log(`执行任务 ${taskId}`)
    // 这里应该添加实际的任务执行逻辑
  }

  return (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead>航线名</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(task => (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>
                <Button onClick={() => handleExecute(task.id)}>执行</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}

