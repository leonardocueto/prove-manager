<template>
  <div class="flex gap-2">
    <div ref="dropdown" class="relative inline-block text-left">
      <button
        @click="toggle"
        @mouseover="hoverIcon = true"
        @mouseleave="hoverIcon = false"
        class="flex gap-2 items-center justify-evenly hover:shadow-sm p-2"
        :class="[
          text
            ? 'w-32 rounded-xl bg-secondary hover:bg-gray-100 mr-6'
            : ' rounded-full hover:bg-gray-50',
        ]"
      >
        <p v-if="text">{{ $t(`${text}`) }}</p>
        <component
          :is="iconComponent"
          :size="20"
          :color="hoverIcon ? 'black' : 'gray'"
        />
      </button>
      <ul
        v-if="isOpen"
        class="flex flex-col items-left absolute right-4 w-48 bg-white border border-gray-300 rounded shadow-lg z-10"
      >
        <li
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer relative inline-block text-left"
        >
          <slot name="top" />
        </li>
        <li
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer relative inline-block text-left"
        >
          <slot name="down" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, defineProps } from "vue";
import TablerIcons from "@/assets/icons";

defineProps<{
  text?: string;
}>();

const iconComponent = TablerIcons["IconDotsVertical"];
const isOpen = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};

const hoverIcon = ref(false);
const dropdown = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
