<script setup lang="ts">
import {useNotificationStore } from '../../stores/NotificationStore.ts'
import type { Notification } from '@/types/Notification.js';
import type { PropType } from 'vue';
const Notifications = useNotificationStore()
const props = defineProps({
    Notification: {type: Object as PropType<Notification>, required: true},
})
</script>

<template>
    <div @click="Notifications.removeNotificationById(Notification.id)"class="Success" :class="{Error: props.Notification.type === 'error'}">
        <span><b>Notification:</b>  {{ props.Notification.message }}</span>
    </div>
</template>

<style scoped>
.Success{
    
    width: 300px;
    border:solid;
    word-break:normal;
    padding: 10px;
    background: green;
    text-align: center;
    font-size: large;
    float:right;
    border-radius: 25px;
    color:aliceblue;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 5px;
    border-color: black;
    
}
.Error{
    float:right;
    background: red;
    color:aliceblue;
    font-family: Arial, Helvetica, sans-serif;
}

</style>