<script setup lang="ts">
import {ref, watch} from 'vue'
import debounce from 'lodash.debounce'
const emit = defineEmits(['handle-search-input'])
const input = ref('')
function submitInput(): void{
    emit('handle-search-input', 1, input.value)
}
watch(input, debounce(()=>{
    submitInput()
}, 2000))
</script>

<template>
    <div type="input" class="textField flex items-center rounded-sm p-3">
        <img class="icon ml-1 mr-2" v-if="leftIcon" :src="leftIcon">
        <input/>
    </div>
</template>

<style scoped>

</style>