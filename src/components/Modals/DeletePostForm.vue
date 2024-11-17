<script setup lang="ts">
import { usePostStore } from '@/stores/PostsStore';
import { useModalStore } from '@/stores/ModalStore';
import type { Post } from '@/types/Post';
import { ref, type PropType } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
    header: {type: String},
    post: {type: Object as PropType<Post>, required: true},
    searchQuery: {type: String},
    postType: {type: String}
})
const modalStore = useModalStore()
const posts = usePostStore()
const buttonDisabled = ref(true)
const router = useRouter()
setTimeout(() => {
    buttonDisabled.value = false
}, 5000);

async function handleDelete(): Promise<void>{
    const res = await posts.deletePost(props.post, props.searchQuery)
    if(res && props.postType !== 'list'){
        router.replace({name: 'posts'})
    }
    modalStore.close()
}
</script>

<template>
    <div class="modal-content">
        <p><b style="font-size: xx-large;">{{ header }}</b>
        <button class="button" @click="modalStore.close" style="float:right;">X</button><br>
        <b style="color: red;">The post you are currently looking at will be deleted!!</b></p>
        <p><b>Title: {{ post.title }}</b><br>
        <b>Body: {{ post.body }}</b><br>
        <b>Created at: {{ post.created_at.slice(0, 10) }}</b>
        </p>
        <button class="button" :disabled="buttonDisabled" @click="handleDelete">Delete</button>
    </div>
</template>

<style scoped>

</style>