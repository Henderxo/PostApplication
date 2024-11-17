<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Notifications from './components/Notifications/NotificationList.vue'
import Modal from './components/Modal.vue'
</script>

<template>
  <header>
    <NavBar></NavBar>
  </header>
  <Notifications></Notifications>
  <router-view/>
  <Modal></Modal>
</template>

<style scoped>
.NavBar{
  width: 100%;
  text-align: center;
}

</style>
