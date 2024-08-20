<template>
  <div
    class="w-full px-2 hover:cursor-pointer hover:font-semibold"
    :class="hide ? 'justify-start' : ' justify-center'"
  >
    <router-link :to="{ name: link }" class="flex gap-2 px-1">
      <component :is="iconComponentLeft" :size="size" :color="active" />
      <transition>
        <p v-if="hide">{{ $t(`${text}`) }}</p>
      </transition>
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from "vue";
import TablerIcons from "@/assets/icons";
import { useRoute } from "vue-router";
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

const route = useRoute();
const active = computed(() => {
  return route.name === props.link ? "#2482F7" : "gray";
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

.router-link-active {
  @apply font-bold;
  @apply border-b-2;
  @apply border-primary;
}
</style>
