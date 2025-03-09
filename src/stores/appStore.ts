import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface StateI {
  isFavoriteOpen: boolean
  isChatOpen: boolean
}

export const useAppStore = defineStore('app', () => {
  const states = reactive<StateI>({
    isFavoriteOpen: false,
    isChatOpen: true,
  })

  const closeChat = () => {
    states.isChatOpen = false
  }
  const openChat = () => {
    states.isChatOpen = true
  }

  return {
    states,
    openChat,
    closeChat,
  }
})
