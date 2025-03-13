<template>
  <div class="w-full mb-2">
    <main class="container mx-auto w-full h-full gap-2 flex flex-col md:flex-row ">
      <div class="flex-1 bg-background rounded-xl ">
        <div class="flex items-center px-6 py-3 border-b mb-6">
          <span class="truncate font-medium">Корзина · {{ cartStore.totalItems }}</span>

        </div>
        <div class="flex px-6 justify-center w-full">
          <div v-if="!cartStore.items.length" class="flex flex-col items-center py-10">
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
            <div class="w-full">
              <div class="w-full pb-3 min-h-14 border-b flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <Checkbox class="size-6" id="terms" :model-value="isAllSelected"
                    @update:model-value="handleAllSelection" />
                  <Label for="terms">
                    {{ isAllSelected ? 'Снять все' : 'Выбрать все' }}
                  </Label>
                </div>
                <Button v-if="selectedItems.length > 0" variant="ghost" class="text-destructive"
                  @click="removeSelectedItems">
                  Удалить выбранные ({{ selectedItems.length }})
                </Button>
              </div>
              <div class="py-6 w-full border-b flex flex-col gap-4 relative sm:flex-row" v-for="item in cartStore.items"
                :key="item.id">
                <div class="flex w-full gap-4 relative pr-7">
                  <Checkbox class="size-6" :model-value="selectedItems.includes(item.id)"
                    @update:model-value="checked => toggleItemSelection(item.id, checked)" />
                  <img class="min-w-[100px] rounded-[20px] max-w-[160px] w-full h-auto aspect-square object-contain"
                    :src="item.imageUrl || '/img/missing.png'" alt="product" />
                  <div class="flex flex-col gap-4">
                    <span class="font-bold"> {{ item.name }}</span>
                    <ul class="list-disc ml-4 flex flex-col gap-2">
                      <li class="text-sm">13 мар, по клику</li>
                      <li class="text-sm">ПВЗ</li>
                    </ul>
                  </div>
                </div>
                <span class="text-nowrap font-medium text-lg mr-[10%]">
                  {{ item.price + ' ₽' }}
                </span>
                <RoundedButton variant="ghost" class="size-8 absolute right-0 top-6"
                  @click.stop="cartStore.removeFromCart(item.id)">
                  <Icon icon="material-symbols:close-rounded" />
                </RoundedButton>
              </div>
            </div>
          </template>
        </div>
      </div>
      <ChatInfo class="sticky top-2" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import ChatInfo from '@/components/other/ChatInfo.vue';
import { useCartStore } from '@/stores/cartStore';
import { Checkbox } from '@/components/ui/checkbox';
import Label from '@/components/ui/label/Label.vue';
import RoundedButton from '@/components/ui/button/RoundedButton.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import Button from '@/components/ui/button/Button.vue';

const cartStore = useCartStore();
const selectedItems = ref<string[]>([]);

watch(() => cartStore.items, (newItems) => {
  selectedItems.value = selectedItems.value.filter(id =>
    newItems.some(item => item.id === id)
  );
}, { immediate: true, deep: true });

const handleAllSelection = (checked: boolean | 'indeterminate') => {
  if (checked) {
    selectedItems.value = [...cartStore.items.map(item => item.id)];
  } else {
    selectedItems.value = [];
  }
};
const isAllSelected = computed(() => {
  return cartStore.items.length > 0 &&
    cartStore.items.every(item => selectedItems.value.includes(item.id));
});

const toggleItemSelection = (itemId: string, checked: boolean | "indeterminate") => {
  if (checked) {
    if (!selectedItems.value.includes(itemId)) {
      selectedItems.value = [...selectedItems.value, itemId];
    }
  } else {
    selectedItems.value = selectedItems.value.filter(id => id !== itemId);
  }
};

const removeSelectedItems = () => {
  selectedItems.value.forEach(id => cartStore.removeFromCart(id));
  selectedItems.value = [];
};
</script>