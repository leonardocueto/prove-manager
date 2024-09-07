<template>
  <div>
    <component
      :is="iconComponent"
      :key="iconComponent"
      :size="size"
      :color="color"
    />
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, computed } from "vue";
import TablerIcons from "@/assets/icons";

const props = withDefaults(
  defineProps<{
    icon: string;
    size?: "small" | "medium" | "large";
    color?: string;
  }>(),
  {
    icon: "IconHome",
    size: "medium",
    color: "gray",
  }
);

const iconComponent = computed(
  () => TablerIcons[props.icon as keyof typeof TablerIcons]
);

const size = computed(() => {
  switch (props.size) {
    case "small":
      return 20;
    case "medium":
      return 30;
    case "large":
      return 40;
    default:
      return 30;
  }
});
</script>

<style lang="scss" scoped></style>
