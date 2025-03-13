import type { Product } from '@/components/results/ResultCard.vue'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<Product[]>([])

    const totalItems = computed(() => items.value.length)

    const totalPrice = computed(() => items.value.reduce((acc, item) => acc + item.price, 0))

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
    const clearCart = () => {
      items.value = []
    }
    return {
      clearCart,
      items,
      addToCart,
      removeFromCart,
      totalItems,
      totalPrice,
      isInCart,
    }
  },
  {
    persist: true,
  },
)
