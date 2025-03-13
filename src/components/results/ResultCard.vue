<template>
    <div
        class="w-full flex justify-end mib-h-full relative flex-col items-center  min-w-[350px] p-2 pt-4 bg-muted transition-shadow rounded-[20px]">
        <img loading="lazy" draggable="false" class="mb-5 size-20 border rounded-[20px]"
            :src="props.product.imageUrl || '/img/missing.png'" />
        <div class="flex rounded-full items-center absolute top-3 left-2 bg-background px-2 py-1" v-if="props.isBetter">
            <Icon class="mr-[3px]" icon="mdi:fire" width="23" />
            Лучший
        </div>
        <RoundedButton @click.stop="toggleFavorite" variant="outline" class="size-5 p-4 absolute top-3 right-2">
            <Icon :icon="isFavorite ? 'material-symbols:close' : 'material-symbols:favorite-outline-rounded'" />
        </RoundedButton>
        <div class="bg-background rounded-2xl px-4 py-2 w-full">
            <div class="flex flex-col">
                <div class="flex flex-col mb-4">
                    <span class="font-bold">{{ props.product.name }}</span>
                    <small>{{ formattedPrice }}</small>
                </div>
                <ul v-if="props.product.reasons?.length" class="list-disc ml-4 flex flex-col gap-2 mb-4">
                    <li v-for="reason in props.product.reasons" :key="reason">
                        {{ reason }}
                    </li>
                </ul>
                <TButton :disabled="isInCart" @click="addToCart">Купить</TButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import TButton from '../ui/button/TButton.vue';
import RoundedButton from '../ui/button/RoundedButton.vue';
import { useFavoriteStore } from '@/stores/favoriteStore';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'vue-sonner';
import { computed } from 'vue';

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    reasons?: string[];
}

interface Props {
    product: Product;
    isBetter: boolean;
}

const props = defineProps<Props>();
const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();

const isFavorite = computed(() =>
    props.product?.id ? favoriteStore.isFavorite(props.product.id) : false
);

const isInCart = computed(() =>
    props.product?.id ? cartStore.isInCart(props.product.id) : false
);

const formattedPrice = computed(() => {
    if (!props.product || typeof props.product.price !== 'number') {
        return 'Цена не указана';
    }
    return props.product.price.toLocaleString('ru-RU') + ' ₽';
});

const toggleFavorite = () => {
    if (!props.product) return;

    favoriteStore.toggleFavorite(props.product);
    toast.success(isFavorite.value
        ? 'Сохранено в избранное'
        : 'Удалено из избранного');
};

const addToCart = () => {
    if (!props.product) return;
    cartStore.addToCart(props.product);
};
</script>