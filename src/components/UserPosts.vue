<script lang="ts">
import { defineComponent, type DeepReadonly } from 'vue';

import type { UserPost } from '@/interfaces';

export default defineComponent({
    name: 'UserPosts',
    props: {
        posts: {
            type: Array as () => DeepReadonly<UserPost[]>,
            required: true
        }
    }
})
</script>

<template>
    <h2 class="mb-4 text-2xl font-bold">Posts</h2>

    <div class="flex flex-wrap gap-4">
        <div v-for="post in posts" :key="post.id" class="shadow-xl card basis-64">
            <div class="card-body">
                <h2 class="card-title">{{ post.title }}</h2>
                <p>{{ post.body }}</p>
                <div class="justify-end card-actions">
                    <button class="btn btn-primary">Read</button>
                </div>
            </div>
        </div>
    </div>
</template>