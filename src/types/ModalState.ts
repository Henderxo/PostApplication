
import type { Component } from "vue"
export interface ModalState{
    component: Component | null,
    componenetProps?: Record<string, any>
}