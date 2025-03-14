<template>
    <template v-if="!isEditing || message.isAI">
        {{ message.text }}
    </template>

    <template v-else>
        <textarea ref="textareaRef" v-model="editText" @keyup.enter.prevent="handleSubmit"
            class="bg-transparent outline-none text-white resize-y min-h-[140px] max-h-[250px] w-full overflow-y-auto pr-2"
            style="white-space: pre-wrap; box-sizing: border-box;" />
    </template>
</template>

<script setup lang="ts">
import type { Message } from '@/stores/chatStore';
import { ref, watch, nextTick } from 'vue'

interface Props {
    message: Message
    isEditing: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'edit-submit', text: string): void
}>()

const editText = ref(props.message.text)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

watch(() => props.isEditing, async (newVal) => {
    if (newVal) {
        await nextTick()
        textareaRef.value?.focus()
        textareaRef.value?.setSelectionRange(editText.value.length, editText.value.length)
    }
})

const handleSubmit = () => {
    emit('edit-submit', editText.value.trim())
}
</script>