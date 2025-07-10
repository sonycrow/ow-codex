<script setup>
import { ref, computed } from 'vue'
import { useUtils } from '../composables/useUtils'
import unitsData from '../data/units.json'
import UnitsGallery from '../components/UnitsGallery.vue'
import UnitsTable from '../components/UnitsTable.vue'

const { getUnitImageUrl } = useUtils()

const viewMode = ref('gallery') // 'gallery' or 'table'
const searchQuery = ref('')
const selectedFaction = ref('all')
const selectedTerrain = ref('all')
const selectedExpansion = ref('all')

const isModalOpen = ref(false)
const selectedUnit = ref(null)

const allUnits = unitsData

// Filtramos las versiones "heridas" de los héroes para mostrar solo la principal.
//allUnits = allUnits.filter(unit => !unit.wounded)

const factions = computed(() => {
  const factionSet = new Set(allUnits.map(unit => unit.faction))
  return ['all', ...Array.from(factionSet).sort()]
})

const terrains = computed(() => {
  const terrainSet = new Set(allUnits.map(unit => unit.terrain))
  return ['all', ...Array.from(terrainSet).sort()]
})

const expansions = computed(() => {
  const expansionSet = new Set(allUnits.map(unit => unit.expansion))
  return ['all', ...Array.from(expansionSet).sort()]
})

const filteredUnits = computed(() => {
  return allUnits.filter(unit => {
    const searchMatch = unit.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const factionMatch = selectedFaction.value === 'all' || unit.faction === selectedFaction.value
    const terrainMatch = selectedTerrain.value === 'all' || unit.terrain === selectedTerrain.value
    const expansionMatch = selectedExpansion.value === 'all' || unit.expansion === selectedExpansion.value
    return searchMatch && factionMatch && terrainMatch && expansionMatch
  })
})

const openModal = (unit) => {
  selectedUnit.value = unit
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedUnit.value = null
}

const setViewMode = (mode) => {
  viewMode.value = mode
}
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{{ $t('units.title') }}</h2>

    <!-- Filters and Search -->
    <div class="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-wrap items-center gap-4">
      <!-- Search -->
      <div class="flex-grow min-w-[200px]">
        <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('units.search') }}</label>
        <input
          type="text"
          id="search"
          v-model="searchQuery"
          :placeholder="$t('units.searchPlaceholder')"
          class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Filter by Faction -->
      <div class="flex-grow min-w-[150px]">
        <label for="faction-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('units.filterByFaction') }}</label>
        <select
          id="faction-filter"
          v-model="selectedFaction"
          class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 capitalize"
        >
          <option v-for="faction in factions" :key="faction" :value="faction">
            {{ faction === 'all' ? $t('units.allFactions') : faction }}
          </option>
        </select>
      </div>

      <!-- Filter by Expansion -->
      <div class="flex-grow min-w-[150px]">
        <label for="expansion-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('units.filterByExpansion') }}</label>
        <select
          id="expansion-filter"
          v-model="selectedExpansion"
          class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 capitalize"
        >
          <option v-for="expansion in expansions" :key="expansion" :value="expansion">
            {{ expansion === 'all' ? $t('units.allExpansions') : expansion }}
          </option>
        </select>
      </div>

      <!-- Filter by Terrain -->
      <div class="flex-grow min-w-[150px]">
        <label for="terrain-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('units.filterByTerrain') }}</label>
        <select
          id="terrain-filter"
          v-model="selectedTerrain"
          class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 capitalize"
        >
          <option v-for="terrain in terrains" :key="terrain" :value="terrain">
            {{ terrain === 'all' ? $t('units.allTerrains') : terrain }}
          </option>
        </select>
      </div>

      <!-- View Switcher -->
      <div class="self-end">
        <button @click="setViewMode('gallery')" :class="{'bg-blue-500 text-white': viewMode === 'gallery'}" class="p-2 rounded-l-md border dark:border-gray-600" :title="$t('units.galleryView')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3zm1 2h3v3H4V5zm5 0h3v3H9V5zm5 0h3v3h-3V5zm-5 5h3v3H9v-3zm-5 0h3v3H4v-3zm10 0h3v3h-3v-3z" clip-rule="evenodd" /></svg>
        </button>
        <button @click="setViewMode('table')" :class="{'bg-blue-500 text-white': viewMode === 'table'}" class="p-2 rounded-r-md border dark:border-gray-600" :title="$t('units.tableView')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div v-if="filteredUnits.length > 0">
      <UnitsGallery v-if="viewMode === 'gallery'" :units="filteredUnits" @open-modal="openModal" />
      <UnitsTable v-if="viewMode === 'table'" :units="filteredUnits" @open-modal="openModal" />
    </div>
    <p v-else class="text-center text-gray-500 dark:text-gray-400 mt-8">{{ t('units.noResults') }}</p>

    <!-- Modal -->
    <div v-if="isModalOpen && selectedUnit" @click="closeModal" class="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
        <div @click.stop class="relative max-w-full max-h-full">
            <button @click="closeModal" class="absolute -top-3 -right-3 text-white bg-gray-900 bg-opacity-75 rounded-full p-1.5 z-10 hover:bg-opacity-100 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <img
                :src="getUnitImageUrl(selectedUnit)"
                :alt="$t('units.modalAlt', { unitName: selectedUnit.name })"
                class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                @error="event => event.target.src = `https://placehold.co/400x400/2d3748/ffffff?text=${encodeURIComponent(selectedUnit.name)}`"
            >
        </div>
    </div>
  </div>
</template>