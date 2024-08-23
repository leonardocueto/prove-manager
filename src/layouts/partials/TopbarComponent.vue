<template>
  <div class="flex h-min-12 bg-white justify-between items-center border-b">
    <div>
      <h1 class="text-xl font-bold px-6 py-5">{{ $t(`${title}`) }}</h1>
    </div>

    <app-button-modal text="options">
      <template #top>
        <app-lang-switch />
      </template>
      <template #down>
        <app-logout />
      </template>
    </app-button-modal>
  </div>
</template>
<script lang="ts" setup>
import { AppLangSwitch, AppLogout, AppButtonModal } from "@/desingSistem/";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const title = computed(() => String(route.name));
</script>
