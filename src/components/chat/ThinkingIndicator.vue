<template>
    <div class="flex items-start gap-2 mr-auto">
        <div class="p-3 rounded-2xl max-w-[80%] bg-muted animate-pulse-opacity">
            Обдумываю задачу...
        </div>
    </div>
</template>

<style lang="css" scoped>
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