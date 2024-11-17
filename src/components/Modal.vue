<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore';
const modal = useModalStore()
</script>

<template>
    <div v-if="modal.state.component" id="modal-layout">
        <Component class="modal-container" :is="modal.state.component" v-bind="modal.state.componenetProps"/>
    </div>
</template>

<style scoped>
#modal-layout {
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba(22,22,22,0.5);
}
</style>