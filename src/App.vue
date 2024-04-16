<script setup lang="ts">
import { ref } from 'vue';

import BlogPost from '@/components/BlogPost.vue';
import AppFooter from '@/components/AppFooter.vue';

const adLog = ref<string[]>([]);

const handleAdVisible = (ad: { name: string; when: string }) => {
  adLog.value.push(`${ad.name} was visible at ${ad.when}`);
};
</script>

<template>
  <main class="container p-4 mx-auto">
    <div class="sticky top-0 left-0 w-full px-4 mb-12 bg-slate-600">
      <h1>Ad log:</h1>
      <ul>
        <li v-for="(entry, index) in adLog" :key="index">
          {{ entry }}
        </li>
      </ul>
      <hr class="mt-6">
    </div>
    <BlogPost @ad:visible="handleAdVisible" />
    <AppFooter @ad:visible="handleAdVisible" />
  </main>
</template>
