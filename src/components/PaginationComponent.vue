<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white py-3 mt-5">
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        @click.prevent="changePage(currentPage - 1)"
        :class="{
          '!text-gray-400': isFirstPage,
          'cursor-not-allowed': isFirstPage,
        }"
        class="back-btn relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Previous</a
      >
      <a
        href="#"
        @click.prevent="changePage(currentPage + 1)"
        :class="{
          '!text-gray-400': isLastPage,
          'cursor-not-allowed': isLastPage,
        }"
        class="next-btn relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Next</a
      >
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a
            href="#"
            @click.prevent="changePage(currentPage - 1)"
            class="back-btn relative inline-flex items-center rounded-l-md px-2 py-2 text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            :class="{
              '!text-gray-400': isFirstPage,
              'cursor-not-allowed': isFirstPage,
            }"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
          <a
            href="#"
            v-for="page in itemList"
            :key="page"
            aria-current="page"
            :class="{
              'bg-indigo-600 text-white': page === currentPage,
            }"
            @click.prevent="changePage(page)"
            class="page-number w-10 relative z-10 inline-flex items-center ring-1 ring-inset ring-gray-300 text-gray-900 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {{ page }}
          </a>
          <a
            href="#"
            @click.prevent="changePage(currentPage + 1)"
            :class="{
              '!text-gray-400': isLastPage,
              'cursor-not-allowed': isLastPage,
            }"
            class="next-btn relative inline-flex items-center rounded-r-md px-2 py-2 text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['currentPage', 'totalPages']);
const emit = defineEmits(['page-change']);

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

// Number of sibling displayed around current page
const siblingCount = 1;

const siblingsStart = computed(() =>
  Math.max(Math.min(props.currentPage - siblingCount, props.totalPages - siblingCount * 2 - 2), 3)
);

const siblingsEnd = computed(() => {
  return Math.min(
    Math.max(
      props.currentPage + siblingCount,
      // Upper boundary when currentPage is low
      1 + siblingCount * 2 + 2
    ),
    // Less than endPages
    props.totalPages - 2
  );
});

const itemList = computed<(number | string)[]>(() => [
  1,

  // First ellipsis
  ...(siblingsStart.value > 3 ? ['...'] : 2 < props.totalPages - 1 ? [2] : []),

  // Sibling pages
  ...range(siblingsStart.value, siblingsEnd.value),

  // Second ellipsis
  ...(siblingsEnd.value < props.totalPages - 2
    ? ['...']
    : props.totalPages - 1 > 1
    ? [props.totalPages - 1]
    : []),

  props.totalPages,
]);

const changePage = (newPage: number | string) => {
  if (
    newPage !== props.currentPage &&
    newPage !== '...' &&
    +newPage > 0 &&
    +newPage <= props.totalPages
  ) {
    emit('page-change', newPage);
  }
};

const isFirstPage = computed(() => props.currentPage === 1);

const isLastPage = computed(() => props.currentPage === props.totalPages);
</script>
