<script setup lang="ts">
import { useState } from '@/composables/UseState';

const { todos, fetchTodos, toggleTodoStatus } = useState()

await fetchTodos()
</script>

<template>
    <h2 class="mb-4 text-3xl font-bold">
        User Todos
    </h2>
    <ul>
        <li v-for="todo in todos" :key="todo.id" class="form-control">
            <label class="justify-start cursor-pointer label">
                <input @click="toggleTodoStatus(todo.id)" type="checkbox" class="checkbox" :checked="todo.completed" />
                <span class="ml-4 label-text">{{ todo.title }}</span>
            </label>
        </li>
    </ul>
</template>