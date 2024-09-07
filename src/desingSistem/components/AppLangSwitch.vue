<template>
  <div ref="dropdown" class="relative inline-block text-left z-10 w-full">
    <button @click="toggle" class="w-full rounded flex gap-2 items-center p-2">
      <app-icon icon="IconWorld" size="small" />
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
import { ref, onMounted, onUnmounted } from "vue";
import { AppIcon } from "@/desingSistem";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

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
