<template>
  <div class="border-b p-2">data</div>
  <div class="flex w-full gap-2 p-2">
    <button
      class="flex gap-2 grow border rounded-md items-center justify-center"
    >
      <app-icon icon="IconPencil" size="small" />
      <p>Edit</p>
    </button>
    <button class="flex p-1 border rounded-md items-center justify-center">
      <app-icon icon="IconTrash" size="small" color="red" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { AppIcon } from "@/desingSistem";
</script>
