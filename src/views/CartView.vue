<template>
  <div class="w-full mb-2">
    <main class="container mx-auto w-full h-full gap-2 flex flex-col md:flex-row ">
      <div class="flex-1 bg-background rounded-xl ">
        <div class="flex items-center px-6 py-3 border-b mb-6">
          <span class="truncate font-medium">Корзина</span>
        </div>
        <div class="flex px-6 justify-center w-full">
          <div v-if="cartStore.items.length" class="flex flex-col items-center py-10">
            <img class="aspect-square mb-6 max-w-[200px] w-full" src="/img/empty.png" alt="Пусто" />
            <div class="text-center">
              <h3 class="font-bold mb-3 text-xl">В корзине пока пусто</h3>
              <p class="text-gray-600">
                Добавляйте сюда товары — пусть знают, <br />
                что они избранные
              </p>
            </div>
          </div>
          <template v-else>
            <div class="w-full ">
              <div class="w-full pb-3 border-b">
                <div class="flex items-center space-x-2">
                  <Checkbox class="size-6" id="terms" />
                  <Label for="terms">Выбрать все</Label>
                </div>
              </div>
              <div class="py-6 w-full border-b flex flex-col  gap-4   relative sm:flex-row " v-for="i in 100" :key="i">
                <div class="flex  w-full gap-4 relative pr-7">
                  <Checkbox class="size-6" />
                  <img class="min-w-[100px] rounded-[20px] max-w-[160px] w-full h-auto aspect-square object-contain"
                    src="/img/missing.png" alt="" />
                  <div class="flex flex-col gap-4">
                    <span class=" font-bold "> Плюшевая куртка ТВОЕ</span>
                    <ul class="list-disc ml-4 flex flex-col  gap-2">
                      <li class=" text-sm">13 мар, по клику</li>
                      <li class="text-sm">ПВЗ</li>
                    </ul>
                  </div>

                </div>
                <span class=" text-nowrap font-medium text-lg mr-[10%] "> 5 037 ₽</span>
                <RoundedButton variant="ghost" class="size-8 absolute right-0  top-6">
                  <Icon icon="material-symbols:close-rounded" />
                </RoundedButton>
              </div>
            </div>
          </template>
        </div>
      </div>
      <ChatInfo class=" sticky top-2" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import ChatInfo from '@/components/other/ChatInfo.vue';
import { useCartStore } from '@/stores/cartStore';
import { Checkbox } from '@/components/ui/checkbox';
import Label from '@/components/ui/label/Label.vue';
import RoundedButton from '@/components/ui/button/RoundedButton.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';

const cartStore = useCartStore();
</script>