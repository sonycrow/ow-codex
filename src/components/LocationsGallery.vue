<script setup>
import { useUtils } from '../composables/useUtils';
import { useI18n } from 'vue-i18n';

defineProps({
  locations: {
    type: Array,
    required: true,
  },
});
defineEmits(['open-modal']);

const { locale } = useI18n();
const { getLocationImageUrl } = useUtils();
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div v-for="location in locations" :key="location.code" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div @click="$emit('open-modal', location)" class="cursor-pointer">
                <img 
                    :src="getLocationImageUrl(location)" 
                    :alt="$t('locations.locationImageAlt', { locationName: location.name[locale] || location.name.es })" 
                    class="w-full h-auto object-cover bg-gray-300 dark:bg-gray-700"
                    @error="$event.target.src = `https://placehold.co/400x560/2d3748/ffffff?text=${encodeURIComponent(location.name[locale] || location.name.es)}`"
                >
            </div>
            <div class="p-4">
                <h3 class="font-bold text-lg text-gray-800 dark:text-white">{{ location.name[locale] || location.name.es }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 capitalize">{{ location.terrain }}</p>
                
                <!-- Location Stats -->
                <div class="flex justify-around items-center mt-4 text-center text-xs text-gray-700 dark:text-gray-300">
                    <div>
                        <span class="font-bold text-gray-400">{{ $t('locations.gallery.entrance') }}</span>
                        <p class="text-lg">{{ location.entrance }}</p>
                    </div>
                    <div>
                        <span class="font-bold text-yellow-400">{{ $t('locations.gallery.gold') }}</span>
                        <p class="text-lg">{{ location.gold }}</p>
                    </div>
                    <div>
                        <span class="font-bold text-blue-400">{{ $t('locations.gallery.mana') }}</span>
                        <p class="text-lg">{{ location.mana }}</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>