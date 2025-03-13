<template>
  <div class="w-full mb-2">
    <main class="container mx-auto w-full h-full gap-2 flex flex-row overflow-hidden">
      <div class="flex-1 bg-background rounded-xl ">
        <div class="flex items-center px-6 py-3 border-b mb-6">
          <span class="truncate font-medium">Избранное</span>
        </div>
        <div v-if="favoriteStore.items.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">

        </div>
        <div v-else class="flex px-6 justify-center w-full">
          <div class="flex flex-col items-center py-10">
            <img class="aspect-square mb-6 max-w-[200px] w-full" src="/img/empty.png" alt="Пусто" />
            <div class="text-center">
              <h3 class="font-bold mb-3 text-xl">В корзине пока пусто</h3>
              <p class="text-gray-600">
                Добавляйте сюда товары — пусть знают, <br />
                что они избранные
              </p>
            </div>
          </div>
        </div>
      </div>
      <ChatInfo />
    </main>
  </div>
</template>

<script lang="ts" setup>
import ChatInfo from '@/components/other/ChatInfo.vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

const favoriteStore = useFavoriteStore()
</script>
