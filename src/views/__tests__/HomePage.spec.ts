import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { VueWrapper, mount } from '@vue/test-utils';
import HomePage from '../HomePage.vue';
import NoteItem from '@/components/NoteItem.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { defaultList } from '@/utils/utils';

describe('HomePage', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(async () => {
    wrapper = mount(HomePage);
  });
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the "Notes" title', () => {
    expect(wrapper.text()).toContain('Notes');
  });

  it('opens the modal when clicking the "Add Note" button', async () => {
    expect(wrapper.vm.isShowModal).toBe(false);
    await wrapper.find('#plusBtn').trigger('click');
    expect(wrapper.vm.isShowModal).toBe(true);
  });

  it('adds a new note when the "Add Note" button is clicked in the modal', async () => {
    wrapper.vm.noteList = defaultList.slice(0);

    const originalLength = wrapper.vm.noteList.length;
    const addNewNoteSpy = vi.spyOn(wrapper.vm, 'addNewNote');

    // Open modal
    await wrapper.find('#plusBtn').trigger('click');
    wrapper.vm.newNote = 'Mock testing';
    await wrapper.find('#addNoteBtn').trigger('click');
    expect(addNewNoteSpy).toHaveBeenCalled();
    expect(wrapper.vm.isShowModal).toBe(false);
    expect(wrapper.vm.newNote).toBe('');
    expect(wrapper.vm.noteList.length).toBe(originalLength + 1);
    expect(wrapper.vm.noteList[wrapper.vm.noteList.length - 1].content).toBe('Mock testing');

    addNewNoteSpy.mockRestore();
  });

  it('adds a new note when the "Add Note" button is clicked in the modal', async () => {
    wrapper.vm.noteList = defaultList.slice(0);

    const originalLength = wrapper.vm.noteList.length;
    const addNewNoteSpy = vi.spyOn(wrapper.vm, 'addNewNote');

    // Open modal
    await wrapper.find('#plusBtn').trigger('click');
    const textarea = wrapper.find('#newNote');
    textarea.setValue('Mock testing');
    await wrapper.find('#addNoteBtn').trigger('click');
    expect(addNewNoteSpy).toHaveBeenCalled();
    expect(wrapper.vm.isShowModal).toBe(false);
    expect(wrapper.vm.newNote).toBe('');
    expect(wrapper.vm.noteList.length).toBe(originalLength + 1);
    expect(wrapper.vm.noteList[wrapper.vm.noteList.length - 1].content).toBe('Mock testing');
    addNewNoteSpy.mockRestore();
  });

  it('not adds a new note when the "Close" button is clicked in the modal', async () => {
    const originalLength = wrapper.vm.noteList.length;
    const addNewNoteSpy = vi.spyOn(wrapper.vm, 'addNewNote');
    const closeModalSpy = vi.spyOn(wrapper.vm, 'closeModal');

    // Open modal
    await wrapper.find('#plusBtn').trigger('click');
    wrapper.vm.newNote = 'Mock testing';
    await wrapper.find('#closeBtn').trigger('click');
    expect(addNewNoteSpy).toHaveBeenCalledTimes(0);
    expect(closeModalSpy).toHaveBeenCalled();
    expect(wrapper.vm.isShowModal).toBe(false);
    expect(wrapper.vm.newNote).toBe('');
    expect(wrapper.vm.noteList.length).toBe(originalLength);

    addNewNoteSpy.mockRestore();
    closeModalSpy.mockRestore();
  });

  it('should remove first item', async () => {
    const originalLength = wrapper.vm.noteList.length;
    wrapper.vm.onRemoveItem(wrapper.vm.noteList[0].id);
    expect(wrapper.vm.noteList.length).toBe(originalLength - 1);
  });

  it('should remove first item when click remove', async () => {
    const originalLength = wrapper.vm.noteList.length;
    wrapper.findComponent(NoteItem).vm.$emit('remove', 1);
    expect(wrapper.vm.noteList.length).toBe(originalLength - 1);
  });

  it('should change the order when click sort btn', async () => {
    const originalDisplayList = wrapper.vm.displayedList.slice(0);
    expect(wrapper.vm.isAscOrder).toBe(false);
    await wrapper.find('#sortBtn').trigger('click');
    expect(wrapper.vm.isAscOrder).toBe(true);
    expect(wrapper.vm.displayedList[0].id).not.toBe(originalDisplayList[0].id);
  });

  it('should work correctly when changing the current page', async () => {
    expect(wrapper.vm.currentPage).toBe(1);
    wrapper.vm.perPage = 6;
    wrapper.findComponent(PaginationComponent).vm.$emit('page-change', 2);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentPage).toBe(2);
    expect(wrapper.vm.displayedList.length).toBe(
      Math.min(2 * wrapper.vm.perPage, wrapper.vm.noteList.length) - wrapper.vm.perPage
    );
  });

  it('should display No notes yet if the list is empty', async () => {
    const originalNoteList = wrapper.vm.noteList.slice(0);
    wrapper.vm.noteList = [];
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('No notes yet');
    const openAddNoteModal = wrapper.find('#openAddNoteModal').isVisible();
    expect(openAddNoteModal).toBe(true);

    wrapper.vm.noteList = originalNoteList;
  });

  it('should have only 1 item after search', async () => {
    await wrapper.find('#plusBtn').trigger('click');
    wrapper.vm.newNote = 'Mock searching';
    await wrapper.find('#addNoteBtn').trigger('click');

    const searchInput = wrapper.find('#searchInput');
    searchInput.setValue('Mock searching');
    expect(wrapper.vm.displayedList.length).toEqual(1);
  });

  it('should have 0 item after search', async () => {
    await wrapper.find('#plusBtn').trigger('click');
    wrapper.vm.newNote = 'Mock testing';
    await wrapper.find('#addNoteBtn').trigger('click');

    const searchInput = wrapper.find('#searchInput');
    searchInput.setValue('Random string');
    expect(wrapper.vm.displayedList.length).toEqual(0);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
