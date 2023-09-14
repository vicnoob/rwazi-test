import { describe, it, expect, beforeEach, vi } from 'vitest';

import { VueWrapper, mount } from '@vue/test-utils';
import PaginationComponent from '../PaginationComponent.vue';

describe('PaginationComponent', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(async () => {
    wrapper = mount(PaginationComponent, {
      props: {
        currentPage: 1, // Current page
        totalPages: 10, // Total number of pages
      },
    });
  });

  it('renders properly', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should renders corect page numbers', async () => {
    // It should display 1 2 3 4 5 ... 10 => 7
    expect(wrapper.findAll('.page-number').length).toBe(7);

    const pageLinks = wrapper.findAll('.page-number');
    expect(pageLinks.at(0)?.text()).toBe('1');
    expect(pageLinks.at(1)?.text()).toBe('2');
    expect(pageLinks.at(2)?.text()).toBe('3');
    expect(pageLinks.at(3)?.text()).toBe('4');
    expect(pageLinks.at(4)?.text()).toBe('5');
    expect(pageLinks.at(5)?.text()).toBe('...');
    expect(pageLinks.at(6)?.text()).toBe('10');
  });

  it('should renders corect page numbers when page = 5', async () => {
    wrapper.setProps({
      currentPage: 5,
    });
    await wrapper.vm.$nextTick();
    // It should display 1 ... 4 5 6 ... 10 => 7
    expect(wrapper.findAll('.page-number').length).toBe(7);

    const pageLinks = wrapper.findAll('.page-number');
    expect(pageLinks.at(0)?.text()).toBe('1');
    expect(pageLinks.at(1)?.text()).toBe('...');
    expect(pageLinks.at(2)?.text()).toBe('4');
    expect(pageLinks.at(3)?.text()).toBe('5');
    expect(pageLinks.at(4)?.text()).toBe('6');
    expect(pageLinks.at(5)?.text()).toBe('...');
    expect(pageLinks.at(6)?.text()).toBe('10');
  });

  it('btn next, back should work properly when page = 1', async () => {
    await wrapper.find('.back-btn').trigger('click');
    expect(wrapper.emitted('page-change')).toBeFalsy();

    await wrapper.find('.next-btn').trigger('click');
    expect(wrapper.emitted('page-change')).toBeTruthy();
    expect(wrapper.emitted()['page-change'][0]).toEqual([2]);
  });

  it('btn next, back should work properly when page = 10 (last page)', async () => {
    wrapper.setProps({
      currentPage: 10,
    });
    await wrapper.vm.$nextTick();

    await wrapper.find('.next-btn').trigger('click');
    expect(wrapper.emitted('page-change')).toBeFalsy();

    await wrapper.find('.back-btn').trigger('click');
    expect(wrapper.emitted('page-change')).toBeTruthy();
    expect(wrapper.emitted()['page-change'][0]).toEqual([9]);
  });

  it('btn next, back should work properly when page = 2', async () => {
    wrapper.setProps({
      currentPage: 2,
    });

    await wrapper.vm.$nextTick();

    await wrapper.find('.back-btn').trigger('click');
    expect(wrapper.emitted('page-change')).toBeTruthy();
    expect(wrapper.emitted()['page-change'][0]).toEqual([1]);

    await wrapper.find('.next-btn').trigger('click');
    expect(wrapper.emitted('page-change')).toBeTruthy();
    expect(wrapper.emitted()['page-change'][1]).toEqual([3]);
  });

  it('should emit page change when click a page', async () => {
    wrapper.setProps({
      currentPage: 2,
    });

    await wrapper.vm.$nextTick();

    const pageLinks = wrapper.findAll('.page-number');
    // Click on the 3rd element => page 3
    await pageLinks.at(2)?.trigger('click');
    expect(wrapper.emitted('page-change')).toBeTruthy();
    expect(wrapper.emitted()['page-change'][0]).toEqual([3]);
  });
});
