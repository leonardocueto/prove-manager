<template>
  <transition>
    <div v-show="modalShow" class="w-64 h-full bg-white">
      <div class="flex flex-col rounded-r-lg h-full">
        <div
          class="flex items-center border-b p-2 cursor-pointer"
          @click="emitToggleModal"
        >
          <component
            :is="iconLeft"
            :key="iconLeft"
            :size="30"
            color="grey"
            stroke-width="3"
            class="rounded-lg cursor-pointer p-1"
          />
          <p>Back</p>
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import { defineEmits } from "vue";
import TablerIcons from "@/assets/icons";
const emit = defineEmits(["toggleModal"]);

const emitToggleModal = () => {
  emit("toggleModal");
};
const iconLeft = TablerIcons["IconArrowLeft"];
defineProps<{
  modalShow: boolean;
}>();
</script>
<style scoped>
.v-enter-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from {
  transform: translateX(100%);
}
.v-leave-to {
  transform: translateX(100%);
}
</style>
