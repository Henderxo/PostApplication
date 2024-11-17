<script setup lang="ts">
import { useAuthorStore } from '@/stores/AuthorsStore';
import { useModalStore } from '@/stores/ModalStore';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref, computed } from 'vue';
const props = defineProps({
    header: {type: String},
    name: {type: String},
    surname: {type: String},
    searchQuery: {type: String},
    id: {type: String}
})
const modalStore = useModalStore()
const authors = useAuthorStore()
const name = ref(props.name)
const surname = ref(props.surname)

const disbleButton = computed ( () => {
 return name.value == props.name && surname.value == props.surname
})

function handleSubmit(): void{
    authors.updateAuthor(name.value as String, surname.value as String, +(props.id as String), props.searchQuery) 
    modalStore.close()
}
</script>

<template>
    <div class="modal-content" >
        <h1>{{ header }}</h1>
        <Form @submit="handleSubmit">
            <p><b>Name:</b><br><Field class="search" name="name" :rules="'required|name'" v-model="name" > </Field><br>
            <ErrorMessage name="name"></ErrorMessage></p>
            
            <p><b>Surname:</b><br><Field class="search"  name="surname"  :rules="'required|surname'" v-model="surname"></Field><br>
            <ErrorMessage name="surname"></ErrorMessage></p>
            <p><button :disabled="disbleButton" type="submit" class="button">Submit</button><button style="align-self: right;" @click="modalStore.close" class="button">Close</button></p>
        </Form>
    </div>
</template>

<style scoped>

</style>