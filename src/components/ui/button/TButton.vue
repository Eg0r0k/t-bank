<template>
  <Button v-bind="$attrs" class="t-button">
    <slot></slot>
  </Button>
</template>

<script lang="ts" setup>
import Button from './Button.vue'
</script>

<style lang="css" scoped>
.t-button {
  background: #ffdd2d;
  color: black;
  box-shadow: none;
  height: auto;
  padding: 18px 24px;
  border-radius: 12px;
}

.t-button:hover {
  background: #fcc722;
}
</style>
