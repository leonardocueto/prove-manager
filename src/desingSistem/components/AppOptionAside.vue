<template>
  <router-link
    class="flex items-center justify-start gap-2 rounded-md w-full px-2 py-2 hover:shadow-md hover:bg-gray-100 hover:cursor-pointer hover:font-semibold"
    :to="{ name: link }"
  >
    <component :is="iconComponentLeft" :size="size" />
    <transition>
      <p v-if="hide">{{ $t(`${text}`) }}</p>
    </transition>
  </router-link>
</template>
<script lang="ts" setup>
import { computed, defineProps } from "vue";
import TablerIcons from "@/assets/icons";
const props = defineProps<{
  text: string;
  iconComponent?: string;
  size: number;
  hide: boolean;
  link: string;
}>();

const iconComponentLeft = computed(() => {
  return TablerIcons[props.iconComponent as keyof typeof TablerIcons] || null;
});
</script>
<style scoped>
.v-enter-active {
  transition: opacity 1s ease;
}
.v-leave-active {
  transition: opacity 0s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
