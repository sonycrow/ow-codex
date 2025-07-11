<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUtils } from '../composables/useUtils';
import spellsData from '../data/spells.json';
import SpellsTable from '../components/SpellsTable.vue';

const { locale } = useI18n();

const allSpells = spellsData; // Cargar todos los datos de hechizos

const searchQuery = ref('');
const selectedType = ref('all');
const selectedExpansion = ref('all');
const selectedFaction = ref('all');

// Extraer valores únicos para los filtros
const spellTypes = computed(() => {
  const types = new Set(allSpells.map(spell => spell.type));
  return ['all', ...Array.from(types).sort()];
});

const spellExpansions = computed(() => {
  const expansions = new Set(allSpells.map(spell => spell.expansion));
  return ['all', ...Array.from(expansions).sort()];
});

const spellFactions = computed(() => {
  const factions = new Set(allSpells.map(spell => spell.faction));
  return ['all', ...Array.from(factions).sort()];
});

const filteredSpells = computed(() => {
  return allSpells.filter(spell => {
    const searchMatch = spell.name[locale.value]?.toLowerCase().includes(searchQuery.value.toLowerCase()) || spell.text[locale.value]?.toLowerCase().includes(searchQuery.value.toLowerCase())
    const typeMatch = selectedType.value === 'all' || spell.type === selectedType.value
    const expansionMatch = selectedExpansion.value === 'all' || spell.expansion === selectedExpansion.value
    const factionMatch = selectedFaction.value === 'all' || spell.faction === selectedFaction.value
    return searchMatch && typeMatch && factionMatch && expansionMatch
  })
})

const { getFactionName, getSpellTypeName } = useUtils()
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{{ $t('spells.title') }}</h2>

    <!-- Filters and Search -->
    <div class="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Search -->
      <div>
        <input
          type="text"
          id="search"
          v-model="searchQuery"
          :placeholder="$t('spells.filter.searchPlaceholder')"
          class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Filter by Type -->
      <div>
        <select
          id="filter-type"
          v-model="selectedType"
          class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 capitalize"
        >
          <option v-for="type in spellTypes" :key="type" :value="type">
            {{ type === 'all' ? $t('spells.filter.allTypes') : getSpellTypeName(type) }}
          </option>
        </select>
      </div>

      <!-- Filter by Expansion -->
      <div>
        <select
          id="filter-expansion"
          v-model="selectedExpansion"
          class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 capitalize"
        >
          <option v-for="expansion in spellExpansions" :key="expansion" :value="expansion">
            {{ expansion === 'all' ? $t('spells.filter.allExpansions') : expansion }}
          </option>
        </select>
      </div>

      <!-- Filter by Faction -->
      <div>
        <select
          id="filter-faction"
          v-model="selectedFaction"
          class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 capitalize"
        >
          <option v-for="faction in spellFactions" :key="faction" :value="faction">
            {{ faction === 'all' ? $t('spells.filter.allFactions') : getFactionName(faction) }}
          </option>
        </select>
      </div>
    </div>

    <!-- Spells Table -->
    <div v-if="filteredSpells.length > 0">
      <SpellsTable :spells="filteredSpells" />
    </div>
    <p v-else class="text-center text-gray-500 dark:text-gray-400 mt-8">{{ $t('spells.table.noResults') }}</p>

  </div>
</template>