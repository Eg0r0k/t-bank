<template>
  <div class="flex-1  overflow-y-auto overflow-x-hidden px-6 py-4 space-y-4 no-scrollbar" ref="messagesContainer">
    <InitialChatGreeting v-if="isInitChat" />
    <template v-for="(msg, index) in chatStore.messages" :key="msg.id">
      <ChatMessage :message="msg" :index="index" @edit="handleEdit" @copy="handleCopy" @resend="handleResend" />
    </template>
    <ThinkingIndicator v-if="chatStore.isThinking" />
  </div>
</template>

<script setup lang="ts">
import { useChatStore, } from '@/stores/chatStore'
import { ref } from 'vue'

import InitialChatGreeting from './InitialChatGreeting.vue'
import ThinkingIndicator from './ThinkingIndicator.vue'
import ChatMessage from './ChatMessage.vue'
import { useAutoScroll } from '@/lib/hooks/useAutoScroll'

interface Props {
  isInitChat: boolean
}

defineProps<Props>()
const messagesContainer = ref<HTMLElement | null>(null)
const chatStore = useChatStore()

useAutoScroll(messagesContainer, [
  () => chatStore.messages,
  () => chatStore.isThinking
])

const handleEdit = (id: string, text: string) => {
  chatStore.update(id, text)
  chatStore.resend(id)
}

const handleCopy = (text: string, id: string) => {
  chatStore.copy(text, id)
}

const handleResend = (id: string) => {
  chatStore.resendAi(id)
}


</script>
