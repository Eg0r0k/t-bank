import { useSpeechRecognition } from '@vueuse/core'
import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { AimlApiProvider, type AIProvider } from '@/api/apiProvider'
import type { Product } from '@/components/results/ResultCard.vue'

export interface Message {
  text: string
  isAI: boolean
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([])
  const inputMessage = ref('')
  const isThinking = ref(false)

  const aiProvider: AIProvider = new AimlApiProvider()

  const cards = ref<Product[]>([
    {
      id: '1',
      name: 'Продукт Один',
      price: 100,
      imageUrl: '',
      reasons: ['Как пижама — тепло и комфортно', 'Можно носить с джинсами и платьем'],
    },
    {
      id: '2',
      name: 'Продукт Два',
      price: 200,
      imageUrl: '',
      reasons: [
        'Как пижама — тепло и комфортно',
        'Можно носить с джинсами и платьем',
        'Согреет даже в -15°C',
      ],
    },
    {
      id: '3',
      name: 'asdasd',
      price: 400,
      imageUrl: '',
    },
  ])

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
  async function sendMessage() {
    if (!inputMessage.value.trim() || isThinking.value) return

    const userMessage = inputMessage.value.trim()
    messages.value.push(reactive({ text: userMessage, isAI: false }))
    inputMessage.value = ''
    isThinking.value = true

    let aiMessage: Message | null = null
    let aiIndex = -1

    try {
      await aiProvider.sendMessage(messages.value, (chunk) => {
        if (!aiMessage) {
          aiMessage = reactive<Message>({ text: chunk, isAI: true })
          messages.value.push(aiMessage)
          aiIndex = messages.value.length - 1
          isThinking.value = false
        } else {
          messages.value[aiIndex].text += chunk
        }
      })

      if (!aiMessage) {
        aiMessage = reactive<Message>({
          text: 'Не удалось получить ответ',
          isAI: true,
        })
        messages.value.push(aiMessage)
      }
    } catch (error: unknown) {
      console.error(error)
      messages.value.push({
        text: 'Произошла ошибка при обработке запроса',
        isAI: true,
      })
    } finally {
      isThinking.value = false
    }
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
    cards,
    toggleRecording,
  }
})
