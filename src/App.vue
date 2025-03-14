<template>
  <HeaderMain />
  <RouterView />
  <Button @click.stop="appStore.openChat" variant="outline"
    class="sm:hidden flex-inline fixed rounded-full z-10 shadow-md right-8 bottom-8 size-16 p-0">
    <Icon icon="bi:stars" class="size-9" />
  </Button>
  <Toaster class="pointer-events-auto z-0" />
 
</template>
<script setup lang="ts">
import HeaderMain from './components/header/HeaderMain.vue'
import { Button } from './components/ui/button'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useAppStore } from './stores/appStore'
import { Toaster } from '@/components/ui/sonner'
const appStore = useAppStore()
</script>
