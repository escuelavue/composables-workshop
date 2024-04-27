<script setup lang="ts">
import { useUserData } from '@/composables/UseUserData'

const { posts } = useUserData()
</script>

<template>
    <h2 class="mb-4 text-2xl font-bold">Posts</h2>

    <div class="flex flex-wrap gap-4">
        <div v-for="post in posts" :key="post.id" class="shadow-xl card basis-64 grow">
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