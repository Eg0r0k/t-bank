<template>
    <div class="w-full border rounded  bg-white  transition-shadow ">
        <div class="relative rounded-2xl  bg-muted">
            <img loading="lazy" alt="img" src="/img/missing.png"
                class="w-full text-center italic  h-full aspect-video  object-cover object-center">
            <RoundedButton variant="outline" class="size-8 absolute right-2 bottom-2">
                <Icon icon="material-symbols:favorite-outline-rounded" />
            </RoundedButton>
        </div>
        <div class="p-2">
            <div class=" font-medium">Scuffers</div>
            <div class="font-bold flex items-center"> 4.5
                <Icon icon="ic:round-star" />
                (502)
            </div>
            <div class=" text-gray-500">Visit shop</div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import RoundedButton from '../ui/button/RoundedButton.vue';
import { Icon } from "@iconify/vue";

</script>