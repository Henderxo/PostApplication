import type { apiRequest } from "@/types/apiRequest"
import { getUserAuthData, resetInstance } from "@/services/APIService"
import type { User } from "@/types/User"

export async function resgisterNewLogin(email: String, passw: String): Promise<apiRequest> {
    const res = await getUserAuthData(email, passw)
    let jwtToken = typeof res.token !== 'undefined' ? res.token : ''
    if(!res.error && isTokenValid(jwtToken)){
        localStorage.setItem("token", jwtToken as string)
        localStorage.setItem("currentUser", JSON.stringify(res.data as User)) 
    }
    return res
}

export function removeToken(): void{
    localStorage.removeItem("token")
    localStorage.removeItem("currentUser")
    resetInstance()
}

export function getAuthHeaders(): String {
    const token = localStorage.getItem('token')
    return token ? `Bearer ${token}` : ''
}

function parseToken(token: String): Number{
    const arrayToken = token.split('.')
    const tokenPayload = JSON.parse(atob(arrayToken[1]))
    return tokenPayload.exp as Number
}

export function isTokenValid(token: String): boolean{

    if(token.length > 1)
    {
        let tokenExpDate = parseToken(token)
        const currentTime = new Date().getTime() / 1000
        return currentTime as Number > tokenExpDate ? false : true
    }
    return false
}

