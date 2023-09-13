<template>
  <div
    v-if="item"
    :class="`w-full h-40 flex flex-col justify-between p-4 rounded-lg`"
    :style="{
      backgroundColor: `${item.background}`,
    }"
  >
    <div class="flex justify-between items-center">
      <div>{{ item?.content }}</div>
      <IconCloseOutline
        @click="$emit('remove')"
        class="w-5 h-5 cursor-pointer text-gray-400 hover:text-black"
      ></IconCloseOutline>
    </div>
    <div class="text-right font-bold">{{ format(item.time, 'yyyy-MM-dd HH:mm') }}</div>
  </div>
</template>

<script setup lang="ts">
import type { INoteItem } from '@/types/Note';
import { format } from 'date-fns';
import type { PropType } from 'vue';
import IconCloseOutline from './icons/IconCloseOutline.vue';
defineProps({
  item: Object as PropType<INoteItem>,
});
defineEmits(['remove']);
</script>
