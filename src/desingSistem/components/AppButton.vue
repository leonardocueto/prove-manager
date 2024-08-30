<template>
  <div class="d-button">
    <button
      :class="[
        'p-2 my-2 w-full rounded-lg text-white text-center',
        buttonClass,
      ]"
      :type="buttonType"
    >
      <slot />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

// Define props directamente
const props = defineProps<{
  type?: "primary" | "secondary";
}>();

const buttonType = computed(() =>
  props.type === "primary" ? "submit" : "button"
);

const buttonClass = computed(() =>
  props.type === "primary" ? "btn-primary" : "btn-secondary"
);
</script>

<style scoped>
.d-button {
  @apply w-full;
}

.btn-primary {
  @apply bg-primary-active;
  @apply text-white;
  @apply hover:bg-[#6e7ad6];
  @apply transition-all;
}

.btn-secondary {
  @apply bg-secondary;
  @apply text-black;
  @apply hover:bg-slate-200;
}
</style>
