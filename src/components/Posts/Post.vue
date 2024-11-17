<script setup lang="ts">
import type { PropType } from 'vue'
import type { Post } from '@/types/Post';
import { useAuthSotore } from '@/stores/AuthenticationStore';
const props = defineProps({
    Post: {type: Object as PropType<Post>},
    PostType: {type: String}
})
const emit = defineEmits(['edit-post', 'delete-post'])
function whenClicked(event: Event, emitName: String): void{
    event.stopPropagation()
    emit(emitName as 'edit-post' | 'delete-post')
}
</script>

<template>
<div class="postDisplay" :class="{blockk: PostType === 'details'}">
    <div>
        <p class="text">
            <b style="font-size:large;">{{ Post.title }}<br></b>
            <p v-if="PostType === 'details'">{{ Post.body }}</p>
            <button @click="(event) => whenClicked(event,'delete-post')" class="button" v-if="useAuthSotore().currentUser?.id === Post?.userId" style="float: right; padding-right: 10px;">Delete</button> 
            <button @click="(event) => whenClicked(event,'edit-post')" class="button" v-if="useAuthSotore().currentUser?.id === Post?.userId" style="float: right; padding-right: 10px;">Edit</button> 
            <b>Author: </b> {{ Post.author.name }} {{ Post.author.surname }}<br>
            <b>Date:</b> {{ Post.created_at >= Post.updated_at ? Post.created_at.slice(0, 10) : Post.updated_at.slice(0, 10) }}
        </p>
    </div>
</div>
</template>

<style scoped>
.postDisplay{
    background: white;
    height: auto;
    border-radius: 10px;
}
.blockk{
    background: blanchedalmond;
}
.text{
    padding-left: 10px;
}
</style>