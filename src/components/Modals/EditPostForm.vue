<script setup lang="ts">
import { usePostStore } from '@/stores/PostsStore';
import { useModalStore } from '@/stores/ModalStore';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref, computed, toRef } from 'vue';
import type { PropType } from 'vue';
import type { Post } from '@/types/Post';
const props = defineProps({
    header: {type: String},
    post: {type: Object as PropType<Post>, required: true},
    searchQuery: {type: String, required: false},
    editType: {type: String, default: 'list'}
})

const modalStore = useModalStore()
const postStore = usePostStore()
const postCopy = Object.assign({}, props.post)
const title = ref(postCopy.title)
const body = ref(postCopy.body)
const disbleButton = computed ( () => {
 return title.value == props.post.title && body.value == props.post.body
})

function handleSubmit(): void{
    postStore.updatePost(title.value as String, body.value as String, postCopy,  props.editType,  props.searchQuery)
    modalStore.close()
}
</script>

<template>
    <div class="modal-content" >
        <h1>{{ header }}</h1>
        <Form @submit="handleSubmit">
            <p><b>Title:</b><br><Field class="search" name="title" :rules="'title'" v-model="title" placeholder="Title"> </Field><br>
            <ErrorMessage name="title"></ErrorMessage>
            </p>
            <p><b>Body:</b><br><Field class="textArea"  name="postBody" as="textarea" :rules="'content'" maxlength="400" v-model="body" placeholder="Body"></Field><br>
                <ErrorMessage name="postBody"></ErrorMessage><p style="text-align: right;">{{ 400 - body?.length }}</p></p>
            <p><button :disabled="disbleButton" type="submit" class="button">Submit</button><button style="align-self: right;" @click="modalStore.close" class="button">Close</button></p>
        </Form>
    </div>
</template>

<style scoped>

</style>