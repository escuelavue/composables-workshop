<script setup lang="ts">
import UserProfile from '@/components/UserProfile.vue';
import { useState } from '@/composables/UseState';

const { completedTodos, userName } = useState()
</script>

<template>
    <h1 class="mb-4 text-4xl font-bold">
        User Data
    </h1>
    <p class="mb-4 text-2xl">
        {{ completedTodos }} completed todos for {{ userName }}
    </p>
    <hr class="mb-6">
    <UserProfile />
</template>