<template>
  <div class="flex max-h-screen overflow-hidden bg-bg-d-layout">
    <sidebar-component></sidebar-component>
    <div class="w-full">
      <topbar-component />
      <div class="h-full">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SidebarComponent from "@/layouts/partials/SidebarComponent.vue";
import TopbarComponent from "./partials/TopbarComponent.vue";
</script>
<style lang="scss" scoped></style>
