<template>
    <div v-if="message.isAI" class="flex gap-1 mt-3">
        <Button variant="ghost" @click="handleCopy" class="p-0 size-7 hover:bg-primary-foreground">
            <Icon :icon="copied ? 'material-symbols:done-rounded' : 'tabler:clipboard'" class="size-4" />
        </Button>
        <Button variant="ghost" @click="onResend" class="p-0 size-7 hover:bg-primary-foreground">
            <Icon icon="mdi:reload" class="size-4" />
        </Button>
        <Button variant="ghost" class="p-0 size-7 hover:bg-primary-foreground">
            <Icon icon="mdi:like-outline" class="size-4" />
        </Button>
        <Button variant="ghost" class="p-0 size-7 hover:bg-primary-foreground">
            <Icon icon="mdi:dislike-outline" class="size-4" />
        </Button>
    </div>

    <div v-else
        class="flex gap-1 absolute top-0 right-[calc(100%+10px)] opacity-0 group-hover:opacity-100 transition-opacity">
        <template v-if="!isEditing">
            <Button v-if="isSupported" @click="handleCopy"
                class="p-0 size-7 bg-background text-foreground hover:bg-muted">
                <Icon :icon="copied ? 'material-symbols:done-rounded' : 'tabler:clipboard'" class="size-4" />
            </Button>
            <Button @click="onEditStart" class="p-0 size-7 bg-background text-foreground hover:bg-muted">
                <Icon icon="mdi:pencil" class="size-4" />
            </Button>
        </template>

        <Button v-else @click="onEditSubmit" class="p-0 size-7 bg-background text-foreground hover:bg-muted">
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
    onEditSubmit: () => void
    onEditStart: () => void
    onCopy: () => void
    onResend: () => void
}
const props = defineProps<Props>()
const { copy, isSupported } = useClipboard()
const copied = ref(false)

const handleCopy = async () => {
    await copy(props.message.text)
    copied.value = true
    setTimeout(() => copied.value = false, 700)
    props.onCopy()
}
</script>
