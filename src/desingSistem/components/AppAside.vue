<template>
  <aside
    class="flex flex-col gap-8 px-2 py-8 justify-between h-screen bg-secondary transition-all duration-300 border-r"
    :style="{ width: tamaño }"
  >
    <div class="flex flex-col w-full gap-6">
      <slot name="icon" />

      <slot name="option" />
    </div>
    <div>
      <slot name="profile" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps } from "vue";
const props = defineProps<{
  hide: boolean;
}>();

const tamaño = ref("15rem");
watch(
  () => props.hide,
  (newVal) => {
    tamaño.value = newVal ? "15rem" : "4.5rem";
  }
);
</script>
