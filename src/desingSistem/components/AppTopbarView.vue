<template>
  <div
    class="flex items-center justify-between bg-white w-full px-6 py-2 border-b-2"
  >
    <h1 class="text-2xl font-semibold">{{ $t(title) }}</h1>
    <div class="flex gap-2 items-center">
      <component
        :is="iconAdd"
        :size="30"
        color="white"
        class="border rounded-md bg-[#169bd6] hover:bg-[#3E4685] focus:border-[#169bd6] m-2 cursor-pointer"
      />
      <app-search-topbar />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { AppSearchTopbar } from "@/desingSistem";
import TablerIcons from "@/assets/icons";

const iconAdd = TablerIcons["IconPlus"];
defineProps<{
  title: string;
}>();
</script>
