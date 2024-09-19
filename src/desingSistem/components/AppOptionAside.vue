<template>
  <div
    class="w-full px-2 hover:cursor-pointer hover:font-semibold"
    :class="hide ? 'justify-start' : ' justify-center'"
  >
    <router-link :to="{ name: link }" class="flex gap-1 px-1">
      <app-icon
        :icon="props.iconComponent"
        size="small"
        :color="active"
        class="pb-1"
      />
      <transition>
        <p v-if="hide">{{ $t(`${text}`) }}</p>
      </transition>
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps, withDefaults } from "vue";
import { AppIcon } from "@/desingSistem";
import { useRoute } from "vue-router";
const props = withDefaults(
  defineProps<{
    text: string;
    iconComponent?: string;
    hide: boolean;
    link: string;
  }>(),
  {}
);

const route = useRoute();
const active = computed(() => {
  return route.name === props.link ? "#2482F7" : "gray";
});
</script>
<style scoped>
@keyframes slideIn {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes slideOut {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}
.v-enter-active {
  transition: opacity 1s ease;
}
.v-leave-active {
  transition: opacity 0s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  animation: slideOut 0.3s forwards;
}

.router-link-active {
  @apply font-bold;
  @apply border-b-2;
  @apply border-primary;
  animation: slideIn 0.3s forwards;
}
</style>
