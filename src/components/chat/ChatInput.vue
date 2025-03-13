<template>
  <div class="sticky bottom-0 bg-background border-t px-6 py-4">
    <div class="flex mb-2 flex-wrap gap-2">
      <RoundedButton
        v-for="prompt in startPropmpts"
        :key="prompt.text"
        variant="outline"
        class="px-3 bg-muted border-none hover:bg-muted shadow-sm"
        @click="handlePromptClick(prompt.text)"
      >
        {{ prompt.text }}
      </RoundedButton>
    </div>
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col h-[90x] bg-muted rounded items-end gap-2 relative"
    >
      <Textarea
        class="flex-1 min-h-[90px] resize-none border-none shadow-none"
        v-model="chatStore.inputMessage"
        @keydown.enter="handleEnterKey"
        placeholder="Что хотите найти?"
        :disabled="chatStore.isListening"
        maxlength="1000"
      />
      <div class="flex gap-1 absolute right-2 bottom-2">
        <RoundedButton
          type="button"
          @click="handleButtonClick"
          class="w-8 h-8 p-1 [&_svg]:size-5"
          :variant="buttonVariant"
        >
          <Icon :icon="currentIcon" />
        </RoundedButton>
      </div>
    </form>
    <span
      class="text-xs"
      :class="{ 'text-red-500': isNearMaxLength, 'text-gray-500': !isNearMaxLength }"
    >
      {{ chatStore.inputMessage.length }}/1000
    </span>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore'
import Textarea from '../ui/textarea/Textarea.vue'
import RoundedButton from '../ui/button/RoundedButton.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed } from 'vue'

interface Props {
  isThinking: boolean
}
const props = defineProps<Props>()

const startPropmpts = [
  { text: 'Офисный аутфит до 5000 ₽' },
  { text: 'Вечернее платье' },
  { text: 'Тренды весна 2025' },
  { text: 'Кроссовки' },
]

const chatStore = useChatStore()

const isNearMaxLength = computed(() => {
  const threshold = 700
  return chatStore.inputMessage.length >= threshold
})

const buttonVariant = computed(() => {
  if (props.isThinking) return 'default'
  if (chatStore.isListening) return 'destructive'
  return 'default'
})

const currentIcon = computed(() => {
  if (props.isThinking) return 'ic:round-stop'
  if (chatStore.inputMessage.trim()) return 'mingcute:arrow-up-fill'
  return chatStore.isListening ? 'mdi:microphone' : 'mdi:microphone-outline'
})

const handleSubmit = () => {
  const trimmedMessage = chatStore.inputMessage.trim()
  if (trimmedMessage) {
    chatStore.sendMessage()
  }
}

const handleButtonClick = () => {
  if (props.isThinking) return

  const trimmedMessage = chatStore.inputMessage.trim()
  if (trimmedMessage) {
    chatStore.sendMessage()
  } else {
    chatStore.toggleRecording()
  }
}

const handleEnterKey = (e: KeyboardEvent) => {
  if (!e.shiftKey && !props.isThinking) {
    e.preventDefault()
    handleSubmit()
  }
}

// Добавляем обработчик клика для кнопок
const handlePromptClick = (promptText: string) => {
  chatStore.inputMessage = promptText // Подставляем текст из кнопки в textarea
}
</script>
