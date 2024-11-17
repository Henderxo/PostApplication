import { defineStore } from "pinia";
import type { User } from "@/types/User";
import { ref, readonly } from "vue";
import { useNotificationStore } from "./NotificationStore";
import { resgisterNewLogin, removeToken, isTokenValid } from "@/services/Authentication";

export const useAuthSotore = defineStore('authentication', () => {
    const currentUser = ref<User|null>(JSON.parse(localStorage.getItem('currentUser') as string))
    const authToken = ref<String|null>(localStorage.getItem('token'))
    const notifications = useNotificationStore()

    async function logUserIn(email: String, passw: String): Promise<void> {
        const res = await resgisterNewLogin(email, passw)
        currentUser.value = res.data as User
        authToken.value = typeof res.token !== 'undefined' ? res.token : null
        if(res.error){
            res.code === 'ERR_BAD_REQUEST' ? notifications.errorNotification('Wrong email or password') :
            notifications.errorNotification(res.message+ '   '+ res.code)
            return
        }
        else{
            notifications.successNotification('Welcome: ' + currentUser.value.name)
        }
    }

    function isUserLoggedIn(): boolean{
        if(authToken.value != null){
            if(isTokenValid(authToken.value??'')){
                return true
            }
            logUserOut('Token time expired, user logged out')
        }
        return false
    }

    async function logUserOut(message?: String): Promise<void>{
        currentUser.value = null
        authToken.value = null
        removeToken()
        let currentMessage = typeof message != 'undefined' ? message : 'Successfull log out'
        notifications.successNotification(currentMessage)
    }

    return {authToken,isUserLoggedIn ,currentUser: readonly(currentUser), logUserOut, logUserIn}
})