<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { UserTodo } from '@/interfaces';

const props = defineProps<{
    userId: number
}>()

const emit = defineEmits(['update:todos:completed'])

const todos = ref<UserTodo[]>([])

const userTodos = computed<UserTodo[]>(() => todos.value.filter(todo => todo.userId === props.userId))

const completedTodos = computed<number>(() => userTodos.value.filter(todo => todo.completed).length)

async function fetchUserTodos() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`)
        const data: UserTodo[] = await response.json()
        todos.value = data
    } catch (error) { console.error(error) }
}

function toggleTodoStatus(todoId: number) {
    const todo = todos.value.find(todo => todo.id === todoId)
    if (todo) {
        todo.completed = !todo.completed
    }
}

await fetchUserTodos()

watch(() => completedTodos.value, (todos) => {
    emit('update:todos:completed', todos)
}, { immediate: true })
</script>

<template>
    <h2 class="mb-4 text-3xl font-bold">
        User Todos
    </h2>
    <ul>
        <li v-for="todo in userTodos" :key="todo.id" class="form-control">
            <label class="justify-start cursor-pointer label">
                <input @click="toggleTodoStatus(todo.id)" type="checkbox" class="checkbox" :checked="todo.completed" />
                <span class="ml-4 label-text">{{ todo.title }}</span>
            </label>
        </li>
    </ul>
</template>