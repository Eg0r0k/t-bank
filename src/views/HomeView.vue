<template>
  <div class="w-full mb-2">
    <main class="container gap-2 flex flex-row mx-auto w-full h-full overflow-hidden">
      <Transition name="chat-slide">
        <KeepAlive>
          <ChatBot v-if="states.isChatOpen" />
        </KeepAlive>
      </Transition>
      <div class="flex-1 bg-background rounded-xl">
        <div class="flex flex-col justify-between   px-6 py-3 min-w-0 w-full">
          <span class="font-medium text-lg truncate mb-4">Результаты</span>
          <div :class="isLoading ? 'overflow-y-hidden' : ''"
            class="grid overflow-y-auto max-h-[calc(100vh-150px)] grid-cols-1  md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            <template v-if="isLoading">
              <div class="flex flex-col gap-1" v-for="i in 100" :key="i">
                <Skeleton class="w-full  aspect-video" />
                <Skeleton class="w-full   h-4" />
                <Skeleton class="w-[60%] h-6" />
                <Skeleton class="w-[70%]   h-4" />
              </div>
            </template>
            <template v-else>
              <ResultCard v-for="(card, index) in 100" :key="index" />
            </template>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ChatBot from '@/components/chat/ChatBot.vue';
import ResultCard from '@/components/results/ResultCard.vue';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import { useAppStore } from '@/stores/appStore';
import { ref } from 'vue';

const { states } = useAppStore()
const isLoading = ref(true)

</script>



<style scoped>
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 420px;
}

.chat-slide-enter-from,
.chat-slide-leave-to {
  max-width: 0;
  opacity: 0;
  transform: translateX(-20px);
}

.main-content {
  transition: margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>