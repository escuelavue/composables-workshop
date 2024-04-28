<script setup lang="ts">
import { useState } from '@/composables/UseState';
import UserTodos from '@/components/UserTodos.vue';

const { user, fetchUserProfile } = useState()

await fetchUserProfile()
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
    <UserTodos />
</template>