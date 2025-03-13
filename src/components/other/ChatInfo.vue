<template>
  <div class="max-w-[310px] p-4 hidden lg:block max-h-fit w-full bg-background rounded-xl">
    <h2 class="font-bold mb-4">Перейти к AI-ассистенту</h2>
    <ul class="list-disc mb-4">
      <li class="ml-5 text-sm">
        Помогает разобраться в любой ситуации, когда вы сталкиваетесь с трудным выбором — например,
        как одеться на собеседование
      </li>
    </ul>
    <TButton class="w-full"> Написать в чат </TButton>
  </div>
</template>
<script setup lang="ts">
import TButton from '../ui/button/TButton.vue'
</script>
