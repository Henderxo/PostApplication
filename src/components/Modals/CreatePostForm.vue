<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref, computed } from 'vue';
import { useAuthorStore } from '@/stores/AuthorsStore';
import { usePostStore } from '@/stores/PostsStore';
import type { RefSymbol } from '@vue/reactivity';
const props = defineProps({
    header: {type: String},
    searchQuery: {type: String},
})
const Authors = useAuthorStore()
Authors.GetAllAuthors()
const modalStore = useModalStore()
const PostsStore = usePostStore()
const title = ref('')
const body = ref('')
const author = ref('')
function handleSubmit(): void{
    PostsStore.createPost(title.value, body.value, author.value, props.searchQuery)
    modalStore.close()
}

</script>

<template>
    <div class="modal-content">
        <h1>{{ header }}</h1>
        <Form @submit="handleSubmit">
            <p><Field class="search" name="title" :rules="'title'" v-model="title" placeholder="Title"> </Field><br>
            <ErrorMessage name="title"></ErrorMessage>
            </p>
            <p><Field class="select" as="select" name="author" :rules="'required'" v-model="author">
                    <option class="select_option" value="" disabled>Select an author</option>
                    <option class="select_option" v-if="Authors.authorList.length > 0" 
                            v-for="Authorinfo in Authors.authorList" 
                            :key="Authorinfo.id" 
                            :value="Authorinfo.id?.toString()">
                        {{ Authorinfo.name }} {{ Authorinfo.surname }}
                    </option>
                </Field><br>
                <ErrorMessage name="author"></ErrorMessage>
            </p>
            <p><Field class="textArea"  name="postBody" as="textarea" :rules="'content'" maxlength="400" v-model="body" placeholder="Body" ></Field><br>
            <ErrorMessage name="postBody"></ErrorMessage><p style="text-align: right;">{{ 400 - body.length }}</p></p>
            <p><button type="submit" class="button">Submit</button><button style="align-self: right;" @click="modalStore.close" class="button">Close</button></p>
        </Form>
    </div>
</template>

<style scoped>
.select_option{
background-color: #eec281;
}
</style>