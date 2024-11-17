import AuthorsView from '@/views/AuthorsView.vue'
import LoginView from '@/views/LoginView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import PostDetailsView from '@/views/Posts/PostDetailsView.vue'
import PostsView from '@/views/Posts/PostsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthSotore } from '@/stores/AuthenticationStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [ {
        path: 'post/:id',
        name: 'postDetails',
        component: PostDetailsView,
        props: true
      },
      {
        path: '',
        name: 'posts',
        alias: "/posts",
        component: PostsView
      }]
    },{
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from) =>{
        if(useAuthSotore().isUserLoggedIn()){
          return {path: from.path}
        }
      }
    },
    {
      path: '/authors',
      name: 'authors',
      component: AuthorsView
    },
    {
      path: '/:pathMatch(.*)',
      name: 'pathNotFound',
      component: PageNotFound
    }

  ]
})
router.beforeEach((to, from) => {
  useAuthSotore().isUserLoggedIn()
  return
})



export default router
