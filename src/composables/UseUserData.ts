import { ref, computed, readonly } from 'vue'
import type { UserAlbum, UserPost } from '@/interfaces'

const posts = ref<UserPost[]>([])
const albums = ref<UserAlbum[]>([])
const userId = ref<number | null>(null)

export function useUserData() {
    const userAlbums = computed<UserAlbum[]>(() => albums.value.filter(album => album.userId === userId.value))

    function setUserId(id: number) {
        userId.value = id
    }

    async function fetchPosts() {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`)
            const data: UserPost[] = await response.json()
            posts.value = data
        } catch (error) { console.error(error) }
    }

    async function fetchAlbums() {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums/`)
            const data: UserAlbum[] = await response.json()
            albums.value = data
        } catch (error) { console.error(error) }
    }

    return {
        posts: readonly(computed<UserPost[]>(() => posts.value.filter(post => post.userId === userId.value))),
        albums: readonly(userAlbums),
        setUserId,
        fetchPosts,
        fetchAlbums
    }
}