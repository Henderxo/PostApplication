<script setup lang="ts">
import {useNotificationStore } from '../../stores/NotificationStore'
import Notification from '../Notifications/Notification.vue'
const Notifications = useNotificationStore()

</script>

<template>
    <div class="block">
        <div class="notify" v-for="Notification in Notifications.shorteneNotificationList" :key="+Notification.id" v-if="!Notifications.isEmpty" >
            <Notification :Notification="Notification"></Notification>
        </div>
    </div>
    
</template>

<style scoped>
.block{
    left: 80%;
    padding: 25px;
    height: auto;
    position: absolute;
    z-index: 10; 
}
.notify{
    padding: 10px;
}
</style>