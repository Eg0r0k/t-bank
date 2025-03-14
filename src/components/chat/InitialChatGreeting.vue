<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full">
        <div class="flex my-10 items-center justify-center size-[100px] rounded-full"
            style="background: linear-gradient(305.4deg, #fff8d4 11.32%, #ffdd2d 81.26%)">
            <Icon icon="bi:stars" class="size-9" />
        </div>
        <div class="bg-muted px-3 py-4 rounded-2xl rounded-tl-md">
            Привет! Я шоппинг-ассистент и помогу с выбором одежды
        </div>
    </div>
</template>