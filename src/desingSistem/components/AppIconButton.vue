<template>
  <div class="p-1 rounded-full bg-white border hover:bg-third">
    <a :href="href" target="_blank" rel="noopener noreferrer" class=""
      ><slot
    /></a>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{ href: string }>();
</script>
<style></style>
