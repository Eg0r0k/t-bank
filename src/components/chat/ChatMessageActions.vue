<template>
    <div v-if="message.isAI" class="flex gap-1 mt-3">
        <Button variant="ghost" @click="handleCopy" class="p-0 size-7">
            <Icon :icon="copied ? 'material-symbols:done-rounded' : 'tabler:clipboard'" class="size-4" />
        </Button>
        <Button variant="ghost" @click="handleResend" class="p-0 size-7">
            <Icon icon="mdi:reload" class="size-4" />
        </Button>
    </div>

    <div v-else
        class="flex gap-1 absolute top-0 right-[calc(100%+10px)] opacity-0 group-hover:opacity-100 transition-opacity">
        <template v-if="!isEditing">
            <Button v-if="isSupported" @click="handleCopy"
                class="p-0 size-7 bg-background text-foreground hover:bg-muted">
                <Icon :icon="copied ? 'material-symbols:done-rounded' : 'tabler:clipboard'" class="size-4" />
            </Button>
            <Button @click="handleEditStart" class="p-0 size-7 bg-background text-foreground hover:bg-muted">
                <Icon icon="mdi:pencil" class="size-4" />
            </Button>
        </template>

        <Button v-else @click="handleEditSubmit" class="p-0 size-7 bg-background text-foreground hover:bg-muted">
            <Icon icon="mdi:check" class="size-4" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { Message } from '@/stores/chatStore'
import { Icon } from '@iconify/vue'
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'
interface Props {
    message: Message
    isEditing: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'edit-start'): void
    (e: 'copy'): void
    (e: 'resend'): void
    (e: 'edit-submit'): void
}>()



const { copy, isSupported } = useClipboard()
const copied = ref(false)

const handleEditSubmit = () => {

    emit('edit-submit')
}



const handleCopy = async () => {
    await copy(props.message.text)
    copied.value = true
    setTimeout(() => copied.value = false, 700)
    emit('copy')
}

const handleEditStart = () => {
    emit('edit-start')
}

const handleResend = () => {
    emit('resend')
}
</script>