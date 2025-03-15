<template>
  <div class="flex justify-between items-center px-6 py-3 border-b">


    <span class="truncate font-medium">Ассистент</span>
    <RoundedButton @click="$emit('close')" variant="ghost" class="w-8 h-8 [&_svg]:size-5">
      <Icon icon="material-symbols:close-rounded" />
    </RoundedButton>
  </div>
</template>

<script setup lang="ts">
import RoundedButton from '../ui/button/RoundedButton.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'

defineEmits(['close'])
</script>
