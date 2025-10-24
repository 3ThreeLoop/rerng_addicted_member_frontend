import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const vuetifyTheme = useTheme()

  // Load saved theme or default to lightBlue
  const currentTheme = ref<string>(localStorage.getItem('theme') || 'lightBlue')

  const setTheme = (themeName: string) => {
    currentTheme.value = themeName
    vuetifyTheme.global.name.value = themeName
    localStorage.setItem('theme', themeName)
  }

  // Initialize Vuetify theme on app load
  vuetifyTheme.global.name.value = currentTheme.value

  return { currentTheme, setTheme }
})
