import { defineComponent } from 'vue';
import type { UserAlbum } from '@/interfaces'

export default defineComponent({
    props: {
        userId: {
            type: Number,
            required: true

        }
    },
    data: (): { albums: UserAlbum[] } => ({
        albums: []
    }),
    computed: {
        userAlbums(): UserAlbum[] {
            return this.albums.filter(album => album.userId === this.userId)
        }
    },
    methods: {
        async fetchAlbums() {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/albums/`)
                const data: UserAlbum[] = await response.json()
                this.albums = data
            } catch (error) { console.error(error) }
        }
    },
    created() {
        if (this.userId) {
            this.fetchAlbums()
        }
    }
})