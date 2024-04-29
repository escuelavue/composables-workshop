import { ref, type UnwrapRef } from 'vue'

export const errors = ref<string[]>([])

export const resetErrors = () => errors.value = []

interface Options {
    recordError?: boolean
}

export async function useAsync<T>(fn: () => Promise<T>, options: Options = {}) {
    const { recordError = true } = options

    const loading = ref(false)
    const error = ref<Error | null>(null)
    const result = ref<T | null>(null)

    try {
        result.value = await fn() as UnwrapRef<T>;
    } catch (e) {
        if (e instanceof Error) {
            error.value = e
            recordError && errors.value.push(e.message)
        }
    } finally {
        loading.value = false
    }

    return {
        loading,
        error,
        result
    }
}