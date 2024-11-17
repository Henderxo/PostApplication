<script setup lang="ts">
import { usePostStore } from '../../stores/PostsStore'
import Post from '../Posts/Post.vue'
import { useRouter } from 'vue-router';
import Pagination from '../Pagination.vue';
import { ref } from 'vue'
import { useAuthSotore } from '@/stores/AuthenticationStore';
import Search from '../Search.vue';
import CreatePostForm from '../Modals/CreatePostForm.vue';
import { useModalStore } from '@/stores/ModalStore';
import EditPostForm from '../Modals/EditPostForm.vue';
import type { Post as postType } from '@/types/Post';
import DeletePostForm from '../Modals/DeletePostForm.vue';
const Posts = usePostStore()
const searchQuery = ref('')
const Auth = useAuthSotore()
Posts.GetPosts(1)

const modal = useModalStore()
function openCreatePostForm(): void{
    modal.open({
        component: CreatePostForm,
        componenetProps: {
            header: 'Create Post',
            searchQuery: searchQuery.value
        }
    })
}
function openEditPostForm(editPost: postType): void{
    delete editPost.author
    modal.open({
        component: EditPostForm,
        componenetProps: {
            header: 'Edit Post',
            post: editPost,
            searchQuery: searchQuery.value
        }
    })
}
function openDeletePostForm(deletePost: postType): void{
    delete deletePost.author
    modal.open({
        component: DeletePostForm,
        componenetProps: {
            header: 'Delete Post',
            post: deletePost,
            searchQuery: searchQuery.value
        }
    })
}
const router = useRouter()
</script>

<template>
    <div class="blockContent">
        <div class="searchBar">
            <Search  @handle-search-input="(page, search) => {searchQuery = search
                Posts.GetPosts(page, searchQuery)}"></Search>
                 <button style="float: right;" v-if="Auth.isUserLoggedIn()" @click="openCreatePostForm" class="button">Create post</button>
        </div> 
        <div v-if="!Posts.isLoading">
            <h1>Posts:</h1>
            <div v-if="Posts.postList.length > 0" v-for="Postinfo in Posts.postList" :key="+Postinfo.id">
                <Post @delete-post="openDeletePostForm(Object.assign({}, Postinfo))" @edit-post="openEditPostForm(Object.assign({}, Postinfo))" @click="router.push({name: 'postDetails', params: {id: +Postinfo.id}})" :Post="Postinfo"></Post>
            </div>
            <div v-else>
                <h1>No posts have been found</h1>
            </div>
        </div>
        <h1 v-if="Posts.isLoading">The data is loading</h1>
    </div>
    <Pagination v-if="!Posts.isLoading"  @load-new-page="(page) => Posts.GetPosts(page, searchQuery)" :currentPage="+Posts.currentPage" :limit="+Posts.limit" :elementCount="+Posts.elementCount" :showingPages="3"></Pagination>
</template>
