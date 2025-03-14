<template>
    <div class="avatar flex items-center font-bold justify-center size-8 rounded-full shrink-0"
        :class="isAi ? 'bg-muted' : '!bg-primary !text-white'">
        {{ isAi ? 'T' : 'U' }}
    </div>
</template>


<script setup lang="ts">
defineProps<{
    isAi: boolean
}>()
</script>

<style lang="css" scoped>
.avatar {
    background: var(--t-bank-main);
}
</style>