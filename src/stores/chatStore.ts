import { useSpeechRecognition } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, watch, type Ref } from 'vue'
import { AimlApiProvider, type AIProvider } from '@/api/apiProvider'
import type { Product } from '@/components/results/ResultCard.vue'
import { v4 as uuidv4 } from 'uuid'

export interface Message {
  id: string
  text: string
  isAI: boolean
}

const CLIPBOARD_TIMEOUT = 700
const MAX_SPEECH_RESULT_LENGTH = 1000

export const useChatStore = defineStore('chat', () => {
  const messages: Ref<Message[]> = ref([])
  const inputMessage = ref('')
  const isThinking = ref(false)
  const copiedMessages = ref<Record<string, boolean>>({})
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

  const messageActions = {
    update(id: string, newText: string): void {
      const message = messages.value.find((m) => m.id === id)
      if (message && !message.isAI) {
        message.text = newText
      }
    },

    async resend(id: string): Promise<void> {
      const index = messages.value.findIndex((m) => m.id === id)
      if (index === -1 || messages.value[index].isAI) return

      messages.value.splice(index + 1)
      await sendMessage(messages.value[index].text)
    },

    async resendAi(id: string): Promise<void> {
      const index = messages.value.findIndex((m) => m.id === id)
      if (index === -1 || !messages.value[index].isAI) return

      messages.value.splice(index, 1)
      await sendMessage(messages.value[index - 1].text)
    },
  }

  const clipboardActions = {
    async copy(text: string, id: string): Promise<void> {
      try {
        await navigator.clipboard.writeText(text)
        this.setCopiedStatus(id, true)
        setTimeout(() => this.clearCopiedStatus(id), CLIPBOARD_TIMEOUT)
      } catch (error) {
        console.error('Ошибка копирования:', error)
      }
    },

    setCopiedStatus(id: string, status: boolean): void {
      copiedMessages.value[id] = status
    },

    clearCopiedStatus(id: string): void {
      delete copiedMessages.value[id]
    },
  }

  async function sendMessage(text?: string, replaceIndex?: number) {
    const messageText = (text || inputMessage.value).trim()
    if (!messageText || isThinking.value) return

    if (!text) {
      messages.value.push(createMessage(messageText, false))
      inputMessage.value = ''
    }

    isThinking.value = true

    try {
      const aiIndex = replaceIndex !== undefined ? replaceIndex + 1 : messages.value.length
      let aiMessage: Message | null = null

      await aiProvider.sendMessage(messages.value.slice(0, aiIndex), (chunk) => {
        if (!aiMessage) {
          aiMessage = createMessage(chunk, true)
          messages.value.splice(aiIndex, 0, aiMessage)
        } else {
          aiMessage.text += chunk
        }
      })

      if (!aiMessage) {
        throw new Error('Пустой ответ ИИ')
      }
    } catch (error) {
      console.error('Ошибка ИИ:', error)
      const errorMessage = createMessage(
        error instanceof Error ? error.message : 'Ошибка обработки запроса',
        true,
      )
      const aiIndex = replaceIndex !== undefined ? replaceIndex + 1 : messages.value.length
      messages.value.splice(aiIndex, 0, errorMessage)
    } finally {
      isThinking.value = false
    }
  }

  function createMessage(text: string, isAI: boolean): Message {
    return {
      id: uuidv4(),
      text,
      isAI,
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
  watch(result, (newResult) => {
    if (newResult) {
      inputMessage.value = newResult.slice(0, MAX_SPEECH_RESULT_LENGTH)
    }
  })

  return {
    messages,
    inputMessage,
    isThinking,
    copiedMessages,
    cards,
    ...messageActions,
    ...clipboardActions,
    sendMessage,
    toggleRecording,
    isListening,
  }
})
