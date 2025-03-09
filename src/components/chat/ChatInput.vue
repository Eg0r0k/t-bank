<template>
    <div class="sticky bottom-0 bg-background border-t px-6 py-4">
        <form @submit.prevent="handleSubmit" class="flex flex-col h-[90px] bg-muted rounded items-end gap-2 relative">
            <Textarea class="flex-1 resize-none border-none shadow-none" v-model.trim="chatStore.inputMessage"
                placeholder="Сообщение" :disabled="chatStore.isListening" maxlength="1000" />

            <div class="flex gap-1 absolute right-2 bottom-2">
                <RoundedButton type="submit" class="w-8 h-8 p-1 [&_svg]:size-5"
                    :variant="chatStore.isListening ? 'destructive' : 'default'">
                    <Icon :icon="chatStore.inputMessage.trim()
                        ? 'mingcute:arrow-up-fill'
                        : chatStore.isListening
                            ? 'mdi:microphone'
                            : 'mdi:microphone-outline'" />
                </RoundedButton>

            </div>

        </form>
        <span class=" text-xs">
            {{ chatStore.inputMessage.length }}/1000
        </span>
    </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore'
import Textarea from '../ui/textarea/Textarea.vue'
import RoundedButton from '../ui/button/RoundedButton.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'

const chatStore = useChatStore()

const handleSubmit = () => {
    if (chatStore.inputMessage.trim()) {
        chatStore.sendMessage()
    } else {
        chatStore.toggleRecording()
    }
}
</script>