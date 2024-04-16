<script setup lang="ts">
import { ref } from 'vue';
import UserProfile from '@/components/UserProfile.vue';

defineProps<{
    userId: number
}>()

const name = ref('');
const todos = ref(0);

function updateName(newName: string) {
    name.value = newName
}

function updateCompletedTodos(completedTodos: number) {
    todos.value = completedTodos
}
</script>

<template>
    <h1 class="mb-4 text-4xl font-bold">
        User Data
    </h1>
    <p class="mb-4 text-2xl">
        {{ todos }} completed todos for {{ name }}
    </p>
    <hr class="mb-6">
    <UserProfile :user-id="userId" @update:user:name="updateName" @update:todos:completed="updateCompletedTodos" />
</template>