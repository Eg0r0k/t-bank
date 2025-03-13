<template>
  <div class="flex justify-between items-center px-6 py-3 border-b">
    <Popover :modal="false">
      <PopoverTrigger>
        <RoundedButton variant="ghost" class="w-8 h-8 [&_svg]:size-5">
          <Icon icon="material-symbols:settings-rounded" />
        </RoundedButton>
        <PopoverContent :align-offset="0" align="start">
          <div class="flex flex-col gap-2 w-full">
            <Label for="user">Юзер промпт</Label>
            <Textarea class="min-h-[320px]" id="user" />
            <Button> Сохранить </Button>
          </div>
        </PopoverContent>
      </PopoverTrigger>
    </Popover>

    <span class="truncate font-medium">Ассистент</span>
    <RoundedButton @click="$emit('close')" variant="ghost" class="w-8 h-8 [&_svg]:size-5">
      <Icon icon="material-symbols:close-rounded" />
    </RoundedButton>
  </div>
</template>

<script setup lang="ts">
import RoundedButton from '../ui/button/RoundedButton.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Textarea from '../ui/textarea/Textarea.vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Button from '../ui/button/Button.vue'
import { Label } from '../ui/label'
defineEmits(['close'])
</script>
