<template>
  <div class="max-w-[1000px] mx-auto p-5">
    <div class="font-bold text-4xl mb-5">Notes</div>
    <div class="flex justify-between items-center">
      <div class="grow">
        <input
          id="searchInput"
          type="text"
          v-model="searchKey"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search something ..."
        />
      </div>
      <div
        @click="openModal"
        id="plusBtn"
        class="ml-5 p-4 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer"
      >
        <span class="text-white leading-none"> + </span>
      </div>
    </div>
    <div class="mb-5">
      <div class="flex justify-end mb-5 mt-5">
        <div
          id="sortBtn"
          class="text-blue-500 cursor-pointer flex justify-center items-center border-b border-blue-500"
          @click="isAscOrder = !isAscOrder"
        >
          Sort by time
          <IconArrowUp
            :class="{
              'rotate-180': !isAscOrder,
            }"
            class="transition-all duration-400 ease w-3 h-3 ml-2"
          ></IconArrowUp>
        </div>
      </div>
      <template v-if="displayedList?.length">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <NoteItem
            v-for="item of displayedList"
            :item="item"
            :key="item.id"
            @remove="onRemoveItem(item.id)"
          ></NoteItem>
        </div>
        <PaginationComponent
          :total-pages="totalPages"
          :current-page="currentPage"
          @pageChange="currentPage = $event"
        ></PaginationComponent>
      </template>
      <div class="text-center pt-10" v-else>
        <div>No notes yet</div>
        <button
          id="openAddNoteModal"
          @click="openModal"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-5 rounded"
        >
          Add a note
        </button>
      </div>
    </div>
  </div>

  <AddNoteForm @close="closeModal" v-if="isShowModal">
    <div>
      <h2 class="text-2xl mb-4">Create a note</h2>
      <textarea
        rows="4"
        id="newNote"
        v-model="newNote"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter your note content ..."
      ></textarea>

      <div class="flex justify-end">
        <button
          @click="addNewNote"
          id="addNoteBtn"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-5 rounded mr-2"
        >
          Add a note
        </button>
        <button
          id="closeBtn"
          class="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 mt-5 rounded mr-2"
          @click="closeModal"
        >
          Close
        </button>
      </div>
    </div>
  </AddNoteForm>
</template>

<script setup lang="ts">
import NoteItem from '@/components/NoteItem.vue';
import AddNoteForm from '@/components/AddNoteForm.vue';
import type { INoteItem } from '@/types/Note';
import { computed, ref } from 'vue';
import { compareAsc, compareDesc } from 'date-fns';
import IconArrowUp from '@/components/icons/IconArrowUp.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { getRandomColor } from '@/utils/utils';
import { defaultList } from '@/utils/utils';

const currentPage = ref(1);
const perPage = ref(4);
const searchKey = ref();

const noteList = ref<INoteItem[]>(defaultList.slice(0));

const totalPages = computed(() => Math.ceil(noteList.value.length / perPage.value));

const isAscOrder = ref(false);

const displayedList = computed(() => {
  const list = noteList.value.slice(0);
  list.sort((l, r) =>
    isAscOrder.value ? compareAsc(l.time, r.time) : compareDesc(l.time, r.time)
  );
  return list
    .filter((item) => {
      return searchKey.value
        ? item.content.toLowerCase().includes(searchKey.value.toLowerCase())
        : true;
    })
    .slice((currentPage.value - 1) * perPage.value, currentPage.value * perPage.value);
});

const isShowModal = ref(false);
const newNote = ref('');

const addNewNote = () => {
  noteList.value = [
    ...noteList.value,
    {
      id: noteList.value.length + 1,
      content: newNote.value,
      time: new Date(),
      background: getRandomColor(),
    },
  ];
  closeModal();
};
const closeModal = () => {
  newNote.value = '';
  isShowModal.value = false;
};

const openModal = () => {
  isShowModal.value = true;
};

const onRemoveItem = (id: number) => {
  noteList.value = noteList.value.filter((item) => item.id !== id);
};
</script>
