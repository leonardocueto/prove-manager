<template>
  <div ref="dropdown" class="relative inline-block text-left z-10">
    <button
      @click="toggle"
      class="p-2 rounded flex gap-2 items-center px-4 py-2"
    >
      <component :is="iconComponent" :size="30" color="black" />
      {{ $t("language") }}
    </button>
    <ul
      v-if="isOpen"
      class="absolute right-32 w-48 bg-white border border-gray-300 rounded shadow-lg"
    >
      <li
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        @click="switchLanguage('ES')"
      >
        ES
      </li>
      <li
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        @click="switchLanguage('EN')"
      >
        EN
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import TablerIcons from "@/assets/icons";
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const iconComponent = TablerIcons["IconWorld"];
const isOpen = ref(false);
const dropdown = ref<HTMLElement | null>(null);
const switchLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem("language", lang);
  isOpen.value = false;
};

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const savedLanguage = localStorage.getItem("language") ?? "ES";
locale.value = savedLanguage;

const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  const savedLanguage = localStorage.getItem("language") ?? "ES";
  locale.value = savedLanguage;
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
