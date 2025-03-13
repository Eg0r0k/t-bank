import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from './chatStore'

interface StateI {
  isFavoriteOpen: boolean
  isChatOpen: boolean
}

export const useAppStore = defineStore('app', () => {
  const states = reactive<StateI>({
    isFavoriteOpen: false,
    isChatOpen: true,
  })
  const chatStore = useChatStore()

  const router = useRouter()

  const isInitChat = computed(() => {
    return chatStore.messages.length === 0
  })

  const closeChat = () => {
    states.isChatOpen = false
  }
  const openChat = () => {
    if (router.currentRoute.value.path !== '/') {
      router.push('/')
    }
    states.isChatOpen = true
  }

  return {
    states,
    openChat,
    isInitChat,
    closeChat,
  }
})
