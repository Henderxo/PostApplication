<script setup lang="ts">
import { ref, toRef } from 'vue';
const emit = defineEmits(['load-new-page'])
const props = defineProps({
    elementCount: {type: Number, required: true},
    showingPages: {type: Number, required: false, default: 3},
    currentPage: {type: Number, required: true},
    limit: {type: Number, required: true},
})
const offset = ref(Math.floor(props.showingPages/2))
const pageCount = toRef( () => Math.ceil(props.elementCount/props.limit))
const currentPageCopy = ref (props.currentPage)
const showSidePages = ref(2)
</script>

<template>
    <div v-if="elementCount > 0" class="paginationBlock">
        <button class="button" style="padding-left: 0px;" v-if="currentPageCopy!=1" @click="emit('load-new-page', 1)">First</button>
        <button class="button" v-if="currentPageCopy!=1" @click="emit('load-new-page', currentPageCopy-1)">Prev</button>
        <!-- Shows first pages when we have a lot of pages --> 
        <a v-if="pageCount > showingPages * 3 && currentPageCopy > showingPages + 1">
                <button class="button"  v-for="n in showSidePages" @click="emit('load-new-page',  n)">
                    {{ n }}</button>...</a>
            <!-- If we Pagecount is smaller then the Pages we can show -->
        <button class="button" :disabled="n == currentPageCopy" :class=" {current: n == currentPageCopy}" 
            v-if="pageCount <=  showingPages" @click="emit('load-new-page',  n)"
            v-for="n in pageCount">
            {{ n }}</button>
        <!-- Shows pages only at the begining of the pagecount -->
        <button class="button" :disabled="n == currentPageCopy" :class=" {current: n == currentPageCopy}" 
            v-if="pageCount >  showingPages && currentPageCopy <= offset" @click="emit('load-new-page',  n)" 
            v-for="n in showingPages">
            {{ n }}</button>
        <!-- Shows if the current page is not getting close to the end of Pagecount (Middle) -->
        <button class="button" :disabled="currentPageCopy - offset + n - 1 == currentPageCopy" :class="{current: currentPageCopy - offset + n - 1 == currentPageCopy}"
                v-if="currentPageCopy > offset && currentPageCopy < pageCount - offset"
                v-for="n in showingPages" @click="emit('load-new-page', currentPageCopy - offset + n - 1)"> 
                {{ currentPageCopy - offset + n - 1 }}</button>
        <!-- Shows pages at the end of the pageCount -->
        <button class="button" :disabled="pageCount - showingPages + n == currentPageCopy" :class="{current: pageCount - showingPages + n == currentPageCopy}"
            v-if="currentPageCopy >= pageCount - offset && pageCount >  showingPages" 
            v-for="n in showingPages" @click="emit('load-new-page', pageCount - showingPages + n)">
                {{ pageCount - showingPages + n }}</button>
        <!-- Shows last pages only if we have a lot of them -->  
        <a v-if="pageCount > showingPages * 3 && currentPageCopy < pageCount-(showingPages)">...
            <button class="button"  v-for="n in showSidePages" 
            @click="emit('load-new-page', pageCount - showSidePages  + n)">
            {{ pageCount - showSidePages + n }}</button></a>
            
        
        <button class="button"  v-if="currentPageCopy!=pageCount" @click="emit('load-new-page', currentPageCopy+1)">Next</button>
        <button class="button" style="padding-right: 0px;" v-if="currentPageCopy!=pageCount" @click="emit('load-new-page', pageCount)">Last</button>
    </div>
</template>

<style scoped>
.paginationBlock{
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    width: auto; margin:
    auto; padding: 10px;
    font-size: large; 
    text-align: center;
}
.current{
    color: #42b983;
}
</style>