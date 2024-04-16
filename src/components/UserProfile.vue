<script setup lang="ts">
import { ref, watch } from "vue"
import UserTodos from '@/components/UserTodos.vue';
import { flatObject } from '@/utils/flatObject.util'
import type { UserProfile, FlatObject } from '@/interfaces'

const props = defineProps<{
    userId: number
}>()

const emit = defineEmits(['update:user:name', 'update:todos:completed'])

const user = ref<FlatObject>({})

async function fetchUserPosts() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${props.userId}`)
        const data: UserProfile = await response.json()
        user.value = flatObject(data)
    } catch (error) { console.error(error) }
}

function updateCompletedTodos(completedTodos: number) {
    emit('update:todos:completed', completedTodos)
}

await fetchUserPosts()

watch(() => user.value.name, async (name) => {
    emit('update:user:name', name)
}, { immediate: true })
</script>

<template>
    <h2 class="mb-4 text-3xl font-bold">
        User Profile
    </h2>
    <div class="flex flex-col mb-12 space-y-4">
        <template v-for="(value, key, index) in user" :key="index">
            <label class="flex items-center gap-2 input input-bordered">
                <span class="font-bold"> {{ key }}:</span>
                <input type="text" class="grow" :placeholder="value" :value="value"
                    @input="event => user[key] = (event.target as HTMLInputElement).value" />
            </label>
        </template>
    </div>
    <UserTodos :user-id="userId" @update:todos:completed="updateCompletedTodos" />
</template>