import Author from "../Authors/Author.vue";
import { beforeAll, beforeEach, describe, it, expect, vi } from "vitest";
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { useAuthSotore } from "@/stores/AuthenticationStore";
import type { User } from "@/types/User";

vi.mock('@/stores/AuthenticationStore', () => {
    const currentUser = {
        id: 1,
        name: 'Spider',
        email: 'spider@example.com',
    };

    return {
        useAuthSotore: vi.fn(() => ({
            logUserIn: vi.fn(),
            isUserLoggedIn: vi.fn().mockReturnValue(true), // or false depending on the scenario you want to test
            currentUser
        })),
    }
})

const findButtonByText = (wrapper: VueWrapper, text: String) => {
    return wrapper.findAll('button').find(button => button.text() === text);
  };

describe('Author',() => {
    let wrapper: VueWrapper<InstanceType<typeof Author>>;

    it('renders the fields correctly',()=>{
        wrapper = shallowMount(Author, {
            propsData: { Author: {
                id: 1,
                name: 'John',
                surname: 'Doe',
                userId: 1,
                created_at: new Date('2023-01-01T00:00:00Z').toDateString(),
                updated_at: new Date('2023-01-02T00:00:00Z').toDateString(), 
              } }
            })
        expect(wrapper.find('.text').text()).toContain('Name: John Surname:DeleteEdit Doe Date: Sun Jan 01')
    })

    it('shows edit and delete buttons when current user is the author', async () => {
        wrapper = shallowMount(Author, {
            propsData: { Author: {
                id: 1,
                name: 'John',
                surname: 'Doe',
                userId: 1,
                created_at: new Date('2023-01-01T00:00:00Z').toDateString(),
                updated_at: new Date('2023-01-02T00:00:00Z').toDateString(), 
              } }
            })
            const buttons = wrapper.findAll('button')
            expect(findButtonByText(wrapper, 'Edit')).toBeTruthy()
            expect(findButtonByText(wrapper, 'Delete')).toBeTruthy()
            
    })

    it('do not show edit and delete buttons when current user is not the author', async () => {
        wrapper = shallowMount(Author, {
            propsData: { Author: {
                id: 2,
                name: 'John',
                surname: 'Doe',
                userId: 2,
                created_at: new Date('2023-01-01T00:00:00Z').toDateString(),
                updated_at: new Date('2023-01-02T00:00:00Z').toDateString(), 
              } }
            })
            expect(findButtonByText(wrapper, 'Edit')).toBeFalsy()
            expect(findButtonByText(wrapper, 'Delete')).toBeFalsy()
    })

    it('emits delete-author when delete button is clicked', async () => {
        wrapper = shallowMount(Author, {
            propsData: { Author: {
                id: 2,
                name: 'John',
                surname: 'Doe',
                userId: 1,
                created_at: new Date('2023-01-01T00:00:00Z').toDateString(),
                updated_at: new Date('2023-01-02T00:00:00Z').toDateString(), 
              } }
            })
        await findButtonByText(wrapper, 'Delete')?.trigger('click');
    
        expect(wrapper.emitted('delete-author')).toBeTruthy();
      });

      it('emits edit-author when edit button is clicked', async () => {
        wrapper = shallowMount(Author, {
            propsData: { Author: {
                id: 2,
                name: 'John',
                surname: 'Doe',
                userId: 1,
                created_at: new Date('2023-01-01T00:00:00Z').toDateString(),
                updated_at: new Date('2023-01-02T00:00:00Z').toDateString(), 
              } }
            })
        await findButtonByText(wrapper, 'Edit')?.trigger('click');
    
        expect(wrapper.emitted('edit-author')).toBeTruthy();
      });

})