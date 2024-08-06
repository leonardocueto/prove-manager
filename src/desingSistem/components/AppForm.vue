<template>
  <form class="w-full" @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>
<script lang="ts" setup>
import { defineEmits } from "vue";
const emit = defineEmits(["submit"]);

const handleSubmit = () => {
  emit("submit");
};
</script>
