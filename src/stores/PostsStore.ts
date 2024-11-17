import { ref, readonly } from 'vue'
import { useNotificationStore } from "@/stores/NotificationStore"
import { defineStore } from 'pinia'
import type { Post } from '@/types/Post'
import { getData, postObject, updateObject, deleteObject } from '../services/APIService'
import { useAuthSotore } from './AuthenticationStore'

export const usePostStore = defineStore('posts', () => {
    const postList = ref<Post[]>([])
    const isLoading = ref(false)
    const Notifications = useNotificationStore()

    const elementCount = ref<Number>(0)
    const currentPage = ref<Number>(1)
    const limit = 3

    async function GetPosts(page: Number | null, searchQuery?: String | null): Promise<void> {
        isLoading.value = true
        currentPage.value = page ?? 1
        let urlQ = `posts?_expand=author&_page=${currentPage.value}&_limit=${limit}`
        if(searchQuery){
            urlQ = `${urlQ}&q=${searchQuery}` 
        }
        const res = await getData(urlQ)
        postList.value = res.data as Post[]
        elementCount.value = res.dataCount ?? 0
        if(res.error){
            Notifications.errorNotification(res.message+ '   '+ res.code)
        }
        else{
            Notifications.successNotification(res.message)
        }
        isLoading.value = false
    }

    async function GetOnePost(postId:Number): Promise<void> {
        isLoading.value = true
        let urlQ = `posts/${postId}?_expand=author`
        const res = await getData(urlQ)
        postList.value = res.data as Post[]
        if(res.error){
            Notifications.errorNotification(res.message+ '   '+ res.code)
        }
        else{
            Notifications.successNotification(res.message)
        }
        isLoading.value = false
    }

    async function createPost(title: String, body: String, authorId: String, searchQuery?: String | null): Promise<void>{
        const Auth =  useAuthSotore()
        const post: Post = {
            title: title.charAt(0).toUpperCase() + title.slice(1),
            body: body.charAt(0).toUpperCase() + body.slice(1),
            authorId: +authorId,
            userId: Auth.currentUser?.id as Number,
            created_at: new Date(Date.now()).toISOString(),
            updated_at: new Date(Date.now()).toISOString()
        }
        const res = await postObject(post, 'posts')
        if(res.error){
            Notifications.errorNotification(res.message+ '  '+ res.code)
        }
        else{
            Notifications.successNotification('Post successfully created')
            GetPosts(currentPage.value, searchQuery??'')
        }
    }

    async function updatePost(title: String, body: String, post: Post, updateType: String, searchQuery?: String | null): Promise<void>{

        post.title = title
        post.body = body
        post.updated_at = new Date(Date.now()).toISOString()
        const res = await updateObject(post, `posts/${post.id}`)
        if(res.error){
            Notifications.errorNotification(res.message+ '  '+ res.code)
        }
        else{
            Notifications.successNotification('Post successfully updated')
            if(updateType === 'list'){
                GetPosts(currentPage.value, searchQuery??'')
                return
            }
            GetOnePost((res.data as Post).id as Number)
        }
    }

    async function deletePost(post: Post, searchQuery?: String | null): Promise<boolean>{
        const res = await deleteObject(`posts/${post.id}`)
        if(res.error){
            Notifications.errorNotification(res.message+ '  '+ res.code)
        }
        else{
            Notifications.successNotification('Post successfully deleted')
            GetPosts(postList.value.length as Number === 1 && currentPage.value != 1 ? +currentPage.value - 1 : +currentPage.value, searchQuery??'')
            return true
        }
        return false
    }

    return { deletePost, GetOnePost,updatePost,createPost,GetPosts, postList: readonly(postList), isLoading, currentPage, limit, elementCount}
})