<script setup>
import { useUtils } from '../composables/useUtils'

defineProps({
  units: {
    type: Array,
    required: true
  }
})

defineEmits(['open-modal'])

const { getUnitCost } = useUtils()
</script>

<template>
  <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
    <table class="min-w-full">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('units.table.name') }}</th>
          <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('units.table.faction') }}</th>
          <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('units.table.expansion') }}</th>
          <th class="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('units.table.cost') }}</th>
          <th class="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" :title="$t('units.table.initiative')">{{ $t('units.table.initiative') }}</th>
          <th class="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" :title="$t('units.table.move')">{{ $t('units.table.move') }}</th>
          <th class="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" :title="$t('units.table.atk')">{{ $t('units.table.atk') }}</th>
          <th class="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" :title="$t('units.table.range')">{{ $t('units.table.range') }}</th>
          <th class="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" :title="$t('units.table.wounded')">{{ $t('units.table.wounded') }}</th>
          <th class="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" :title="$t('units.table.unique')">{{ $t('units.table.unique') }}</th>
          <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ $t('units.table.terrain') }}</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr v-for="unit in units" :key="`${unit.faction}-${unit.name}-${unit.wounded}`" class="hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" @click="$emit('open-modal', unit)">
          <td class="py-4 px-6 whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">{{ unit.name }}</td>
          <td class="py-4 px-6 whitespace-nowrap text-gray-500 dark:text-gray-300 capitalize">{{ unit.faction }}</td>
          <td class="py-4 px-6 whitespace-nowrap text-gray-500 dark:text-gray-300 capitalize">{{ unit.expansion }}</td>
          <td class="py-4 px-6 whitespace-nowrap text-center font-semibold text-gray-700 dark:text-gray-200">{{ unit.cost !== undefined ? unit.cost : getUnitCost(unit) }}</td>
          <td class="py-4 px-6 whitespace-nowrap text-center font-semibold text-gray-700 dark:text-gray-200">{{ unit.initiative }}</td>
          <td class="py-4 px-6 whitespace-nowrap text-center font-semibold text-gray-700 dark:text-gray-200">{{ unit.move }}</td>
          <td class="py-4 px-6 whitespace-nowrap text-center font-semibold text-gray-700 dark:text-gray-200">{{ unit.atk }}</td>
          <td class="py-4 px-6 whitespace-nowrap text-center font-semibold text-gray-700 dark:text-gray-200">{{ unit.range }}</td>
          <td class="py-4 px-6 whitespace-nowrap text-center">
            <span v-if="unit.wounded">
              <!-- Icono check (sí) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="inline h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </td>
          <td class="py-4 px-6 whitespace-nowrap text-center">
            <span v-if="unit.unique">
              <!-- Icono check (sí) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="inline h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </span>
              <!-- Icono cruz (no) -->
              <!-- <svg xmlns="http://www.w3.org/2000/svg" class="inline h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>-->
          </td>
          <td class="py-4 px-6 whitespace-nowrap text-gray-500 dark:text-gray-300 capitalize">{{ unit.terrain }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>