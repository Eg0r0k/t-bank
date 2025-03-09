import { useSpeechRecognition } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

interface Message {
  text: string
  isAI: boolean
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([{ text: 'Привет! Как я могу вам помочь?', isAI: true }])
  const inputMessage = ref('')
  const isThinking = ref(false)
  const {
    isSupported,
    isListening,
    result,
    stop: stopRecognition,
    start: startRecognition,
  } = useSpeechRecognition({
    lang: 'ru-RU',
    continuous: false,
  })

  const sendMessage = () => {
    const message = inputMessage.value.slice(0, 1000)
    if (!message.trim()) return

    messages.value.push({
      text: message,
      isAI: false,
    })

    isThinking.value = true
    inputMessage.value = ''

    setTimeout(() => {
      messages.value.push({
        text: 'Сервис в данный момент не доступен, попробуйте позже!',
        isAI: true,
      })
      isThinking.value = false
    }, 1000)
  }
  const toggleRecording = () => {
    if (!isSupported.value) {
      alert('Голосовой ввод не поддерживается в вашем браузере')
      return
    }

    if (isListening.value) {
      stopRecognition()
    } else {
      startRecognition()
    }
  }
  watch(result, (newResult, oldResult) => {
    if (newResult && newResult !== oldResult) {
      inputMessage.value = newResult.slice(0, 1000)
    }
  })
  return {
    messages,
    inputMessage,
    isThinking,
    isListening,
    sendMessage,
    toggleRecording,
  }
})
