<template>
  <div class="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4 space-y-4" ref="messagesContainer">
    <div v-if="isInitChat" class="flex flex-col items-center justify-center w-full">
      <div class="flex my-10 items-center justify-center size-[100px] rounded-full"
        style="background: linear-gradient(305.4deg, #fff8d4 11.32%, #ffdd2d 81.26%)">
        <Icon icon="bi:stars" class="size-9" />
      </div>
      <div class="bg-muted px-3 py-4 rounded-2xl rounded-tl-md">
        Привет! Я шоппинг-ассистент и помогу с выбором одежды
      </div>
    </div>
    <div v-for="(msg, index) in messages" :key="index" class="flex items-start gap-2"
      :class="msg.isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'">
      <div class="avatar flex items-center font-bold justify-center size-8 rounded-full shrink-0"
        :class="!msg.isAI && '!bg-primary !text-white'">
        {{ msg.isAI ? 'T' : 'U' }}
      </div>
      <div class="p-3 group relative max-w-[70%] min-w-[100px] break-words whitespace-pre-wrap" :class="msg.isAI
          ? 'bg-muted rounded-2xl rounded-tl-md'
          : 'bg-primary text-white rounded-2xl rounded-tr-md'
        ">
        {{ msg.text }}
        <Button v-if="isSupported && !msg.isAI" @click="copy(msg.text)"
          class="p-0 w-7 h-7 absolute right-[calc(100%+10px)] opacity-0 group-hover:opacity-100 transition-opacity">
          <Icon :icon="copied ? 'material-symbols:done-rounded' : 'tabler:clipboard'" />
        </Button>
      </div>
    </div>
    <div v-if="isThinking" class="flex items-start gap-2 mr-auto">
      <div class="p-3 rounded-2xl max-w-[80%] bg-muted animate-pulse-opacity">
        Обдумываю задачу...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/stores/chatStore'
import { ref, watch, nextTick, onMounted, onActivated } from 'vue'
import { Button } from '../ui/button'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useClipboard } from '@vueuse/core'
interface Props {
  messages: Message[]
  isInitChat: boolean
  isThinking: boolean
}
const { copy, copied, isSupported } = useClipboard()
const props = defineProps<Props>()
const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = (animated: boolean = false) => {
  nextTick(() => {
    if (!messagesContainer.value) return
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: animated ? 'smooth' : 'auto',
    })
  })
}

onActivated(() => scrollToBottom(false))
onMounted(() => scrollToBottom(false))

watch(
  () => props.messages,
  () => scrollToBottom(true),
  { deep: true }
)
watch(
  () => props.isThinking,
  (newVal) => !newVal && scrollToBottom(true),
)
</script>

<style lang="css" scoped>
.avatar {
  background: var(--t-bank-main);
}

@keyframes pulse-opacity {

  0%,
  100% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }
}

.animate-pulse-opacity {
  animation: pulse-opacity 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  color: hsl(var(--muted-foreground));
}
</style>
