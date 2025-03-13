<template>
  <aside
    :class="!appStore.isInitChat ? 'max-w-[420px] ' : 'max-w-full'"
    class="w-full bg-background overflow-hidden rounded-xl h-[calc(100vh-82px)] flex flex-col"
  >
    <ChatHead v-if="!appStore.isInitChat" @close="appStore.closeChat" />
    <ChatMain
      :is-init-chat="appStore.isInitChat"
      :messages="chatStore.messages"
      :is-thinking="chatStore.isThinking"
    />
    <ChatInput :is-thinking="chatStore.isThinking" />
  </aside>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'
import { useChatStore } from '@/stores/chatStore'
import ChatMain from './ChatMain.vue'
import ChatInput from './ChatInput.vue'
import ChatHead from './ChatHead.vue'

const appStore = useAppStore()
const chatStore = useChatStore()

</script>
