<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useTheme } from 'vuetify'
import { useThemeStore } from '@/stores/themeStores'
import { useI18n } from 'vue-i18n'
import { themeConfig } from '@/plugins/vuetifyTheme'

const { t } = useI18n()
const themeStore = useThemeStore()
const theme = useTheme()
const menuOpen = ref(false)

interface Theme {
  name: string
  label: string
  value: string
  iconColor: string
}

const themes: Theme[] = (Object.keys(themeConfig.themes) as Array<keyof typeof themeConfig.themes>).map((key: keyof typeof themeConfig.themes) => {
  const tColors = themeConfig.themes[key].colors
  return {
    name: String(key),
    label: String(key), 
    value: String(key),
    iconColor: tColors.primary,
  }
})

const currentTheme = computed(() => themeStore.currentTheme)

function selectTheme(themeName: string) {
  themeStore.setTheme(themeName)
  theme.global.name.value = themeName
  localStorage.setItem('theme', themeName) 
  menuOpen.value = false
}

// Apply theme on initial load
watch(
  () => themeStore.currentTheme,
  (newTheme) => {
    theme.global.name.value = newTheme
  },
  { immediate: true }
)
</script>

<template>
  <div class="theme-selector-wrapper">
    <v-select
      v-model="currentTheme"
      :items="themes"
      item-title="label"
      item-value="value"
      variant="outlined"
      density="compact"
      hide-details
      class="theme-selector"
      v-model:menu="menuOpen"
      :menu-props="{ contentClass: 'theme-dropdown', offset: 8 }"
    >
      <!-- Custom selection display -->
      <template v-slot:selection="{ item }">
        <div class="theme-display flex items-center gap-2">
          <Icon icon="line-md:paint-drop-half-twotone" class="text-2xl" :color="item.raw.iconColor" />
          <span>{{ t(`theme.${item.raw.label}`) }}</span>
        </div>
      </template>

      <!-- Custom item display in dropdown -->
      <template v-slot:item="{ item }">
        <div
          class="theme-item flex items-center gap-2"
          :class="{ 'active': currentTheme === item.raw.value }"
          @click="selectTheme(item.raw.value)"
        >
          <Icon icon="line-md:paint-drop-half-twotone" class="text-2xl" :color="item.raw.iconColor" />
          <span>{{ t(`theme.${item.raw.label}`) }}</span>
        </div>
      </template>
    </v-select>
  </div>
</template>

<style scoped>
.theme-selector-wrapper {
  width: 200px;
}

/* Main select styling */
.theme-selector :deep(.v-field) {
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: #fff;
  min-height: 36px;
}

.theme-selector :deep(.v-field:hover) {
  border-color: rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.6);
}

.theme-selector :deep(.v-field--focused) {
  border-color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
}

.theme-selector :deep(.v-field__outline) {
  display: none;
}

.theme-selector :deep(.v-field__input) {
  padding: 6px 8px;
  min-height: 34px;
}

.theme-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Dropdown menu styling */
.theme-dropdown {
  background-color: rgba(0, 0, 0, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 4px !important;
  margin-top: 4px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.8) !important;
  padding: 8px !important;
}

.theme-dropdown .theme-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.theme-dropdown .theme-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.theme-dropdown .theme-item.active {
  background-color: rgba(229, 9, 20, 0.15) !important;
}

.theme-dropdown .theme-item.active:hover {
  background-color: rgba(229, 9, 20, 0.25) !important;
}
</style>
