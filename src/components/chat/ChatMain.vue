<template>
    <div class="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4 space-y-4" ref="messagesContainer">
        <div v-for="(msg, index) in messages" :key="index" class="flex items-start gap-2"
            :class="msg.isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'">
            <div class="avatar flex items-center font-bold justify-center size-8 rounded-full shrink-0"
                :class="!msg.isAI && '!bg-primary !text-white'">
                {{ msg.isAI ? 'T' : 'U' }}
            </div>
            <div class="p-3 max-w-[80%] break-words whitespace-pre-wrap" :class="msg.isAI
                ? 'bg-muted rounded-2xl rounded-tl-md'
                : 'bg-primary text-white rounded-2xl rounded-tr-md'">
                {{ msg.text }}
            </div>
        </div>
        <div v-if="isThinking" class="flex items-start gap-2 mr-auto">
            <div class="p-3 rounded-2xl max-w-[80%] bg-muted animate-pulse-opacity">
                Обдумываю задачу...
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
const props = defineProps<{
    messages: Array<{ text: string; isAI: boolean }>
    isThinking: boolean
}>();
const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTo({
                top: messagesContainer.value.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
};


onMounted(scrollToBottom);

watch(() => props.messages, () => {
    scrollToBottom();
}, { deep: true });


watch(() => props.isThinking, (newVal) => {
    if (!newVal) scrollToBottom();
}); 



</script>

<style lang="css" scoped>
.avatar {
    background: var(--t-bank-main);
}

@keyframes pulse-opacity {

    0%,
    100% {
        opacity: 0.6;
    }

    50% {
        opacity: 1;
    }
}

.animate-pulse-opacity {
    animation: pulse-opacity 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    color: hsl(var(--muted-foreground));
}
</style>