<template>
  <div class="flex h-min-12 bg-white justify-between items-center border-b">
    <div>
      <h1 class="text-xl font-bold px-6 py-5">{{ $t(`${title}`) }}</h1>
    </div>

    <div class="flex gap-2">
      <div ref="dropdown" class="relative inline-block text-left z-20">
        <button
          @click="toggle"
          class="flex gap-2 w-32 items-center justify-evenly bg-secondary hover:bg-gray-200 hover:shadow-sm p-2 rounded-xl mr-6"
        >
          <p>Options</p>
          <component :is="iconComponent" :size="20" />
        </button>
        <ul
          v-if="isOpen"
          class="absolute right-0 w-48 bg-white border border-gray-300 rounded shadow-lg"
        >
          <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <app-lang-switch />
          </li>
          <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <app-logout />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { AppLangSwitch, AppLogout } from "@/desingSistem/";

import { computed } from "vue";
import { useRoute } from "vue-router";

import TablerIcons from "@/assets/icons";
const iconComponent = TablerIcons["IconDotsVertical"];

const isOpen = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};
const route = useRoute();
const dropdown = ref<HTMLElement | null>(null);
const title = computed(() => route.name);

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
