<template>
  <div class="d-button">
    <button
      :class="[
        'p-2 my-2 w-full rounded-lg text-white',
        'text-center flex justify-center items-center',
        buttonClass,
        { disabled: props.disabled },
      ]"
      :type="nativeType"
      :disabled="props.disabled"
    >
      <div v-if="loading" class="animate-spin w-5">
        <app-icon icon="IconLoader2" size="small" color="white" />
      </div>
      <slot v-else />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults } from "vue";
import AppIcon from "@/desingSistem/components/AppIcon.vue";

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    type?: "primary" | "secondary";
    nativeType?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    type: "primary",
    loading: false,
    nativeType: "button",
    disabled: false,
  }
);

const buttonClass = computed(() => `btn-${props.type}`);
</script>

<style scoped>
.d-button {
  @apply w-full;

  .disabled {
    @apply cursor-not-allowed;
    @apply opacity-50;
  }
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
