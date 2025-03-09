<template>
    <aside
        class="max-w-[420px]  w-full bg-background overflow-hidden rounded-xl h-[calc(100vh-82px)] flex flex-col">
        <ChatHead @close="appStore.closeChat" />
        <ChatMain :messages="chatStore.messages" :is-thinking="chatStore.isThinking" />
        <ChatInput />
    </aside>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'
import { useChatStore } from '@/stores/chatStore'
import ChatMain from './ChatMain.vue'
import ChatInput from './ChatInput.vue'
import ChatHead from './ChatHead.vue'
import { onMounted } from 'vue'

const appStore = useAppStore()
const chatStore = useChatStore()


onMounted(() => {
    console.log("rerendered")
})
</script>