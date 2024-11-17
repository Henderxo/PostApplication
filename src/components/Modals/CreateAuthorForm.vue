<script setup lang="ts">
import { useAuthorStore } from '@/stores/AuthorsStore';
import { useModalStore } from '@/stores/ModalStore';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref } from 'vue';
const props = defineProps({
    header: {type: String},
    searchQuery: {type: String}
})
const modalStore = useModalStore()
const authors = useAuthorStore()
const name = ref('')
const surname = ref('')

function handleSubmit(){
    authors.createAuthor(name.value, surname.value, props.searchQuery)
    modalStore.close()
}
</script>

<template>
    <div class="modal-content">
        <h1>{{ header }}</h1>
        <Form @submit="handleSubmit">
            <p><Field class="search" name="name" :rules="'required|name'" v-model="name" placeholder="Name"> </Field><br>
            <ErrorMessage name="name"></ErrorMessage></p>
            
            <p><Field class="search"  name="surname"  :rules="'required|surname'" v-model="surname" placeholder="Surname"></Field><br>
            <ErrorMessage name="surname"></ErrorMessage></p>
            <p><button type="submit" class="button">Submit</button><button style="align-self: right;" @click="modalStore.close" class="button">Close</button></p>
        </Form>
    </div>
</template>

<style scoped>

</style>