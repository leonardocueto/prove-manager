<template>
  <div class="flex max-h-screen overflow-hidden bg-third">
    <sidebar-component></sidebar-component>
    <div class="w-full">
      <topbar-component />
      <div class="h-full">
        <div class="flex flex-col size-full bg-white">
          <div class="flex flex-col border m-6 rounded-lg overflow-hidden">
            <main class="min-w-full min-h-full">
              <slot />
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SidebarComponent from "@/layouts/partials/SidebarComponent.vue";
import TopbarComponent from "./partials/TopbarComponent.vue";
</script>
<style lang="scss" scoped></style>
