<script setup lang="ts">
import UserProfile from '@/components/UserProfile.vue';
import { useState } from '@/composables/UseState';
import { errors, resetErrors } from '@/composables/UseAsync';
import { ref, watch } from 'vue';

const { completedTodos, userName } = useState()

const showModal = ref(false)

const handleClose = () => {
    showModal.value = false
    resetErrors()
}

watch(errors, (newErrors) => {
    if (newErrors.length)
        showModal.value = true
}, { deep: true })
</script>

<template>
    <h1 class="mb-4 text-4xl font-bold">
        User Data
    </h1>

    <dialog id="my_modal_1" class="modal" :class="{ 'modal-open': showModal }">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Errors:</h3>
            <pre class="py-4" v-for="(error, index) in errors" :key="index">{{ error }}</pre>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn" @click="handleClose">Close</button>
                </form>
            </div>
        </div>
    </dialog>

    <p class="mb-4 text-2xl">
        {{ completedTodos }} completed todos for {{ userName }}
    </p>
    <hr class="mb-6">
    <UserProfile />
</template>