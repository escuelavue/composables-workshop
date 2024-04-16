<script setup lang="ts">
import { ref } from 'vue'
import UserData from '@/components/UserData.vue'

// Let's pretend this comes from auth
const userId = ref(1)
</script>

<template>
  <Suspense>
    <main class="container p-4 mx-auto">
      <UserData :user-id="userId" />
    </main>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
