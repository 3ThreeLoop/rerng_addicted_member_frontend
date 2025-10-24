<script setup lang="ts">
import Navbar from '@/components/ui/Navbar.vue';
</script>

<template>
    <div class="main-layout w-full h-full">
        <div>
            <p>{{ $t('hello') }}</p>
            <p>{{ $t('welcome') }}</p>
        </div>
        <navbar />
        <router-view></router-view>
    </div>
</template>

<style scoped></style>