<template>
  <div
    class="flex items-center justify-start gap-2 rounded-md w-full px-2 py-2 hover:shadow-md hover:bg-blue-200 hover:cursor-pointer hover:font-semibold"
  >
    <component :is="iconComponentLeft" :size="size" />
    <template v-if="hide">
      <p>{{ text }}</p>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from "vue";
import * as TablerIcons from "@tabler/icons-vue";
const props = defineProps<{
  text: string;
  iconComponent?: string;
  size: number;
  hide: boolean;
}>();

const iconComponentLeft = computed(() => {
  return TablerIcons[props.iconComponent as keyof typeof TablerIcons] || null;
});
</script>
