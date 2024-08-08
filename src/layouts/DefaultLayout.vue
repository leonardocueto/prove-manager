<template>
  <div class="flex max-h-screen overflow-hidden bg-bg-default-login-gradient">
    <sidebar-component></sidebar-component>
    <div class="h-full">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import SidebarComponent from "@/layouts/partials/SidebarComponent.vue";
</script>
<style lang="scss" scoped></style>
