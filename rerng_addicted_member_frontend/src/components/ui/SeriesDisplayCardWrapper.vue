<script setup lang="ts">
import router from '@/router';
import type { Series } from '@/types/series';
import { onMounted, onUnmounted, ref } from 'vue';

interface Props {
    seriesData: Series[];
    rank?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    rank: false
});

const scrollContainer = ref<HTMLElement | null>(null);
const showLeftGradient = ref(false);
const showRightGradient = ref(true);

const checkScroll = () => {
    if (!scrollContainer.value) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;

    // Show left gradient if scrolled right
    showLeftGradient.value = scrollLeft > 10;

    // Show right gradient if there's more content to the right
    showRightGradient.value = scrollLeft < scrollWidth - clientWidth - 10;
};

const scrollLeft = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollBy({ left: -400, behavior: 'smooth' });
        setTimeout(checkScroll, 300);
    }
};

const scrollRight = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollBy({ left: 400, behavior: 'smooth' });
        setTimeout(checkScroll, 300);
    }
};

onMounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.addEventListener('scroll', checkScroll);
        checkScroll();
    }
});

onUnmounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('scroll', checkScroll);
    }
});
</script>

<template>
    <div class="series-scroll-wrapper relative group overflow-visible">
        <!-- Left Edge Gradient - Only shows when scrolled right -->
        <div class="edge-gradient-left absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none transition-opacity duration-300"
            :class="showLeftGradient ? 'opacity-100' : 'opacity-0'"></div>

        <!-- Right Edge Gradient - Only shows when there's overflow on right -->
        <div class="edge-gradient-right absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none transition-opacity duration-300"
            :class="showRightGradient ? 'opacity-100' : 'opacity-0'"></div>

        <!-- Left Arrow - Only shows when can scroll left -->
        <button v-if="showLeftGradient" @click="scrollLeft"
            class="scroll-arrow scroll-arrow-left absolute -left-10 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 bg-black/90 hover:bg-red-600 text-white p-3 rounded-full transition-all opacity-90 hover:opacity-100 hover:scale-110 flex items-center justify-center shadow-xl border-2 border-white/20">
            <v-icon size="32">mdi-chevron-left</v-icon>
        </button>

        <!-- Scrollable Container -->
        <div ref="scrollContainer"
            class="series-display-card-container flex gap-6 overflow-x-auto scroll-smooth pb-4 !px-3">
            <div v-for="(serie, index) in seriesData" :key="serie.id" @click="router.push('/episode')"
                class="series-display-card-wrapper relative flex-shrink-0 active:scale-90 duration-200">
                <div v-if="rank"
                    class="number-with-bg absolute top-3/12 -left-4 z-20 pointer-events-none font-open-sans">
                    {{ index + 1 }}
                </div>
                <div
                    class="series-display-card relative flex-shrink-0 group/card cursor-pointer overflow-hidden rounded-lg">
                    <img :src="serie.thumbnailUrl" :alt="`thumbnail-${serie.id}`"
                        class="w-52 h-80 object-cover transition-all duration-300 group-hover/card:scale-110">

                    <!-- Black Gradient Overlay -->
                    <div
                        class="card-gradient absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover/card:opacity-90 transition-opacity duration-300">
                    </div>

                    <!-- Series Info -->
                    <div
                        class="card-info absolute bottom-0 left-0 right-0 !p-4 z-10 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                        <h3 class="text-base font-bold mb-2 line-clamp-2 text-white drop-shadow-lg">{{
                            serie.title }}</h3>
                        <div class="flex items-center gap-2 text-xs text-gray-300 mb-2">
                            <span>{{ serie.releaseYear }}</span>
                            <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span>{{ serie.rating }}</span>
                        </div>
                        <div class="flex gap-1 flex-wrap">
                            <span v-for="genre in serie.genre.slice(0, 2)" :key="genre"
                                class="text-xs px-2 py-1 bg-red-600/80 rounded text-white">
                                {{ genre }}
                            </span>
                        </div>
                    </div>

                    <!-- Hover Play Icon -->
                    <div
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10">
                        <div
                            class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <v-icon size="32" color="white">mdi-play</v-icon>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Right Arrow - Only shows when can scroll right -->
        <button v-if="showRightGradient" @click="scrollRight"
            class="scroll-arrow scroll-arrow-right absolute -right-10 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 bg-black/90 hover:bg-red-600 text-white p-3 rounded-full transition-all opacity-90 hover:opacity-100 hover:scale-110 flex items-center justify-center shadow-xl border-2 border-white/20">
            <v-icon size="32">mdi-chevron-right</v-icon>
        </button>
    </div>
</template>

<style scoped>
.number-with-bg {
    font-size: 100px;
    font-weight: 900;
    color: black;
    /* background: url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800') center/cover; */
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-stroke: 1px #fff;
    text-stroke: 1px #fff;
    letter-spacing: -10px;
    line-height: 1;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
}




/* Hide scrollbar but keep functionality */
.series-display-card-wrapper {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.series-display-card-wrapper::-webkit-scrollbar {
    display: none;
}

/* Show scrollbar on mobile for better UX */
@media (max-width: 768px) {
    .series-display-card-wrapper {
        scrollbar-width: thin;
        scrollbar-color: rgba(229, 9, 20, 0.5) transparent;
    }

    .series-display-card-wrapper::-webkit-scrollbar {
        display: block;
        height: 4px;
    }

    .series-display-card-wrapper::-webkit-scrollbar-track {
        background: transparent;
    }

    .series-display-card-wrapper::-webkit-scrollbar-thumb {
        background: rgba(229, 9, 20, 0.5);
        border-radius: 2px;
    }

    .series-display-card-wrapper::-webkit-scrollbar-thumb:hover {
        background: rgba(229, 9, 20, 0.8);
    }
}

/* Edge gradients */
.edge-gradient-left,
.edge-gradient-right {
    transition: opacity 0.3s ease;
}

/* Hide edge gradients on mobile */
@media (max-width: 768px) {

    .edge-gradient-left,
    .edge-gradient-right {
        display: none;
    }
}

/* Card styling */
.series-display-card {
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.series-display-card:hover {
    box-shadow: 0 8px 16px rgba(229, 9, 20, 0.4);
}

/* Arrow hover effects */
.scroll-arrow {
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.scroll-arrow:hover {
    transform: scale(1.15);
}

/* Line clamp utility */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .series-display-card img {
        width: 160px;
        height: 240px;
    }

    .scroll-arrow {
        display: none !important;
    }
}
</style>