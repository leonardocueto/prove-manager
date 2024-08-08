<template>
  <div
    class="flex items-center justify-start gap-2 rounded-md w-full px-2 py-2 hover:shadow-md hover:bg-blue-200 hover:cursor-pointer hover:font-semibold"
  >
    <component :is="iconComponent" :size="size" />
    <p>{{ text }}</p>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{
  text: string;
  iconComponent: {
    type: object;
    required: true;
  };
  size: number;
}>();
</script>
