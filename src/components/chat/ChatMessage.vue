<template>
    <div class="flex items-start mb-2 pb-4 gap-2" :class="message.isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'">
        <ChatMessageAvatar :is-ai="message.isAI" />

        <div class="p-3 group relative max-w-[70%] min-w-[100px] break-words whitespace-pre-wrap" :class="message.isAI
            ? 'bg-muted rounded-2xl rounded-tl-md'
            : 'bg-primary text-white rounded-2xl rounded-tr-md'">
            <ChatMessageContent v-model:edit-text="editText" :message="message" :is-editing="isEditing"
                @edit-submit="handleEditSubmit" />

            <ChatMessageActions :message="message" :is-editing="isEditing"
                @copy="handleCopy" @resend="handleResend" @edit-submit="handleEditSubmit"
                @edit-start="handleEditStartTrigger" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Message } from '@/stores/chatStore'
import { ref, watch } from 'vue'
import ChatMessageContent from './ChatMessageContent.vue';
import ChatMessageActions from './ChatMessageActions.vue';
import ChatMessageAvatar from './ChatMessageAvatar.vue';

interface Props {
    message: Message
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'edit', id: string, text: string): void
    (e: 'copy', text: string, id: string): void
    (e: 'resend', id: string): void
    (e: 'edit-start', id: string, text: string): void
}>()
const editText = ref<string>(props.message.text)
const isEditing = ref(false)

const handleEditStartTrigger = () => {
    handleEditStart(props.message.text)
}

const handleEditStart = (text: string) => {
    isEditing.value = true
    editText.value = text
    emit('edit-start', props.message.id, text)
}

const handleEditSubmit = () => {
    if (editText.value.trim() === props.message.text.trim()) {
        isEditing.value = false
        return
    }
    emit('edit', props.message.id, editText.value.trim())
    isEditing.value = false
}

const handleCopy = () => {
    emit('copy', props.message.text, props.message.id)
}

const handleResend = () => {
    emit('resend', props.message.id)
}

watch(() => props.message.text, (newVal) => {
    editText.value = newVal
})
</script>