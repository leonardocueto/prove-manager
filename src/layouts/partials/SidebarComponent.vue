<template>
  <app-aside :hide="showMenu">
    <template #icon>
      <transition>
        <component
          :is="iconComponentMenu"
          :key="iconComponentMenu"
          :size="30"
          color="white"
          stroke-width="3"
          class="rounded-lg cursor-pointer bg-gray-500 hover:bg-gray-400 p-1 ml-2"
          @click="toggleMenu"
        />
      </transition>
    </template>
    <template #option>
      <div class="flex flex-col gap-4 w-full">
        <app-option-aside
          v-for="option in options"
          :key="option.text"
          :text="option.text"
          :size="option.size"
          :link="option.link"
          :iconComponent="option.icon"
          :hide="showMenu"
        />
      </div>
    </template>
    <template #profile>
      <app-profile-aside
        name="Leonardo Cueto"
        job="Frontend developer"
        :hide="showMenu"
      />
    </template>
  </app-aside>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { AppAside, AppOptionAside, AppProfileAside } from "@/desingSistem";
import TablerIcons from "@/assets/icons";

const iconComponentMenu = computed(() =>
  showMenu.value
    ? TablerIcons["IconArrowBarToLeft"]
    : TablerIcons["IconArrowBarToRight"]
);

const options = [
  { text: "dashboard", link: "dashboard", icon: "IconHome", size: 25 },
  { text: "providers", link: "providers", icon: "IconUser", size: 25 },
  { text: "items", link: "items", icon: "IconClipboardList", size: 25 },
];

const showMenu = ref(true);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
  showMenu.value;
};
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-active {
  position: absolute;
}
</style>
