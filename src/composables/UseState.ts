// state: userId, profile and todos
// transformations: userTodos, userName
// actions: fetchTodos, fetchProfile

import { computed, ref } from 'vue'

import type { UserTodo, UserProfile, FlatObject } from '@/interfaces'
import { flatObject } from '@/utils/flatObject.util'

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
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId.value}`)
            const data: UserProfile = await response.json()
            user.value = flatObject(data)
        } catch (error) { console.error(error) }
    }

    async function fetchTodos() {
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

    return {
        setUserId,
        fetchUserProfile,
        fetchTodos,
        toggleTodoStatus,
        todos: userTodos,
        completedTodos,
        user,
        userName: computed(() => user.value.name)
    }
}