import type { Product } from '@/components/results/ResultCard.vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<Product[]>([])

    const addToCart = (product: Product) => {
      if (!items.value.some((item) => item.id === product.id)) {
        items.value.push(product)
      }
    }

    const removeFromCart = (productId: string) => {
      items.value = items.value.filter((item) => item.id !== productId)
    }

    const isInCart = (productId: string) => {
      return items.value.some((item) => item.id === productId)
    }

    return {
      items,
      addToCart,
      removeFromCart,
      isInCart,
    }
  },
  {
    persist: true,
  },
)
