<template>
  <div class="flex h-12 bg-blue-200 justify-between items-center px-4">
    <app-search-topbar />

    <div>
      <app-lang-switch />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { AppLangSwitch, AppSearchTopbar } from "@/desingSistem/";
</script>
