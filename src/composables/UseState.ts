// state: userId, profile and todos
// transformations: userTodos, userName
// actions: fetchTodos, fetchProfile

import { computed, ref } from 'vue'

import type { UserTodo, UserProfile, FlatObject } from '@/interfaces'
import { flatObject } from '@/utils/flatObject.util'

import { useAsync } from '@/composables/UseAsync'

const userId = ref<number | null>(null)
const user = ref<FlatObject>({})
const todos = ref<UserTodo[]>([])

export function useState() {
    const userTodos = computed<UserTodo[]>(() => todos.value.filter(todo => todo.userId === userId.value))

    const completedTodos = computed<number>(() => userTodos.value.filter(todo => todo.completed).length)

    function setUserId(id: number) {
        userId.value = id
    }

    async function fetchUserProfile() {
        const { result } = await useAsync<UserProfile>(async () => (await (fetch(`https://jsonplaceholder.typicode.com/users/${userId.value}`))).json())
        if (result.value) user.value = flatObject(result.value)
    }

    async function fetchTodos() {
        const { result } = await useAsync<UserTodo[]>(async () => (await (fetch('https://jsonplaceholder.typicode.com/todos/'))).json())
        if (result.value) todos.value = result.value
    }

    function toggleTodoStatus(todoId: number) {
        const todo = todos.value.find(todo => todo.id === todoId)
        if (todo) {
            todo.completed = !todo.completed
        }
    }

    return {
        setUserId,
        fetchUserProfile,
        fetchTodos,
        toggleTodoStatus,
        todos: userTodos,
        completedTodos,
        user,
        userName: computed(() => user.value.name),
    }
}