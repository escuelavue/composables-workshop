<script setup lang="ts">
import UserAlbums from '@/components/UserAlbums.vue'
import UserPosts from '@/components/UserPosts.vue'

import { useUserData } from '@/composables/UseUserData'

const { fetchPosts, fetchAlbums } = useUserData()

await fetchPosts()
await fetchAlbums()
</script>

<template>
    <h1 class="mb-4 text-4xl font-bold">
        User Data
    </h1>
    <hr class="mb-6">
    <div class="md:gap-4 md:flex">
        <div class="mb-12 lg:mb-0 basis-1/3">
            <UserAlbums />
        </div>
        <div class="mb-12 lg:mb-0 basis-2/3">
            <UserPosts />
        </div>
    </div>
</template>