<script setup lang="ts">

import CurveDevider from '@/components/ui/CurveDevider.vue';
import SlideShow from '@/components/layout/SlideShow.vue';
import { seriesData } from '@/data/series';
import { ref, onMounted, onUnmounted } from 'vue';
import SeriesDisplayCardWrapper from '@/components/ui/SeriesDisplayCardWrapper.vue';
import Navbar from '../../components/ui/Navbar.vue';

</script>

<template>
    <div class="home flex flex-col items-center w-full bg-black min-h-screen">
        <!-- Slide Show -->
        <slide-show />

        <!-- Divider -->
        <curve-devider />

        <!-- Series Display Section -->
        <div class="series-display-section w-full flex justify-center px-6 py-8 overflow-visible flex-col items-center">
            <!-- Trending -->
            <div class="series-display max-w-7xl w-full overflow-visible mb-8">
                <div class="display-header flex items-center justify-between mb-6">
                    <div class="label text-3xl font-bold text-white">Trending Now</div>
                    <div class="text-center">
                        <v-btn append-icon="mdi-dots-horizontal" color="white" variant="tonal">
                            <template v-slot:append>
                                <v-icon size="26"></v-icon>
                            </template>
                            View More
                        </v-btn>
                    </div>
                </div>

                <series-display-card-wrapper :series-data="seriesData" :rank="true" />
            </div>

            <div class="series-display max-w-7xl w-full overflow-visible mb-8">
                <div class="display-header flex items-center justify-between mb-6">
                    <div class="label text-3xl font-bold text-white">KDrama</div>
                    <div class="text-center">
                        <v-btn append-icon="mdi-dots-horizontal" color="white" variant="tonal">
                            <template v-slot:append>
                                <v-icon size="26"></v-icon>
                            </template>
                            View More
                        </v-btn>
                    </div>
                </div>

                <series-display-card-wrapper :series-data="seriesData" />
            </div>

            <div class="series-display max-w-7xl w-full overflow-visible mb-8">
                <div class="display-header flex items-center justify-between mb-6">
                    <div class="label text-3xl font-bold text-white">CDrama</div>
                    <div class="text-center">
                        <v-btn append-icon="mdi-dots-horizontal" color="white" variant="tonal">
                            <template v-slot:append>
                                <v-icon size="26"></v-icon>
                            </template>
                            View More
                        </v-btn>
                    </div>
                </div>

                <series-display-card-wrapper :series-data="seriesData" />
            </div>

            <div class="series-display max-w-7xl w-full overflow-visible mb-8">
                <div class="display-header flex items-center justify-between mb-6">
                    <div class="label text-3xl font-bold text-white">Hollywood</div>
                    <div class="text-center">
                        <v-btn append-icon="mdi-dots-horizontal" color="white" variant="tonal">
                            <template v-slot:append>
                                <v-icon size="26"></v-icon>
                            </template>
                            View More
                        </v-btn>
                    </div>
                </div>

                <series-display-card-wrapper :series-data="seriesData" />
            </div>
        </div>

    </div>
</template>

<style scoped></style>