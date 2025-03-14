<template>
    <div>
        <template v-if="!isEditing || message.isAI">
            {{ message.text }}
        </template>

        <template v-else>
            <textarea ref="textAreaRef" v-model="localEditText"
                class="bg-transparent outline-none text-white resize-y min-h-[140px] max-h-[250px] w-full overflow-y-auto pr-2"
                style="white-space: pre-wrap; box-sizing: border-box;" />
        </template>
    </div>
</template>

<script setup lang="ts">
import type { Message } from '@/stores/chatStore';
import { nextTick, ref, watch } from 'vue'

interface Props {
    message: Message
    isEditing: boolean
}

const props = defineProps<Props>()


const textAreaRef = ref<null | HTMLTextAreaElement>(null)
const localEditText = defineModel<string>('editText', { required: true })



watch(() => props.isEditing, async (newVal) => {
    if (newVal) {
        await nextTick()
        textAreaRef.value?.focus()
        textAreaRef.value?.setSelectionRange(localEditText.value.length, localEditText.value.length)
    }
})

</script>