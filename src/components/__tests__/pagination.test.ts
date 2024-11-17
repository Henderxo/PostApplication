import { describe, vi, it, expect, beforeEach, } from "vitest";
import Pagination from "../Pagination.vue";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import { render } from "vue";
import { emit } from "process";


const findButtonByText = (wrapper: VueWrapper, text: String) => {
    return wrapper.findAll('button').find(button => button.text() === text);
  };

describe('pagination', ()=>{
    let wrapper: VueWrapper<InstanceType<typeof Pagination>>
    let propsData: {
        elementCount: 10,
        showingPages: 3,
        currentPage: 1,
        limit: 3,
    }

    it('renders all items correctly', ()=>{
        wrapper = shallowMount(Pagination, {
            propsData: {
                elementCount: 10,
                showingPages: 3,
                currentPage: 2,
                limit: 3,
            }
        })

        const pageButtons = wrapper.findAll('button.button');
        const renderedPages = pageButtons.map(button => button.text());
        expect(renderedPages).toEqual(['First','Prev','1', '2', '3', 'Next', 'Last']);
    })

    it('do not display Next and Last on the last page', ()=>{
        wrapper = shallowMount(Pagination, {
            propsData: {
                elementCount: 10,
                showingPages: 3,
                currentPage: 4,
                limit: 3,
            }
        })
        expect(findButtonByText(wrapper, 'Next')?.text()).toBeUndefined()
        expect(findButtonByText(wrapper, 'Last')?.text()).toBeUndefined()
    })

    it('do not display First and Prev on the first page', ()=>{
        wrapper = shallowMount(Pagination, {
            propsData: {
                elementCount: 10,
                showingPages: 3,
                currentPage: 1,
                limit: 3,
            }
        })
        expect(findButtonByText(wrapper, 'First')?.text()).toBeUndefined()
        expect(findButtonByText(wrapper, 'Prev')?.text()).toBeUndefined()
    })

    it('emits load-new-page when a button is clicked', async () => {
        wrapper = shallowMount(Pagination, {
            propsData: {
                elementCount: 10,
                showingPages: 3,
                currentPage: 1,
                limit: 3,
            }
        })
        await findButtonByText(wrapper, 'Next')?.trigger('click');
        expect(wrapper.emitted('load-new-page')?.map(array => array[0])[0]).equal(2);
      });


      it('emits load-new-page when a numbers button is clicked', async () => {
        wrapper = shallowMount(Pagination, {
            propsData: {
                elementCount: 10,
                showingPages: 3,
                currentPage: 1,
                limit: 3,
            }
        })
        await findButtonByText(wrapper, '3')?.trigger('click');
        expect(wrapper.emitted('load-new-page')?.map(array => array[0])[0]).equal(3);
      });
})