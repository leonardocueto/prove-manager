<template>
  <div
    class="flex justify-center items-center py-1 px-2 w-20 rounded-md"
    :class="status == 'active' ? 'bg-green-200' : 'bg-red-200'"
  >
    <p>
      {{ $t(status) }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{
  status: string;
}>();
</script>
