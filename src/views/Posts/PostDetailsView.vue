<script setup lang="ts">
import Post from '@/components/Posts/Post.vue';
import type { Post as postDetails } from '@/types/Post';
import { useRoute } from 'vue-router';
import EditPostForm from '@/components/Modals/EditPostForm.vue';
import { useModalStore } from '@/stores/ModalStore';
import { usePostStore } from '@/stores/PostsStore';
import DeletePostForm from '@/components/Modals/DeletePostForm.vue';
const postStore = usePostStore()
const route = useRoute()
const modal = useModalStore()
postStore.GetOnePost(+route.params.id)
function openEditPostForm(editPost: postDetails): void{
    delete editPost.author
    modal.open({
        component: EditPostForm,
        componenetProps: {
            header: 'Edit Post',
            post: editPost,
            editType: 'details'
        }
    })
}
function openDeletePostForm(deletePost: postDetails): void{
    delete deletePost.author
    modal.open({
        component: DeletePostForm,
        componenetProps: {
            header: 'Delete Post',
            post: deletePost,
            editType: 'details'
        }
    })
}
</script>

<template>
    <div style="padding: 20px;">
        <div class="blockContent">
            <div v-if="!postStore.isLoading">
                <h1 v-if="postStore.postList.length === 0">Such a post does not exist</h1>
                <Post @delete-post="openDeletePostForm(Object.assign({}, postStore.postList))" @edit-post="openEditPostForm(Object.assign({}, postStore.postList))" v-else :Post="postStore.postList" :PostType="'details'"></Post>
            </div>
            <div v-else>    
                <h1>Post is loading</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>