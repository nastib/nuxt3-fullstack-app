<template>
    <div class="flex flex-col h-screen p-4">
        <!-- <span class="text-gray-800 dark:text-white ">default layout</span> -->
        <Navbar/>
        <slot />
    </div>
</template>
<script setup lang="ts">
import Navbar  from '@/components/layout/navbar.vue';
</script>