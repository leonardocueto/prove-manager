<template>
  <div class="border-b p-2">data</div>
  <div class="flex w-full gap-2 p-2">
    <button
      class="flex gap-2 grow border rounded-md items-center justify-center"
    >
      <component :is="iconEdit" :size="20" />
      <p>Edit</p>
    </button>
    <button class="flex p-1 border rounded-md items-center justify-center">
      <component :is="iconDelete" :size="20" color="red" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import TablerIcons from "@/assets/icons";

const iconEdit = TablerIcons["IconPencil"];
const iconDelete = TablerIcons["IconTrash"];
</script>
