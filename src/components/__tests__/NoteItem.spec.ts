import { describe, it, expect, beforeEach, vi } from 'vitest';

import { VueWrapper, mount } from '@vue/test-utils';
import NoteItem from '../NoteItem.vue';
import { backgroundColors } from '@/utils/utils';
import IconCloseOutline from '@/components/icons/IconCloseOutline.vue';

describe('NoteItem', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(async () => {
    wrapper = mount(NoteItem);
  });

  it('renders properly', async () => {
    expect(wrapper.exists()).toBe(true);
    wrapper.setProps({
      item: {
        id: 100,
        content: 'Unit test content',
        time: new Date(2023, 1, 10, 11, 20),
        background: backgroundColors[0],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Unit test content');
    const container = wrapper.find('.item-container').element;
    const computedStyle = window.getComputedStyle(container);
    const backgroundColor = computedStyle.getPropertyValue('background-color');

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
        : null;
    };

    expect(backgroundColor).toBe(hexToRgb(backgroundColors[0]));
  });

  it('should remove first item when click remove', async () => {
    wrapper.setProps({
      item: {
        id: 100,
        content: 'Unit test content',
        time: new Date(2023, 1, 10, 11, 20),
        background: backgroundColors[0],
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.findComponent(IconCloseOutline).trigger('click');
    expect(wrapper.emitted().remove).toBeTruthy();
  });
});
