import { describe, it, expect, beforeEach, vi } from 'vitest';

import { VueWrapper, mount } from '@vue/test-utils';
import AddNoteForm from '../AddNoteForm.vue';

describe('AddNoteForm', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(async () => {
    wrapper = mount(AddNoteForm);
  });

  it('renders properly', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should emit close when click overlay', async () => {
    await wrapper.find('.overlay').trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
