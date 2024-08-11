<template>
  <aside
    class="flex flex-col gap-8 px-4 py-8 items-start justify-between h-screen bg-white rounded-lg transition-all duration-300"
    :style="{ width: tamaño }"
  >
    <div class="w-full">
      <div class="flex justify-start items-center gap-2 w-full p-1 rounded-md">
        <slot name="icon" />
      </div>
      <div class="flex flex-col gap-4 w-full">
        <slot name="option" />
      </div>
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
    tamaño.value = newVal ? "15rem" : "6.5rem";
  }
);
</script>
