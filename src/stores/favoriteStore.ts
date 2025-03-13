import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoriteStore = defineStore(
  'favorite',
  () => {
    const items = ref<string[]>([])

    const toggleFavorite = (productId: string) => {
      const index = items.value.indexOf(productId)
      if (index === -1) {
        items.value.push(productId)
      } else {
        items.value.splice(index, 1)
      }
    }

    const isFavorite = (productId: string) => items.value.includes(productId)

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
