import { ref, readonly } from 'vue'
import { defineStore } from 'pinia'
import type { Author } from '@/types/Author'
import { getData, postObject, updateObject, deleteObject } from '../services/APIService'
import { useNotificationStore } from './NotificationStore'
import { useAuthSotore } from './AuthenticationStore'

export const useAuthorStore = defineStore('authors', () => {
    const authorList = ref<Author[]>([])
    const isLoading = ref(false)
    const Notifications = useNotificationStore()

    const elementCount = ref<Number>(0)
    const currentPage = ref<Number>(1)
    const limit = 3

    async function GetAuthors(page: Number | null, searchQuery?: String | null): Promise<void> {
        isLoading.value = true
        currentPage.value = page ?? 1
        let urlQ = `authors?&_page=${currentPage.value}&_limit=${limit}`
        if(searchQuery){
            urlQ = `${urlQ}&q=${searchQuery}` 
        }
        const res = await getData(urlQ)
        authorList.value = res.data as Author[]
        elementCount.value = res.dataCount ?? 0
        if(res.error){
            Notifications.errorNotification(res.message+ '   '+ res.code)
        }
        else{
            Notifications.successNotification(res.message)
        }
        isLoading.value = false
    }

    async function GetAllAuthors(): Promise<void> {
        isLoading.value = true
        let urlQ = `authors`
        const res = await getData(urlQ)
        authorList.value = res.data as Author[]
        elementCount.value = res.dataCount ?? 0
        if(res.error){
            Notifications.errorNotification(res.message+ '   '+ res.code)
        }
        else{
            Notifications.successNotification(res.message)
        }
        isLoading.value = false
    }

    async function createAuthor(name: String, surname: String, searchQuery?: String | null): Promise<void>{
        const Auth =  useAuthSotore()
        const author: Author = {
            name: name.charAt(0).toUpperCase() + name.slice(1),
            surname: surname.charAt(0).toUpperCase() + surname.slice(1),
            userId: Auth.currentUser?.id as Number,
            created_at: new Date(Date.now()),
            updated_at: new Date(Date.now())
        }
        const res = await postObject(author, 'authors')
        if(res.error){
            Notifications.errorNotification(res.message+ '  '+ res.code)
        }
        else{
            Notifications.successNotification('Author successfully created')
            GetAuthors(currentPage.value, searchQuery??'')
        }
    }
    
    async function updateAuthor(name: String, surname: String, authorId: Number,  searchQuery?: String | null): Promise<void>{
        const authorToUpdate = authorList.value.find((author) => author.id === authorId) || null
        if(authorToUpdate != null){
            let newAuthor = {...authorToUpdate}
            newAuthor.name = name
            newAuthor.surname = surname
            newAuthor.updated_at = new Date(Date.now()).toISOString()
            const res = await updateObject(newAuthor, `authors/${newAuthor.id}`)
            if(res.error){
                Notifications.errorNotification(res.message+ '  '+ res.code)
            }
            else{
                Notifications.successNotification('Author successfully updated')
                GetAuthors(currentPage.value, searchQuery??'')
            }
        }
    }

    async function deleteAuthor(authorId: Number, searchQuery?: String | null): Promise<void>{
        const authorToDelete = authorList.value.find((author) => author.id === authorId) || null
        if(authorToDelete != null){
            const res = await deleteObject(`authors/${authorToDelete.id}`)
            if(res.error){
                Notifications.errorNotification(res.message+ '  '+ res.code)
            }
            else{
                Notifications.successNotification('Author successfully deleted')
                GetAuthors(authorList.value.length as Number === 1 && currentPage.value != 1 ? +currentPage.value - 1 : +currentPage.value, searchQuery??'')
            }
        }else{
            Notifications.errorNotification('Could not find such author. Try again!!')
        }
    }
    return { GetAllAuthors ,deleteAuthor,updateAuthor, createAuthor,GetAuthors, authorList: readonly(authorList), isLoading, currentPage, limit, elementCount}
})