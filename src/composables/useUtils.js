import { useI18n } from 'vue-i18n';

/**
 * A composable for card-related utility functions.
 */
export function useUtils() {
  const { t } = useI18n();

  /**
   * Gets the deployment cost of a unit.
   * Uses the predefined 'cost' if available, otherwise calculates it.
   * @param {object} unit The unit object.
   * @returns {number} The cost.
   */
  const getUnitCost = (unit) => {
    const plus = unit.faction === "mercenaries" ? 1 : 0;
    return unit.initiative + unit.atk + unit.range + unit.move + plus - 3;
  };

  /**
   * Gets the URL for a location's image.
   * @param {object} location The location object.
   * @returns {string} The image URL.
   */
  const getLocationImageUrl = (location) => {
    return new URL(`../assets/locations/${location.universe}/${location.expansion}/${location.expansion}_${location.code}.png`, import.meta.url).href;
  };

  /**
   * Gets the URL for a unit's image.
   * @param {object} unit The unit object.
   * @returns {string} The image URL.
   */
  const getUnitImageUrl = (unit) => {
    const fileName = unit.name.replace(/ /g, "-").toLowerCase();
    const wounded = unit.wounded ? "_wounded" : "";
    return new URL(`../assets/units/${unit.universe}/${unit.expansion}/${unit.expansion}_${unit.faction}_${fileName}${wounded}.png`, import.meta.url).href;
  };

  // Función para obtener el nombre localizado de la facción
  const getFactionName = (factionCode) => {
    if (!factionCode) {
      return t('factions.any'); // Texto para facciones neutrales
    }
    return t(`factions.${factionCode}`, factionCode);
  };

  // Función para obtener el nombre localizado del tipo de hechizo
  const getSpellTypeName = (typeCode) => {
    return t(`spellTypes.${typeCode}`, typeCode);
  };

  return { getUnitCost, getLocationImageUrl, getUnitImageUrl, getFactionName, getSpellTypeName };
}