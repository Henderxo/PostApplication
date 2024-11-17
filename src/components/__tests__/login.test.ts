import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../Login.vue';
import { mount, VueWrapper } from '@vue/test-utils';
//import { useRouter } from 'vue-router';
import { useAuthSotore } from '@/stores/AuthenticationStore';
import '@/Validation/validator.ts'

vi.mock('@/stores/AuthenticationStore', () => ({
    useAuthSotore: vi.fn(() => ({
        logUserIn: vi.fn(),
        isUserLoggedIn: vi.fn().mockReturnValue(true),
    }))
}),)
vi.mock('vue-router', () => ({
    useRouter: vi.fn(()=>({
        replace: vi.fn()
    }))
}))

describe('Login', () =>{
   let wrapper: VueWrapper<InstanceType<typeof Login>>
   let authStore: ReturnType<typeof useAuthSotore>
   //let router: ReturnType<typeof useRouter>

    const data = useAuthSotore()
    vi.spyOn(data, 'logUserIn') 
    beforeEach(() => {
        authStore = useAuthSotore() 
        //router = useRouter()
        wrapper = mount(Login)
    })

    it('renders the form fields correctly', () => {
        expect(wrapper.find('input[type="email"]').exists()).toBe(true)
        expect(wrapper.find('input[type="password"]').exists()).toBe(true)
        expect(wrapper.find('button').text()).toBe('Submit')
      })
      /*
    it('validates email field as required', async()=>{
        const emailInput = wrapper.find('input[type="email"]')
        await emailInput.setValue('')
        await wrapper.find('form').trigger('submit')
        expect(wrapper.find('error').text()).toContain('This field is required')
    })*/

    it('updates input values correctly', async ()=> {
        const emailInput = wrapper.find('input[type="email"]')
        const passwordInput = wrapper.find('input[type="password"]')

        await emailInput.setValue('John@gmail.com')
        await passwordInput.setValue('training')

        expect(emailInput.element.value).toBe('John@gmail.com')
        expect(passwordInput.element.value).toBe('training')
    })
    
    it('logs in the user and redirects on valid submission', async () => {
        const emailInput = wrapper.find('input[type="email"]')
        const passwordInput = wrapper.find('input[type="password"]')
        await emailInput.setValue("valid@example.com")
        await passwordInput.setValue("training")
        await wrapper.find("form").trigger("submit")

        const spy = vi.spyOn(vi.mocked(authStore), 'logUserIn')
        const spy2 = vi.spyOn(vi.mocked(authStore), 'isUserLoggedIn')
        console.log(vi.mocked(authStore).isUserLoggedIn())
        
        expect(data).toHaveBeenCalled()
        expect(spy2).toHaveBeenCalled()
        

      })
})