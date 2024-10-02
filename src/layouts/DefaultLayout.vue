<template>
  <div class="flex h-screen">
    <sidebar-component></sidebar-component>

    <div class="flex flex-col flex-1">
      <topbar-component />

      <div class="overflow-y-auto px-2 pt-2">
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
