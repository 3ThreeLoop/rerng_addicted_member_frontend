<script setup lang="ts">
import { seriesData } from '@/data/series';
import { onMounted, onUnmounted, ref } from 'vue';

const series = ref(seriesData);
const currentIndex = ref(0);
const isTransitioning = ref(false);

let slideInterval: number | undefined;

const nextSlide = () => {
    if (isTransitioning.value) return;
    isTransitioning.value = true;

    setTimeout(() => {
        currentIndex.value = (currentIndex.value + 1) % series.value.length;
        isTransitioning.value = false;
    }, 500);
};

const prevSlide = () => {
    if (isTransitioning.value) return;
    isTransitioning.value = true;

    setTimeout(() => {
        currentIndex.value = currentIndex.value === 0 ? series.value.length - 1 : currentIndex.value - 1;
        isTransitioning.value = false;
    }, 500);
};

const goToSlide = (index: number) => {
    if (isTransitioning.value || index === currentIndex.value) return;
    isTransitioning.value = true;

    setTimeout(() => {
        currentIndex.value = index;
        isTransitioning.value = false;
    }, 500);
};

const startAutoPlay = () => {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
};

const stopAutoPlay = () => {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
};

onMounted(() => {
    startAutoPlay();
});

onUnmounted(() => {
    stopAutoPlay();
});
</script>

<template>
    <div class="home-slide w-full !mt-[-75px] h-[550px] relative" @mouseenter="stopAutoPlay"
        @mouseleave="startAutoPlay">

        <!-- Slides Container -->
        <div class="slides-container w-full h-full relative">
            <div v-for="(item, index) in series" :key="item.id" class="banner w-full h-full absolute top-0 left-0"
                :class="{ 'active': index === currentIndex, 'fade-out': isTransitioning && index === currentIndex }">
                <img :src="item.bannerUrl" :alt="`cover-${item.id}`" class="object-cover w-full h-full">
                <!-- Netflix-style gradients -->
                <div class="banner-gradient-left"></div>
                <div class="banner-gradient-right"></div>
                <div class="banner-gradient-bottom"></div>
            </div>
        </div>

        <!-- Content positioned on the banner -->
        <div class="content absolute bottom-[-80px] left-2 w-full h-full flex items-center z-10 px-12">
            <transition name="fade" mode="out-in">
                <div :key="currentIndex" class="content-wrapper max-w-2xl flex gap-6 items-center">
                    <img :src="series[currentIndex]?.thumbnailUrl" :alt="`poster-${series[currentIndex]?.id}`"
                        class="w-58 rounded-lg shadow-2xl">
                    <div class="content-info">
                        <img :src="series[currentIndex]?.logoUrl" :alt="`logo-${series[currentIndex]?.id}`"
                            class="mb-6 max-h-18">
                        <div class="overall-info flex gap-2 items-center mb-2">
                            <span class="country text-white">{{ series[currentIndex]?.language }}</span>
                            <v-icon color="yellow-darken-2" icon="mdi-atom" size="12"></v-icon>
                            <span class="rating text-white bg-gray-400/50 !px-1 rounded-md">{{
                                series[currentIndex]?.rating }}</span>
                            <v-icon color="yellow-darken-2" icon="mdi-atom" size="12"></v-icon>
                            <span class="year text-white">{{ series[currentIndex]?.releaseYear }}</span>
                            <v-icon color="yellow-darken-2" icon="mdi-atom" size="12"></v-icon>
                            <span class="year text-white">{{ series[currentIndex]?.director }}</span>
                        </div>
                        <span v-for="genre in series[currentIndex]?.genre"
                            class="genre text-white px-2 mr-2 text-sm bg-netflix-dark-red rounded-md">{{ genre
                            }} </span>
                        <p class="text-gray-300 text-lg mt-4 mb-4">{{ series[currentIndex]?.description }}</p>
                        <h3 class="staring-title text-white uppercase font-semibold">Starring :</h3>
                        <span v-for="actor in series[currentIndex]?.cast" class="star text-white opacity-60">{{
                            actor }}, </span>
                        <div class="flex gap-4 mt-4">
                            <div class="text-center">
                                <v-btn prepend-icon="mdi-play" color="red-darken-4">
                                    <template v-slot:prepend>
                                        <v-icon size="26"></v-icon>
                                    </template>
                                    Play Now
                                </v-btn>
                            </div>
                            <div class="text-center">
                                <v-btn prepend-icon="mdi-play" color="white" variant="outlined">
                                    <template v-slot:prepend>
                                        <v-icon size="26"></v-icon>
                                    </template>
                                    Add to Watchlist
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <!-- Navigation Arrows -->
        <button @click="prevSlide"
            class="nav-arrow nav-arrow-left absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all">
            <v-icon size="32">mdi-chevron-left</v-icon>
        </button>
        <button @click="nextSlide"
            class="nav-arrow nav-arrow-right absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all">
            <v-icon size="32">mdi-chevron-right</v-icon>
        </button>

        <!-- Slide Indicators -->
        <div class="slide-indicators absolute bottom-6 right-0 -translate-x-1/2 z-20 flex gap-2">
            <button v-for="(item, index) in series" :key="index" @click="goToSlide(index)" class="indicator"
                :class="{ 'active': index === currentIndex }">
            </button>
        </div>
    </div>
</template>

<style scoped>
.home-slide {
    z-index: 5;
}

.slides-container {
    position: relative;
}

.banner {
    position: absolute;
    overflow: hidden;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.banner.active {
    opacity: 1;
    pointer-events: auto;
    z-index: 1;
}

.banner.fade-out {
    opacity: 0;
}

/* Left to right gradient*/
.banner-gradient-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.7) 30%,
            rgba(0, 0, 0, 0.4) 60%,
            transparent 100%);
    pointer-events: none;
    z-index: 1;
}

/* Right side subtle gradient */
.banner-gradient-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 30%;
    height: 100%;
    background: linear-gradient(to left,
            rgba(0, 0, 0, 0.6) 0%,
            transparent 100%);
    pointer-events: none;
    z-index: 1;
}

/* Bottom gradient for smoother transition */
.banner-gradient-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to top,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            transparent 100%);
    pointer-events: none;
    z-index: 1;
}

/* Content styling */
.content {
    pointer-events: none;
}

.content-wrapper {
    pointer-events: auto;
}

/* Fade transition for content */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Navigation Arrows */
.nav-arrow {
    backdrop-filter: blur(4px);
}

.nav-arrow:hover {
    transform: translateY(-50%) scale(1.1);
}

/* Slide Indicators */
.indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.indicator:hover {
    background-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.2);
}

.indicator.active {
    background-color: #e50914;
    width: 32px;
    border-radius: 6px;
}
</style>