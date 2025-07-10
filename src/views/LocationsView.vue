<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import locations from '../data/locations.json';
import LocationGallery from '../components/LocationsGallery.vue';
import LocationTable from '../components/LocationsTable.vue';
import { useUtils } from '../composables/useUtils';

const { locale } = useI18n();
const { getLocationImageUrl } = useUtils();
const viewMode = ref('gallery');
const searchTerm = ref('');
const terrainFilter = ref('');

const isModalOpen = ref(false);
const selectedLocation = ref(null);

const openModal = (location) => {
  selectedLocation.value = location;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedLocation.value = null;
};

const setViewMode = (mode) => {
  viewMode.value = mode
}

const filteredLocations = computed(() => {
    return locations.filter(location => {
        const name = location.name[locale.value] || location.name.es;
        const nameMatch = name.toLowerCase().includes(searchTerm.value.toLowerCase());
        const terrainMatch = terrainFilter.value ? location.terrain === terrainFilter.value : true;
        return nameMatch && terrainMatch;
    });
});

const uniqueTerrains = computed(() => [...new Set(locations.map(location => location.terrain))]);
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{{ $t('locations.title') }}</h2>
    <div class="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-wrap items-center gap-4">
      <div class="flex-grow min-w-[200px]">
        <input type="text" v-model="searchTerm" :placeholder="$t('locations.searchPlaceholder')" class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="flex-grow min-w-[150px]">
        <select v-model="terrainFilter" class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
          <option value="">{{ $t('locations.allTerrains') }}</option>
          <option v-for="terrain in uniqueTerrains" :key="terrain" :value="terrain" class="capitalize">{{ terrain }}</option>
        </select>
      </div>

      <!-- View Switcher -->
      <div class="self-end">
        <button @click="setViewMode('gallery')" :class="{'bg-blue-500 text-white': viewMode === 'gallery'}" class="p-2 rounded-l-md border dark:border-gray-600" :title="$t('locations.galleryView')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3zm1 2h3v3H4V5zm5 0h3v3H9V5zm5 0h3v3h-3V5zm-5 5h3v3H9v-3zm-5 0h3v3H4v-3zm10 0h3v3h-3v-3z" clip-rule="evenodd" /></svg>
        </button>
        <button @click="setViewMode('table')" :class="{'bg-blue-500 text-white': viewMode === 'table'}" class="p-2 rounded-r-md border dark:border-gray-600" :title="$t('locations.tableView')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
        </button>
      </div>

    </div>
    <p v-if="filteredLocations.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-8">{{ $t('locations.noResults') }}</p>
    <div v-else>
      <LocationGallery v-if="viewMode === 'gallery'" :locations="filteredLocations" @open-modal="openModal" />
      <LocationTable v-else :locations="filteredLocations" @open-modal="openModal" />
    </div>

    <!-- Modal centralizado -->
    <div v-if="isModalOpen && selectedLocation" @click="closeModal" class="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
        <div @click.stop class="relative max-w-full max-h-full">
            <button @click="closeModal" class="absolute -top-3 -right-3 text-white bg-gray-900 bg-opacity-75 rounded-full p-1.5 z-10 hover:bg-opacity-100 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <img 
                :src="getLocationImageUrl(selectedLocation)" 
                :alt="$t('locations.modalAlt', { locationName: selectedLocation.name[locale] || selectedLocation.name.es })" 
                class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                @error="$event.target.src = `https://placehold.co/400x560/2d3748/ffffff?text=${encodeURIComponent(selectedLocation.name[locale] || selectedLocation.name.es)}`"
            >
        </div>
    </div>
  </div>
</template>