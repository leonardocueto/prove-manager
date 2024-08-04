<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :height="height"
    viewBox="0 -960 960 960"
    :width="width"
    fill="#5f6368"
  >
    <path
      d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
    />
  </svg>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps<{
  height?: string | number;
  width?: string | number;
}>();

const height = props.height ?? "24px";
const width = props.height ?? "24px";
</script>
