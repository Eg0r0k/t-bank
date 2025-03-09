import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<string[]>([])

    const addToCart = (productId: string) => {
      if (!items.value.includes(productId)) {
        items.value.push(productId)
      }
    }

    const removeFromCart = (productId: string) => {
      items.value = items.value.filter((id) => id !== productId)
    }

    const isInCart = (productId: string) => items.value.includes(productId)

    return {
      items,
      addToCart,
      removeFromCart,
      isInCart,
    }
  },
  {
    persist: true
  },
)
