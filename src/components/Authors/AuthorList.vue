<script setup lang="ts">
import { useAuthorStore } from '../../stores/AuthorsStore'
import Author from '../Authors/Author.vue'
import { useAuthSotore } from '@/stores/AuthenticationStore';
import Pagination from '../Pagination.vue';
import { ref } from 'vue'
import Search from '../Search.vue';
import { useModalStore } from '@/stores/ModalStore';
import CreateAuthorForm from '../Modals/CreateAuthorForm.vue';
import type { Author as authorType } from '@/types/Author';
import EditAuthorForm from '../Modals/EditAuthorForm.vue';
import DeleteAuthorForm from '../Modals/DeleteAuthorForm.vue';
const Authors = useAuthorStore()
const Modals = useModalStore()
const Auth = useAuthSotore()
const searchQuery = ref('')
Authors.GetAuthors(1)
function openCreateAuthorForm(): void{
    Modals.open({
        component: CreateAuthorForm,
        componenetProps: {
             header: 'Create Author',
             searchQuery: searchQuery.value
        }
    })
}
function openEditAuthorForm(editAuthor: authorType): void{
    Modals.open({
        component: EditAuthorForm,
        componenetProps: {
            header: 'Edit Author',
            name: editAuthor.name,
            surname: editAuthor.surname,
            searchQuery: searchQuery.value,
            id: editAuthor.id?.toString()
        }
    })
}
function openDeleteForm(deleteAuthor: authorType): void{
    Modals.open({
        component: DeleteAuthorForm,
        componenetProps: {
            header: 'Delete Author:',
            name: deleteAuthor.name,
            surname: deleteAuthor.surname,
            createdAt: deleteAuthor.created_at.slice(0, 10),
            searchQuery: searchQuery.value,
            id: deleteAuthor.id?.toString()
        }
    })
}
</script>

<template>
    <div class="blockContent">
        <div class="searchBar">
            <Search @handle-search-input="(page, search) => { searchQuery = search
                Authors.GetAuthors(page, search)}"></Search>
                <button style="float: right;" v-if="Auth.isUserLoggedIn()" @click="openCreateAuthorForm" class="button">Create author</button>
        </div> 
        <div v-if="!Authors.isLoading">
            <h1>Authors:</h1>
            <div v-if="Authors.authorList.length > 0" v-for="Authorinfo in Authors.authorList" :key="+Authorinfo.id">
                <Author @delete-author="openDeleteForm(Authorinfo)" @edit-author="openEditAuthorForm(Authorinfo)" :Author="Authorinfo"></Author>
            </div>
            <div v-else>
                    <h1>No authors have been found</h1>
            </div>
        </div>
        <h1 v-else>The data is loading</h1>
    </div>
    <Pagination v-if="!Authors.isLoading"  @load-new-page="(page)=>Authors.GetAuthors(page, searchQuery)" :currentPage="+Authors.currentPage" :limit="+Authors.limit" :elementCount="+Authors.elementCount" :showingPages="3"></Pagination>
</template>

<style scoped>

</style>