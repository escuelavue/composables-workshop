<script lang="ts">
import { defineComponent, type DeepReadonly } from 'vue';

import type { UserAlbum } from '@/interfaces';

export default defineComponent({
    name: 'UserAlbums',
    props: {
        albums: {
            type: Array as () => DeepReadonly<UserAlbum[]>,
            required: true
        }
    }
})
</script>

<template>
    <h2 class="mb-4 text-2xl font-bold">Albums</h2>

    <div class="flex flex-wrap gap-4">
        <div v-for="album in albums" :key="album.id" class="card basis-48 bg-primary text-primary-content grow">
            <div class="card-body">
                <h2 class="card-title">{{ album.title }}</h2>
                <div class="justify-end card-actions">
                    <button class="btn">Watch</button>
                </div>
            </div>
        </div>
    </div>
</template>