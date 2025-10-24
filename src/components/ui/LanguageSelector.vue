<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const languageOption = ref([
  { label: "English-US", flag: "/images/flags/american.png", langCode: "en" },
  { label: "ភាសាខ្មែរ", flag: "/images/flags/cambodian.png", langCode: "km" },
  { label: "中文", flag: "/images/flags/chinese.png", langCode: "zh" }
])

const selectedLang = ref(locale.value)
const menuOpen = ref(false)

const selectLanguage = (langCode: string) => {
  selectedLang.value = langCode
  locale.value = langCode  // ✅ this triggers Vue I18n to change language
  localStorage.setItem('lang', langCode) // optional: save user choice
  menuOpen.value = false
}
</script>

<template>
    <div class="lang-selector-wrapper">
        <v-select v-model="selectedLang" :items="languageOption" item-title="label" item-value="langCode"
            variant="outlined" density="compact" hide-details class="lang-selector" v-model:menu="menuOpen" :menu-props="{
                contentClass: 'lang-dropdown',
                offset: 8
            }">
            <!-- Custom selection display -->
            <template v-slot:selection="{ item }">
                <div class="lang-display">
                    <img :src="item.raw.flag" :alt="item.raw.label" class="lang-flag" />
                    <span class="lang-label">{{ item.raw.label }}</span>
                </div>
            </template>

            <!-- Custom item display in dropdown -->
            <template v-slot:item="{ item }">
                <div class="lang-item" :class="{ 'active': selectedLang === item.raw.langCode }"
                    @click="selectLanguage(item.raw.langCode)">
                    <img :src="item.raw.flag" :alt="item.raw.label" class="lang-flag-item" />
                    <span class="lang-item-title">{{ item.raw.label }}</span>
                </div>
            </template>
        </v-select>
    </div>
</template>

<style scoped>
.lang-selector-wrapper {
    width: 160px;
}

/* Main select styling - Netflix style */
.lang-selector :deep(.v-field) {
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    color: #fff;
    min-height: 36px;
}

.lang-selector :deep(.v-field:hover) {
    border-color: rgba(255, 255, 255, 0.5);
    background-color: rgba(0, 0, 0, 0.6);
}

.lang-selector :deep(.v-field--focused) {
    border-color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
}

.lang-selector :deep(.v-field__outline) {
    display: none;
}

.lang-selector :deep(.v-field__input) {
    padding: 6px 8px;
    min-height: 34px;
}

.lang-selector :deep(.v-field__append-inner) {
    padding-top: 4px;
    margin-left: 4px;
}

.lang-selector :deep(.v-icon) {
    color: #fff;
    font-size: 18px;
    opacity: 0.8;
}

/* Selected display */
.lang-display {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.lang-flag {
    width: 24px;
    height: 16px;
    object-fit: cover;
    border-radius: 2px;
    flex-shrink: 0;
}

.lang-label {
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
}
</style>

<style>
/* Dropdown menu styling - Netflix style */
.lang-dropdown {
    background-color: rgba(0, 0, 0, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 4px !important;
    margin-top: 4px !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.8) !important;
}

.lang-dropdown .v-list {
    background-color: transparent !important;
    padding: 8px !important;
}

.lang-dropdown .lang-item {
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 2px !important;
    margin-bottom: 2px;
    padding: 10px 12px !important;
    min-height: 44px !important;
    transition: background-color 0.2s ease;
    cursor: pointer;
}

.lang-dropdown .lang-item:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
}

.lang-dropdown .lang-item.active {
    background-color: rgba(229, 9, 20, 0.15) !important;
}

.lang-dropdown .lang-item.active:hover {
    background-color: rgba(229, 9, 20, 0.25) !important;
}

.lang-dropdown .lang-flag-item {
    width: 24px;
    height: 16px;
    object-fit: cover;
    border-radius: 2px;
    flex-shrink: 0;
}

.lang-dropdown .lang-item-title {
    color: #fff !important;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.5px;
}

/* Custom scrollbar for dropdown */
.lang-dropdown .v-list::-webkit-scrollbar {
    width: 8px;
}

.lang-dropdown .v-list::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
}

.lang-dropdown .v-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

.lang-dropdown .v-list::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}
</style>