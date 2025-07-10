<script setup>
import { useI18n } from 'vue-i18n';

defineProps({
  locations: {
    type: Array,
    required: true,
  },
});
defineEmits(['open-modal']);

const { locale } = useI18n();
</script>

<template>
    <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table class="min-w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('locations.table.name') }}</th>
                    <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('locations.table.terrain') }}</th>
                    <th class="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('locations.table.entrance') }}</th>
                    <th class="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('locations.table.gold') }}</th>
                    <th class="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('locations.table.mana') }}</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="location in locations" :key="location.code" @click="$emit('open-modal', location)" class="hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                    <td class="py-4 px-6 whitespace-nowrap font-medium text-gray-900 dark:text-white">{{ location.name[locale] || location.name.es }}</td>
                    <td class="py-4 px-6 whitespace-nowrap text-gray-500 dark:text-gray-300 capitalize">{{ location.terrain }}</td>
                    <td class="py-4 px-6 whitespace-nowrap text-center font-semibold text-blue-400">{{ location.entrance }}</td>
                    <td class="py-4 px-6 whitespace-nowrap text-center font-semibold text-yellow-400">{{ location.gold }}</td>
                    <td class="py-4 px-6 whitespace-nowrap text-center font-semibold text-purple-400">{{ location.mana }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>