import { defineStore } from "pinia";
import type { ModalState } from "@/types/ModalState";
import { shallowRef } from 'vue'

export const useModalStore = defineStore('modal', ()=> {
    const initialModalState = {
        component: null,
        componentProps: {}
    }
    const state = shallowRef<ModalState>(initialModalState)
    function open(newState: ModalState): void{
        state.value = newState
    }
    function close(): void{
        state.value = initialModalState
    }

    return {state, open, close}
})