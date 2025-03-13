import type { Message } from '@/stores/chatStore'
export interface AIProvider {
  sendMessage: (messages: Message[], onProgress?: (chunk: string) => void) => Promise<string>
}

export class AimlApiProvider implements AIProvider {
  private apiKey = 'a8820b4714a243d0af500b09049527de'
  private apiUrl = 'https://api.aimlapi.com/v1/chat/completions'

  async sendMessage(messages: Message[], onProgress?: (chunk: string) => void): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'nvidia/Llama-3.1-Nemotron-70B-Instruct-HF',
          messages: messages.map((msg) => ({
            role: msg.isAI ? 'assistant' : 'user',
            content: msg.text,
          })),
          max_tokens: 512,
          temperature: 0.7,
          stream: true,
        }),
      })

      if (!response.ok) throw new Error(`HTTP error! ${response.status}`)
      const reader = response.body?.getReader()
      if (!reader) throw new Error('Failed to read stream')

      const decoder = new TextDecoder()
      let result = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (!line.trim() || line === 'data: [DONE]') continue
          if (line.startsWith('data: ')) {
            try {
              const json = JSON.parse(line.slice(6))
              const content = json.choices[0]?.delta?.content || ''
              result += content
              onProgress?.(content)
            } catch (e) {
              console.error('Error parsing chunk:', e)
            }
          }
        }
      }
      return result
    } catch (error) {
      console.error('AIMLAPI Error:', error)
      throw new Error('Произошла ошибка при обработке запроса')
    }
  }
}
