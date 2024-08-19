<template>
  <div class="flex h-12 bg-white justify-between items-center px-4 border-b-2">
    <app-search-topbar />

    <div class="flex gap-2">
      <app-lang-switch />
      <app-logout />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { AppLangSwitch, AppSearchTopbar, AppLogout } from "@/desingSistem/";
</script>
