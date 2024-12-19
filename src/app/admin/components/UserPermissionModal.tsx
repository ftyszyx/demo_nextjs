<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>编辑用户权限</DialogTitle>
      </DialogHeader>
      
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-2 gap-2">
          <Label>用户名:</Label>
          <span>{{ user?.username }}</span>
          <Label>姓名:</Label>
          <span>{{ user?.name }}</span>
          <Label>创建时间:</Label>
          <span>{{ user?.createdAt ? new Date(user.createdAt).toLocaleString() : '' }}</span>
        </div>

        <div class="grid grid-cols-1 gap-2">
          <Label class="font-bold">可访问页面</Label>
          <div v-for="page in allPages" :key="page" class="flex items-center space-x-2">
            <Checkbox
              :id="`page-${page}`"
              :checked="selectedPages.includes(page)"
              @update:checked="updatePages(page, $event)"
            />
            <Label :for="`page-${page}`">{{ page }}</Label>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-2">
          <Label class="font-bold">可访问API</Label>
          <div v-for="api in allApis" :key="api" class="flex items-center space-x-2">
            <Checkbox
              :id="`api-${api}`"
              :checked="selectedApis.includes(api)"
              @update:checked="updateApis(api, $event)"
            />
            <Label :for="`api-${api}`">{{ api }}</Label>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="secondary" @click="$emit('update:open', false)">取消</Button>
        <Button @click="handleSave">保存</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface User {
  id: number
  username: string
  name: string
  createdAt: string
  pages: string[]
  apis: string[]
}

const props = defineProps<{
  open: boolean
  user: User | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'save': [userId: number, pages: string[], apis: string[]]
}>()

const allPages = ['首页', '机场管理', '异常管理', '任务管理']
const allApis = ['获取用户信息', '更新机场状态', '获取异常列表', '上传图片', '执行任务']

const selectedPages = ref<string[]>([])
const selectedApis = ref<string[]>([])

// 监听 user 变化更新选中状态
watch(() => props.user, (newUser) => {
  if (newUser) {
    selectedPages.value = [...newUser.pages]
    selectedApis.value = [...newUser.apis]
  }
}, { immediate: true })

const updatePages = (page: string, checked: boolean) => {
  if (checked) {
    selectedPages.value.push(page)
  } else {
    selectedPages.value = selectedPages.value.filter(p => p !== page)
  }
}

const updateApis = (api: string, checked: boolean) => {
  if (checked) {
    selectedApis.value.push(api)
  } else {
    selectedApis.value = selectedApis.value.filter(a => a !== api)
  }
}

const handleSave = () => {
  if (props.user) {
    emit('save', props.user.id, selectedPages.value, selectedApis.value)
    emit('update:open', false)
  }
}
</script>