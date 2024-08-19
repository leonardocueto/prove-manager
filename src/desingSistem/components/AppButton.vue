<template>
  <div class="d-button">
    <button
      :class="['p-2 my-2 w-full rounded-lg text-white text-center', type]"
      type="submit"
    >
      <slot />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";

withDefaults(
  defineProps<{
    type: "primary" | "secondary" | "danger";
  }>(),
  {
    type: "primary",
  }
);
</script>

<style scoped>
.d-button {
  @apply w-full;
}

.d-button .primary {
  @apply bg-primary;
}

.d-button .secondary {
  @apply bg-primary-active;
}

.d-button .danger {
  @apply bg-[#ff4d50];
}
</style>
