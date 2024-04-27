import { vi, expect, describe, it, afterAll } from "vitest"
import { useUserData } from '@/composables/UseUserData'

// fetch times, fetch URL and computed value

afterAll(() => {
    vi.clearAllMocks()
})

const fetchPostsURL = 'https://jsonplaceholder.typicode.com/posts/'

const userPost = {
    userId: 1,
    id: 1,
    title: "title 1",
    body: "body 1",
}

const responseMock = [
    userPost,
    {
        userId: 2,
        id: 2,
        title: "title 2",
        body: "body 2"
    },
]

const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation(() => {
    return Promise.resolve({
        json: () => Promise.resolve(responseMock)
    } as Response)
})

describe("UseUserData", () => {
    it("should call fetchPosts once", async () => {
        const userData = useUserData()

        // Mock the implementation of fetchPosts
        const fetchPostsMocked = vi.fn().mockImplementation(userData.fetchPosts)

        await fetchPostsMocked()

        expect(fetchPostsMocked).toHaveBeenCalledTimes(1)

        // Spying

        // const userDataSpy = vi.spyOn(userData, 'fetchPosts')

        // await userData.fetchPosts()

        // expect(userDataSpy).toHaveBeenCalledTimes(1)

    })
    it("should call global fetch with the correct URL", async () => {
        const { fetchPosts } = useUserData()

        await fetchPosts()

        expect(fetchSpy).toHaveBeenCalledWith(fetchPostsURL)
    })
    it("should return (computed) user specific posts or []", async () => {
        const { fetchPosts, setUserId, posts } = useUserData()

        expect(posts.value).toEqual([])

        setUserId(3) // we don't have mocked data for userId 3

        expect(posts.value).toEqual([])

        setUserId(1)

        await fetchPosts()

        expect(posts.value).toEqual([userPost])
    })
})