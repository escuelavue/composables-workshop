import { defineComponent } from 'vue';
import type { UserPost } from '@/interfaces'

export default defineComponent({
    props: {
        userId: {
            type: Number,
            required: true

        }
    },
    data: (): { posts: UserPost[] } => ({
        posts: []
    }),
    computed: {
        userPosts(): UserPost[] {
            return this.posts.filter(post => post.userId === this.userId)
        }
    },
    methods: {
        async fetchPosts() {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`)
                const data: UserPost[] = await response.json()
                this.posts = data
            } catch (error) { console.error(error) }
        }
    },
    created() {
        if (this.userId) {
            this.fetchPosts()
        }
    }
})