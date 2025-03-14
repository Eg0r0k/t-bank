import { nextTick, onActivated, onMounted, watch, type MaybeRef, type Ref } from 'vue'

export const useAutoScroll = (container: Ref<HTMLElement | null>, dependencies: MaybeRef[]) => {
  const scrollToBottom = (animated = false) => {
    nextTick(() => {
      if (!container.value) return

      container.value.scrollTo({
        top: container.value.scrollHeight,
        behavior: animated ? 'smooth' : 'auto',
      })
    })
  }

  onMounted(() => scrollToBottom(false))
  onActivated(() => scrollToBottom(false))

  dependencies.forEach((dep) => {
    watch(dep, () => scrollToBottom(true), { deep: true })
  })
}
