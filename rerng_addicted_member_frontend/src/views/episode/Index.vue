<script setup lang="ts">
import { seriesData } from '@/data/series';
import { ref } from 'vue';
import VideoPlayer from '@/components/ui/VideoPlayer.vue';

const selectedEpisode = ref(1);
</script>

<template>
    <div
        class="episodes-page min-h-[calc(100vh-75px)] lg:h-[calc(100vh-75px)] grid lg:grid-cols-2 grid-cols-1 lg:overflow-hidden">
        <!-- Video Player Section -->
        <div class="video-player w-full h-[40vh] sm:h-[50vh] lg:h-full overflow-hidden relative group">

            <video-player />
        </div>

        <!-- Episodes Info Section -->
        <div
            class="ep-wrapper bg-netflix-gradient w-full !py-4 !px-4 sm:!py-6 sm:!px-6 lg:!py-6 lg:!px-12 overflow-y-auto custom-scrollbar lg:h-full">
            <!-- Series Info Container -->
            <div class="info-container mb-6 lg:mb-8">
                <h3 class="title text-2xl sm:text-3xl lg:text-4xl font-netflix-logo mb-3 lg:mb-4 text-netflix-red">
                    {{ seriesData[0]?.title }}
                </h3>

                <div class="content-info">
                    <!-- Overall Info -->
                    <div
                        class="overall-info flex flex-wrap gap-1.5 sm:gap-2 items-center mb-3 lg:mb-4 text-sm sm:text-base">
                        <span class="country text-white font-medium">{{ seriesData[0]?.language }}</span>
                        <v-icon color="yellow-darken-2" icon="mdi-atom"
                            :size="$vuetify.display.mobile ? 16 : 20"></v-icon>

                        <span
                            class="rating text-white bg-yellow-700/80 !px-1.5 sm:!px-2 !py-0.5 rounded font-semibold text-xs sm:text-sm">
                            {{ seriesData[0]?.rating }}
                        </span>
                        <v-icon color="yellow-darken-2" icon="mdi-atom"
                            :size="$vuetify.display.mobile ? 16 : 20"></v-icon>
                        <span class="year text-white">{{ seriesData[0]?.releaseYear }}</span>
                        <v-icon color="yellow-darken-2" icon="mdi-atom"
                            :size="$vuetify.display.mobile ? 16 : 20"></v-icon>
                        <span class="director text-white truncate max-w-[100px] sm:max-w-[150px]">{{
                            seriesData[0]?.director }}</span>
                    </div>

                    <!-- Genres -->
                    <div class="genres-wrapper flex flex-wrap gap-1.5 sm:gap-2 mb-3 lg:mb-4"
                        v-if="seriesData[0]?.genre && seriesData[0].genre.length > 0">
                        <span v-for="(genre, index) in seriesData[0].genre" :key="index"
                            class="genre text-white px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-netflix-red/80 hover:bg-netflix-red rounded-full transition-colors cursor-default">
                            {{ genre }}
                        </span>
                    </div>

                    <!-- Description -->
                    <p class="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 lg:mb-6">
                        {{ seriesData[0]?.description }}
                    </p>

                    <!-- Cast -->
                    <div class="cast-section" v-if="seriesData[0]?.cast && seriesData[0].cast.length > 0">
                        <h3
                            class="staring-title text-white uppercase font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm tracking-wide">
                            Starring:
                        </h3>
                        <p class="text-gray-400 text-xs sm:text-sm leading-relaxed">
                            <span v-for="(actor, index) in seriesData[0].cast" :key="index">
                                {{ actor }}<span v-if="index < seriesData[0].cast.length - 1">, </span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Divider -->
            <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4 lg:mb-6"></div>

            <!-- Episodes Container -->
            <div class="ep-container pb-4">
                <div class="ep-heading flex items-center justify-between mb-4 lg:mb-6">
                    <div>
                        <h3 class="text-xl sm:text-2xl font-netflix font-bold text-white">Episodes</h3>
                        <span class="text-gray-400 text-xs sm:text-sm">Season 1</span>
                    </div>
                    <span
                        class="text-netflix-red font-semibold bg-netflix-red/20 px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm">
                        16 Episodes
                    </span>
                </div>

                <!-- Episodes Grid - Responsive -->
                <div class="ep-list-wrapper grid grid-cols-1 gap-2 sm:gap-3">
                    <div v-for="i in 16" :key="i" @click="selectedEpisode = i"
                        :class="{ 'ring-2 ring-netflix-red': selectedEpisode === i }"
                        class="ep-card bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] group">
                        <div class="flex gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-3">
                            <!-- Episode Thumbnail -->
                            <div
                                class="ep-thumbnail relative w-24 h-16 sm:w-28 sm:h-18 lg:w-32 lg:h-20 flex-shrink-0 rounded overflow-hidden bg-gray-800">
                                <img :src="seriesData[0]?.bannerUrl" alt=""
                                    class="w-full h-full object-cover opacity-70">
                                <div
                                    class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <v-icon icon="mdi-play-circle" :size="$vuetify.display.mobile ? 24 : 32"
                                        color="white"></v-icon>
                                </div>
                                <span
                                    class="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 bg-black/80 text-white text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded">
                                    45:00
                                </span>
                            </div>

                            <!-- Episode Info -->
                            <div class="ep-info flex-1 flex flex-col justify-center min-w-0">
                                <div class="flex items-start sm:items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1 flex-wrap">
                                    <h4 class="text-white font-semibold text-sm sm:text-base">{{ i }}. Episode {{ i }}
                                    </h4>
                                    <span v-if="i === selectedEpisode"
                                        class="text-netflix-red text-[10px] sm:text-xs whitespace-nowrap">●
                                        PLAYING</span>
                                </div>
                                <p class="text-gray-400 text-xs sm:text-sm line-clamp-2 lg:line-clamp-2">
                                    A brief description of what happens in this episode. Exciting moments await viewers!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

@media (min-width: 640px) {
    .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
    }
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(229, 9, 20, 0.6);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(229, 9, 20, 0.8);
}

/* Smooth transitions */
.ep-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Line clamp for text truncation */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Responsive text sizing */
@media (max-width: 640px) {
    .ep-thumbnail {
        min-width: 96px;
    }
}

/* Prevent layout shift on mobile */
.ep-info {
    overflow: hidden;
}

/* Better touch targets on mobile */
@media (max-width: 640px) {
    .ep-card {
        min-height: 68px;
    }
}

/* Optimize for tablets */
@media (min-width: 768px) and (max-width: 1023px) {
    .episodes-page {
        min-height: 100vh;
    }

    .video-player {
        height: 50vh;
    }
}
</style>