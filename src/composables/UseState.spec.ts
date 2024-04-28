import { vi, describe, expect, it, afterAll } from "vitest"
import { useState } from "@/composables/UseState"

/* test: 
    state is hydrated, 
    only user todos are returned,
    todos are completed,
    name is mutated, 
    API is called with correct params and such,
    console error when failing async ops.
*/

const userId = 1
const URL = `https://jsonplaceholder.typicode.com/users/${userId}`
const spyFetch = vi.spyOn(global, 'fetch')

afterAll(() => {
    spyFetch.mockRestore()
})

describe('useState', () => {
    it('should call fetchUserProfile with correct URL', async () => {
        const { fetchUserProfile, setUserId } = useState()

        setUserId(userId)

        await fetchUserProfile()

        expect(spyFetch).toHaveBeenCalledWith(URL)
    })
    it('should hydrate state with user data', async () => {
        const userData = { name: 'John Doe', username: 'johndoe', email: 'john@doe.com' }

        // spyFetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(userData) } as Response))
        spyFetch.mockResolvedValueOnce({ json: () => Promise.resolve(userData) } as Response)

        const { fetchUserProfile, setUserId, user } = useState()

        setUserId(userId)

        await fetchUserProfile()

        expect(user.value).toEqual(userData)
    })
    it('should complete todos', async () => {
        const userTodos = [{
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: true
        }, {
            userId: 1,
            id: 2,
            title: "delectus aut autem two",
            completed: false
        },]

        spyFetch.mockResolvedValueOnce({ json: () => Promise.resolve(userTodos) } as Response)

        const { fetchTodos, todos, toggleTodoStatus, setUserId } = useState()

        setUserId(userId)

        await fetchTodos()

        toggleTodoStatus(2)

        expect(todos.value[1].completed).toBe(true)

        toggleTodoStatus(1)

        expect(todos.value[0].completed).toBe(false)
    })
    it('should return only user todos', async () => {
        const userTodos = [{
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: true
        }, {
            userId: 2,
            id: 2,
            title: "delectus aut autem two",
            completed: false
        },]

        spyFetch.mockResolvedValueOnce({ json: () => Promise.resolve(userTodos) } as Response)

        const { fetchTodos, todos, setUserId } = useState()

        setUserId(userId)

        await fetchTodos()

        expect(todos.value.length).toBe(1)
        expect(todos.value).toEqual([{
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: true
        }])
    })
    it('should mutate user name', async () => {
        const userData = { name: 'John Doe' }

        spyFetch.mockResolvedValueOnce({ json: () => Promise.resolve(userData) } as Response)

        const { user, fetchUserProfile, setUserId, userName } = useState()

        setUserId(userId)

        await fetchUserProfile()

        expect(userName.value).toBe('John Doe')

        user.value.name = "Juan"

        expect(userName.value).toBe('Juan')
    })
    it('should console.log error when fetch fails', async () => {
        const error = new Error('Failed to fetch')

        spyFetch.mockRejectedValueOnce(error)

        const consoleSpy = vi.spyOn(console, 'error')

        const { fetchUserProfile } = useState()

        await fetchUserProfile()

        expect(consoleSpy).toHaveBeenCalledWith(error)

        consoleSpy.mockRestore()
    })
})