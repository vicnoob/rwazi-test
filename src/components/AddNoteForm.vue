<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Overlay -->
    <div @click="$emit('close')" class="overlay fixed inset-0 bg-black opacity-50"></div>
    <!-- Modal Content -->
    <div class="bg-white p-6 rounded-lg z-10 w-[600px]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
