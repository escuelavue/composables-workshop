<script lang="ts">
import { defineComponent } from 'vue'

import UserAlbums from '@/components/UserAlbums.vue'
import UserPosts from '@/components/UserPosts.vue'
import FetUserAlbums from '@/mixins/FetchUserAlbums.mixin'
import FetchUserPosts from '@/mixins/FetchUserPosts.mixin'

export default defineComponent({
    name: "UserData",
    components: {
        UserAlbums,
        UserPosts
    },
    mixins: [FetUserAlbums, FetchUserPosts],
})

</script>

<template>
    <h1 class="mb-4 text-4xl font-bold">
        User Data
    </h1>
    <hr class="mb-6">
    <div class="md:gap-4 md:flex">
        <div class="mb-12 lg:mb-0 basis-1/3">
            <UserAlbums :albums="userAlbums" />
        </div>
        <div class="mb-12 lg:mb-0 basis-2/3">
            <UserPosts :posts="userPosts" />
        </div>
    </div>
</template>