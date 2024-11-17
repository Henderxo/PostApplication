<script setup lang="ts">
import type { Author } from '@/types/Author';
import type { PropType } from 'vue';
import { useAuthSotore } from '@/stores/AuthenticationStore';
const props = defineProps({
    Author: {type: Object as PropType<Author>, required: true}
})
const emit = defineEmits(['edit-author', 'delete-author'])
</script>

<template>
<div class="authorDisplay">
    <div>
        <p class="text">
            <b>Name:</b> {{ Author.name }} <br>
            <b>Surname:<button @click="emit('delete-author')" v-if="useAuthSotore().currentUser?.id === Author.userId" class="button" style="float: right; padding-right: 10px;">Delete</button>
                <button @click="emit('edit-author')" class="button" v-if="useAuthSotore().currentUser?.id === Author.userId" style="float: right; padding-right: 10px;">Edit</button> 
            </b> {{ Author.surname }} <br>
            <b>Date:</b> {{ Author.created_at >= Author.updated_at ? (Author.created_at as String).slice(0, 10) : (Author.updated_at as String).slice(0, 10) }}
        </p>
    </div>
</div>
</template>

<style scoped>  
.authorDisplay{
    background: white;
    height: auto;
    border-radius: 10px;
}
.text{
    padding-left: 10px;
}
</style>