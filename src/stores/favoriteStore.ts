import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoriteStore = defineStore(
  'favorite',
  () => {
    const favorites = ref<string[]>([])

    const toggleFavorite = (productId: string) => {
      const index = favorites.value.indexOf(productId)
      if (index === -1) {
        favorites.value.push(productId)
      } else {
        favorites.value.splice(index, 1)
      }
    }

    const isFavorite = (productId: string) => favorites.value.includes(productId)

    return {
      favorites,
      toggleFavorite,
      isFavorite,
    }
  },
  {
    persist: true,
  },
)
