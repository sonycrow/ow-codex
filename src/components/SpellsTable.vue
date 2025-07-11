<script setup>
import { useI18n } from 'vue-i18n';
import { useUtils } from '../composables/useUtils';

const { locale } = useI18n();

// Definir la prop que recibirá la lista de hechizos filtrados
const props = defineProps({
  spells: {
    type: Array,
    required: true
  }
});

defineEmits(['open-modal']);

const { getFactionName, getSpellTypeName } = useUtils()
</script>

<template>
  <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('spells.table.name') }}</th>
          <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('spells.table.type') }}</th>
          <th class="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('spells.table.mana') }}</th>
          <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('spells.table.faction') }}</th>
          <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('spells.table.expansion') }}</th>
          <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('spells.table.text') }}</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Iterar sobre la prop 'spells' -->
        <tr v-for="spell in props.spells" :key="spell.code" class="hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" @click="$emit('open-modal', spell)">
          <td class="py-4 px-6 whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">{{ spell.name[locale] || spell.name['en'] }}</td>
          <td class="py-4 px-6 whitespace-nowrap text-gray-500 dark:text-gray-300 capitalize">{{ getSpellTypeName(spell.type) }}</td>
          <td class="py-4 px-6 whitespace-nowrap text-center font-semibold text-gray-700 dark:text-gray-200">{{ spell.mana }}</td>
          <td class="py-4 px-6 whitespace-nowrap text-gray-500 dark:text-gray-300 capitalize">{{ getFactionName(spell.faction) }}</td>
          <td class="py-4 px-6 whitespace-nowrap text-gray-500 dark:text-gray-300 capitalize">{{ spell.expansion }}</td>
          <td class="py-4 px-6 text-gray-500 dark:text-gray-300 max-w-xs overflow-hidden text-ellipsis">{{ spell.text[locale] || spell.text['en'] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>