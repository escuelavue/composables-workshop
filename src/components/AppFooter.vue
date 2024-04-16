<script setup lang="ts">
import { onMounted, ref } from 'vue';

const ad = ref(null);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            emit('ad:visible', { name: 'Footer Ad', when: new Date().toISOString() });
        }
    });
})

const emit = defineEmits(['ad:visible']);

onMounted(() => {
    if (ad.value) {
        observer.observe(ad.value);
    }
})
</script>

<template>
    <footer class="m-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <div class="w-full max-w-screen-xl p-4 mx-auto md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a
                    href="https://escuelavue.es/" class="hover:underline">Escuela Vue™</a>. All Rights Reserved.
            </span>

            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <p ref="ad" class="p-6 text-center text-white border border-white bg-slate-800">
            This is an Ad!
        </p>
    </footer>
</template>