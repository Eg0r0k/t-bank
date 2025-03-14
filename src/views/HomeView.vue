<template>
  <div class="w-full mb-2">
    <main class="container gap-2 relative flex flex-row mx-auto w-full h-full overflow-hidden">
      <Transition :name="animationName">
        <KeepAlive>
          <ChatBot :class="appStore.isInitChat ? 'z-20 ' : 'fixed sm:static z-20'" v-if="appStore.states.isChatOpen" />
        </KeepAlive>
      </Transition>
      <div v-if="!appStore.isInitChat" class="flex-1 overflow-auto bg-background rounded-xl">
        <!-- <div class="flex flex-col justify-between px-6 py-3 min-w-0 w-full">
          <span class="font-medium text-lg truncate mb-4">Результаты</span>
          <section class="mb-6">
            <div class="flex overflow-x-auto gap-4 pb-1 scrollbar-hide">
              <ResultCard v-for="(card, index) in chatStore.cards" :key="`col1-${index}`" :product="card"
                :is-better="true" />
            </div>
          </section>
          <section>
            <div class="flex overflow-x-auto gap-4 pb-1 scrollbar-hide">
              <ResultCard v-for="(card, index) in chatStore.cards" :key="`col1-${index}`" :product="card"
                :is-better="true" />
            </div>
          </section>
        </div> -->
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ChatBot from '@/components/chat/ChatBot.vue'
import ResultCard from '@/components/results/ResultCard.vue'
import { useAppStore } from '@/stores/appStore'
import { useChatStore } from '@/stores/chatStore'
import { useMediaQuery } from '@vueuse/core'
import { computed } from 'vue'

const appStore = useAppStore()
const isMobile = useMediaQuery('(max-width: 640px)')
const animationName = computed(() => isMobile.value ? 'chat-slide-mobile' : 'chat-slide')
const chatStore = useChatStore()

</script>

<style scoped>
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 420px;
}

.chat-slide-enter-from,
.chat-slide-leave-to {
  max-width: 0;
  opacity: 0;
  transform: translateX(-200px);
}

/* Анимация для мобильных устройств */
.chat-slide-mobile-enter-active,
.chat-slide-mobile-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-slide-mobile-enter-from,
.chat-slide-mobile-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
