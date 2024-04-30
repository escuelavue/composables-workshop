<script setup lang="ts">
import BlogPost from '@/components/BlogPost.vue';
import AppFooter from '@/components/AppFooter.vue';

import { intersectionLog } from '@/composables/UseIntersectionObserver';
</script>

<template>
  <main class="container p-4 mx-auto">
    <div class="sticky top-0 left-0 w-full px-4 mb-12 bg-slate-600">
      <h1>Ad log:</h1>
      <ul>
        <li v-for="(entry, index) in intersectionLog" :key="index">
          {{ entry }}
        </li>
      </ul>
      <hr class="mt-6">
    </div>
    <BlogPost />
    <AppFooter />
  </main>
</template>
