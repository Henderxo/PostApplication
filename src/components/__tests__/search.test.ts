import { expect, describe, vi, it } from "vitest";
import Search from "../Search.vue";
import { shallowMount, VueWrapper } from "@vue/test-utils";


describe('search', () =>{
    let wrapper: VueWrapper<InstanceType<typeof Search>>;

    it('render componenets items', () => {
        wrapper = shallowMount(Search)
        expect(wrapper.find('input')).toBeTruthy()
    })  

    it('search does not trigger insta', async () =>  {
        vi.useFakeTimers()
        
        wrapper = shallowMount(Search)

        await wrapper.find('input').setValue('Post1')
        await wrapper.vm.$nextTick()


        await setTimeout(() => {
            expect(wrapper.emitted('handle-search-input')).toBeFalsy()
            }, 1000)
        vi.advanceTimersByTime(1000)
    }) 

    it('search triggers after delay', async () =>  {
        vi.useFakeTimers()
        
        wrapper = shallowMount(Search)
        
        await wrapper.find('input').setValue('Post1')

        await setTimeout(() => {
        expect(wrapper.emitted('handle-search-input')?.map(array => array[1])[0]).equals('Post1')
        }, 5000)

        vi.advanceTimersByTime(50000)
    })
})