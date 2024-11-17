<script setup lang="ts">
import {ref} from 'vue'
import { useAuthSotore } from '@/stores/AuthenticationStore';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
const authStore = useAuthSotore()
const email = ref<String>('')
const password = ref<String>('')
const router = useRouter()
async function handleSubmit(): Promise<void>{
    console.log('wth')
    await authStore.logUserIn(email.value, password.value)
    if(authStore.isUserLoggedIn()){
        router.replace({name: 'posts'}) 
    }
}

</script>

<template>
    <div style="padding:  20px;">
        <div class="blockContent">
            <h1>Log in</h1>
            <Form @submit="handleSubmit">
                <p>Email<br><Field name="email" :rules="'required|email'" class="search" v-model="email" required type="email" placeholder="Email"/><br><ErrorMessage name="email" class="error"/></p>  
                
                <p>Password<br><Field name="password" :rules="'required'"  class="search" v-model="password" required type="password" placeholder="Password"/><br><ErrorMessage name="password" class="error"/></p>
                <button type="submit" class="button">Submit</button>
            </Form>
        </div>
    </div>
</template>

<style scoped>

</style>