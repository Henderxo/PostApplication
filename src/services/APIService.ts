import axios from "axios";
import type { apiRequest } from "@/types/apiRequest";
import {getAuthHeaders} from "@/services/Authentication"

const instance = axios.create({
    baseURL: global.httpLink
})
instance.defaults.headers.common['Authorization'] = getAuthHeaders() as string

function resetInstance(): void{
    instance.defaults.headers.common['Authorization'] = ''
}

async function getUserAuthData(email: String, passw: String): Promise<apiRequest> {
    try{
        //passw = 'training'
        //email = 'regular@notreal.com'
        const res = await instance.post('login', {email: email, password: passw})
        instance.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`
        if(res.statusText != 'OK'){
            console.log(res.status + res.statusText)
            return {
                error: true,
                message: res.statusText,
                code: res.status,
                data: []
            }
        }
        
        return {
            error: false,
            message: 'Data loadead successfully',
            code: res.status,
            data: res.data.user,
            token: res.data.accessToken
        }

    }catch (error){
        return {
            error: true,
            message: error.message,
            code: error.code,
            data: []
        }
    }
}

async function getData(dataName: String): Promise<apiRequest> {
    try{
        const res = await instance.get(dataName as string)
        if(res.statusText != 'OK'){
            console.log(res.status + res.statusText)
            return {
                error: true,
                message: res.statusText,
                code: res.status,
                data: []
            }
        }

        return {
            error: false,
            message: 'Data loadead successfully',
            code: res.status,
            data: res.data,
            dataCount: res.headers['x-total-count']
        }

    }catch (error){
        return {
            error: true,
            message: error.message,
            code: error.code,
            data: []
        }
    }
}

async function postObject(data: Object, dataName: String, ): Promise<apiRequest> {
    try{
        const res = await instance.post(dataName as string, data)
        return {
            error: false,
            message: 'Object successfully created',
            code: res.status,
            data: res.data
        }

    }catch (error){
        return {
            error: true,
            message: error.message,
            code: error.code,
            data: []
        }
    }
}

async function updateObject(data: Object, dataName: String): Promise<apiRequest> {
    try{
        const res = await instance.put(dataName as string, data)
        return {
            error: false,
            message: 'Object successfully updated',
            code: res.status,
            data: res.data
        }

    }catch (error){
        return {
            error: true,
            message: error.message,
            code: error.code,
            data: []
        }
    }
}
async function deleteObject(dataName: String): Promise<apiRequest> {
    try{
        const res = await instance.delete(dataName as string)
        return {
            error: false,
            message: 'Object successfully deleted',
            code: res.status,
            data: res.data
        }

    }catch (error){
        return {
            error: true,
            message: error.message,
            code: error.code,
            data: []
        }
    }
}
export { deleteObject, getData, postObject, getUserAuthData, resetInstance, updateObject}