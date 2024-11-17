<script setup lang="ts">
import { useAuthSotore } from '@/stores/AuthenticationStore';
import { useRouter } from 'vue-router';
const auth = useAuthSotore()
const router = useRouter()
function logOut(): void{
  auth.logUserOut()
  router.replace({name: 'posts'})
}
</script>

<template>
      <div style="background-color: antiquewhite" id="nav">
      <nav  class="navBlock">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    
        <div style="font-size:xx-large; padding-top: 15px;" class="navbar-nav mr-auto position-absolute top-50 start-50 translate-middle" id="navbarSupportedContent">
                <p><router-link :to="{name: 'posts'}" style="padding: 10px;">Posts</router-link>
                <router-link :to="{name: 'authors'}" style="padding: 10px;" >Authors</router-link></p>
        </div>
        <div style="font-size:x-large;  position: fixed;" class="navbar-collapse position-absolute top-50 end-0 translate-middle-y" id="navbarSupportedContent">
          <div class="navbar-nav mr-auto " style="width: 100%;">
                <router-link v-if="!auth.isUserLoggedIn()" :to="{name: 'login'}" class="nav-item nav-link">Log in</router-link>
                <div v-else>
                  <span style="float: left;" class="loggedin user">{{ auth.currentUser?.name }} |</span>
                  <span @click="logOut()" class="loggedin"  style="padding-left: 10px; cursor: pointer;  float: left;">Log out</span>
                </div>
            </div>
        </div>
    </nav>
     </div>
      
</template>
  

<style scoped>
.navBlock{
  height: 50px; 
  min-width: 400px; 
  position:relative; 
  margin-right: auto;
  margin-left: auto;
}
.loggedin{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
    font-weight: bold;
    
}
@media (max-width: 800px) {
  .user {
    visibility: collapse;
  }
}
.nav-link{
    padding: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2a79c7;
}
#nav {
  padding: 20px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>