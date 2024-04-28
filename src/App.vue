<script setup lang="ts">
import { ref } from 'vue'
import UserData from '@/components/UserData.vue'
import { useState } from '@/composables/UseState';

// Let's pretend this comes from auth
const userId = ref(1)

const { setUserId } = useState()

setUserId(userId.value)
</script>

<template>
  <Suspense>
    <main class="container p-4 mx-auto">
      <UserData />
    </main>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
