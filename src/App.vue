<script lang="ts">
import { defineComponent } from 'vue'

import UserData from '@/components/UserData.vue'

export default defineComponent({
  name: "App",
  components: {
    UserData
  },
  data: () => ({
    // Let's pretend this comes from auth
    userId: 1
  })
})

</script>

<template>
  <main class="container py-4 mx-auto">
    <UserData :userId="userId" />
  </main>
</template>
