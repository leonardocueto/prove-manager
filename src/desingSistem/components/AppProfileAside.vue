<template>
  <div class="flex gap-3 items-center">
    <div class="bg-purple-300 rounded-full size-10"></div>
    <template v-if="hide">
      <div class="flex flex-col text-sm">
        <p class="font-bold">{{ name }}</p>
        <p class="text-gray-400">{{ job }}</p>
      </div>
    </template>
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
