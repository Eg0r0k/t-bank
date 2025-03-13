import type { Product } from '@/components/results/ResultCard.vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoriteStore = defineStore(
  'favorite',
  () => {
    const items = ref<Product[]>([])

    const toggleFavorite = (product: Product) => {
      const index = items.value.findIndex((item) => item.id === product.id)
      if (index === -1) {
        items.value.push(product)
      } else {
        items.value.splice(index, 1)
      }
    }

    const isFavorite = (productId: string) => items.value.some((item) => item.id === productId)

    return {
      items,
      toggleFavorite,
      isFavorite,
    }
  },
  {
    persist: true,
  },
)
