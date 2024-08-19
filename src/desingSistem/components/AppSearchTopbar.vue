<template>
  <div class="relative">
    <div
      class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
    >
      <component :is="iconComponent" size="25"></component>
    </div>

    <input
      type="text"
      :placeholder="$t(`search`)"
      class="pl-10 py-1 px-2 rounded-lg text-base w-full border"
    />
  </div>
</template>
<script setup lang="ts">
import TablerIcons from "@/assets/icons";
const iconComponent = TablerIcons["IconSearch"];
</script>
