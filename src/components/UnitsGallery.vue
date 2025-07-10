<script setup>
import { useUtils } from '../composables/useUtils'

defineProps({
  units: {
    type: Array,
    required: true
  }
})

defineEmits(['open-modal'])

const { getUnitCost, getUnitImageUrl } = useUtils();
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
    <div
      v-for="unit in units"
      :key="`${unit.faction}-${unit.name}-${unit.wounded}`"
      class="border rounded-lg shadow-lg overflow-hidden bg-white transition-transform transform hover:scale-105 cursor-pointer"
      @click="$emit('open-modal', unit)"
    >
      <img
        :src="getUnitImageUrl(unit)"
        :alt="$t('units.unitImageAlt', { unitName: unit.name })"
        class="w-full object-cover bg-gray-200"
        @error="$event.target.src = `https://placehold.co/400x400/2d3748/ffffff?text=${encodeURIComponent(unit.name)}`"
      />
      <div class="p-3">
        <h3 class="font-bold text-md capitalize truncate" :title="unit.name">{{ unit.name }}</h3>
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-300 capitalize">
          <span class="font-medium text-gray-600 dark:text-gray-400">{{ unit.faction }}</span>
          <span class="font-medium text-gray-600 dark:text-gray-400">{{ unit.expansion }}</span>
        </div>

        <!-- Unit Stats -->
        <div class="flex justify-around items-center mt-4 text-center text-xs text-gray-700 dark:text-gray-300">
            <div>
                <span class="font-bold text-blue-400">{{ $t('units.gallery.move') }}</span>
                <p class="text-lg">{{ unit.move }}</p>
            </div>
            <div>
                <span class="font-bold text-yellow-400">{{ $t('units.gallery.atk') }}</span>
                <p class="text-lg">{{ unit.atk }}</p>
            </div>
            <div>
                <span class="font-bold text-purple-400">{{ $t('units.gallery.range') }}</span>
                <p class="text-lg">{{ unit.range }}</p>
            </div>
        </div>

      </div>
    </div>
  </div>
</template>