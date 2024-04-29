import { describe, expect, it } from "vitest"
import { errors, resetErrors, useAsync } from '@/composables/UseAsync'

describe('useAsync', () => {
    it('should return loading, error and result', async () => {
        const { loading, error, result } = await useAsync(() => Promise.resolve('Hello World'))

        expect(loading.value).toBe(false)
        expect(error.value).toBe(null)
        expect(result.value).toBe('Hello World')
    })
    it('should return error when async function fails', async () => {
        const { loading, error, result } = await useAsync(() => Promise.reject(new Error('Failed')))

        expect(loading.value).toBe(false)
        expect(error.value).toBeInstanceOf(Error)
        expect(error.value!.message).toBe('Failed')
        expect(result.value).toBe(null)
        expect(errors.value).toEqual(['Failed'])

        resetErrors()

        expect(errors.value).toEqual([])
    })
    it('should return error when async function fails', async () => {
        const { loading, error, result } = await useAsync(() => Promise.reject(new Error('Failed')), { recordError: false })

        expect(loading.value).toBe(false)
        expect(error.value).toBeInstanceOf(Error)
        expect(error.value!.message).toBe('Failed')
        expect(result.value).toBe(null)
        expect(errors.value).toEqual([])
    })
})