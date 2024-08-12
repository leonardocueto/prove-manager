<template>
  <div class="flex gap-3 items-center">
    <div class="bg-purple-300 rounded-full min-w-10 min-h-10"></div>
    <transition>
      <div v-if="hide" class="flex flex-col text-sm truncate">
        <p class="font-bold">{{ name }}</p>
        <p class="text-gray-400">{{ job }}</p>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{
  name: string;
  job: string;
  hide: boolean;
}>();
</script>

<style scoped>
.v-enter-active {
  transition: opacity 1s ease;
}
.v-leave-active {
  transition: opacity 0s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
