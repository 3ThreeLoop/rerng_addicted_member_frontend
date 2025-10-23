<script setup lang="ts">

</script>
<template>
    <!-- Curved Divider -->
    <div class="curved-divider">
    </div>
</template>


<style scoped>
.curved-divider {
    position: relative;
    width: 100%;
    height: 60px;
    margin-top: 50px;
    /* MOVED DOWN: Positive value pushes divider down */
    z-index: 15;
    overflow: visible;
    /* background: radial-gradient(50% 500% at 50% -420%, rgba(64, 97, 231, 0.4) 80%, rgba(0, 0, 0, 0.1) 100%), black; */
}

.curved-divider::before {
    content: '';
    position: absolute;
    top: -30px;
    /* LESS CURVE: Reduced from -60px to make it less high */
    left: 0;
    width: 100%;
    height: 60px;
    /* LESS CURVE: Reduced from 120px */
    background: linear-gradient(to right,
            #1a0a12 0%,
            #8b2456 15%,
            #d41f3c 30%,
            #e50914 50%,
            #d41f3c 70%,
            #8b2456 85%,
            #1a0a12 100%);
    border-radius: 50% 50% 0 0 / 60% 60% 0 0;
    /* FLATTER CURVE: Reduced from 100% to 60% */
    z-index: 1;
}

.curved-divider::after {
    content: '';
    position: absolute;
    top: -27px;
    /* ADJUSTED: 3px less than ::before */
    left: 0;
    width: 100%;
    height: 57px;
    /* ADJUSTED: 3px less than ::before */
    background: radial-gradient(50% 500% at 50% -420%, rgba(64, 97, 231, 0.4) 80%, rgba(0, 0, 0, 0.1) 100%), black;
    border-radius: 50% 50% 0 0 / 60% 60% 0 0;
    /* FLATTER CURVE: Match ::before */
    z-index: 2;
}
</style>