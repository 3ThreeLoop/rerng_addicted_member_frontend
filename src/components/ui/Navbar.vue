<script setup lang="ts">
import LanguageSelector from '@/components/ui/LanguageSelector.vue';
import ThemeSelector from './ThemeSelector.vue';
import router from '@/router';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const navbarClass = computed(() => {
    return route.path === '/'
        ? 'bg-transparent'
        : 'bg-color backdrop-blur-md shadow-md'
})
</script>
<template>
    <div class="home-navbar w-full h-[75px] flex items-center justify-between !py-2 !px-6 relative z-20"
        :class="navbarClass">
        <img @click="router.push('/')" src="/images/site/logo.png" alt="site-logo" class="h-full cursor-pointer">
        <div class="nav-bar-setting flex items-center gap-4">
            <theme-selector />
            <language-selector />
            <v-avatar color="green" size="large">
                <v-img alt="John" src="/images/avatars/user1.png"></v-img>
            </v-avatar>
        </div>
    </div>
</template>
<style scoped>
/* RECOMMENDED: Option 8 - Enhanced version with gradient border */
.bg-color {
    background: linear-gradient(135deg,
            rgba(17, 24, 39, 0.97) 0%,
            rgba(30, 41, 59, 0.4) 60%,
            rgba(64, 97, 231, 0.2) 100%);
    backdrop-filter: blur(16px) saturate(120%);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
    position: relative;
}

/* Gradient border using ::after pseudo-element */
.bg-color::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right,
            #1a0a12 0%,
            #8b2456 15%,
            #d41f3c 30%,
            #e50914 50%,
            #d41f3c 70%,
            #8b2456 85%,
            #1a0a12 100%);
}
</style>