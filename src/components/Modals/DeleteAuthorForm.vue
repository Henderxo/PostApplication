<script setup lang="ts">
import { useAuthorStore } from '@/stores/AuthorsStore';
import { useModalStore } from '@/stores/ModalStore';
import { ref } from 'vue';
const props = defineProps({
    header: {type: String},
    name: {type: String},
    surname: {type: String},
    createdAt: {type: String},
    searchQuery: {type: String},
    id: {type: String}
})
const modalStore = useModalStore()
const authors = useAuthorStore()
const buttonDisabled = ref(true)
setTimeout(() => {
    buttonDisabled.value = false
}, 5000);

function handleDelete(): void{
    authors.deleteAuthor(+(props.id as String), props.searchQuery)
    modalStore.close()
}
</script>

<template>
    <div class="modal-content">
        <p><b style="font-size: xx-large;">{{ header }}</b>
        <button class="button" @click="modalStore.close" style="float:right;">X</button><br>
        <b style="color: red;">All authors posts will be deleted aswell!!</b></p>
        <p><b>Name: {{ name }}</b><br>
        <b>Surname: {{ surname }}</b><br>
        <b>Created at: {{ createdAt }}</b>
        </p>
        <button class="button" :disabled="buttonDisabled" @click="handleDelete">Delete</button>
    </div>
</template>

<style scoped>

</style>