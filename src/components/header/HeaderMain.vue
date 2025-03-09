<template>
    <header class=" w-full bg-background mb-2">
        <div class="container flex justify-between items-center mx-auto w-full p-4">
            <TBank />
            <div class="flex items-center gap-2">
                <RoundedButton @click="appStore.openChat" class="w-8 h-8" variant="outline">
                    <Icon icon="mage:stars-b-fill" />
                </RoundedButton>

                <RoundedButton class="w-8 h-8" variant="outline">
                    <Icon icon="material-symbols:favorite-outline-rounded" />
                </RoundedButton>
                <RoundedButton class="w-8 h-8" variant="outline">
                    <Icon icon="mdi:cart-outline" />
                </RoundedButton>
            </div>
        </div>
    </header>

</template>
<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import TBank from '../icons/TBank.vue';
import RoundedButton from '../ui/button/RoundedButton.vue';
import { Icon } from "@iconify/vue";

const appStore = useAppStore()

</script>