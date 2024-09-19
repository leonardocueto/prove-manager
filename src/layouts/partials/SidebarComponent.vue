<template>
  <app-aside :hide="showMenu">
    <template #icon>
      <transition>
        <div class="w-10">
          <app-icon
            :icon="iconComponentMenu"
            :key="iconComponentMenu"
            size="medium"
            color="white"
            stroke-width="3"
            class="rounded-lg cursor-pointer bg-gray-500 hover:bg-gray-400 p-1 ml-2"
            @click="toggleMenu"
          />
        </div>
      </transition>
    </template>
    <template #option>
      <div class="flex flex-col gap-4 w-full">
        <app-option-aside
          v-for="option in options"
          :key="option.text"
          :text="option.text"
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
import {
  AppAside,
  AppOptionAside,
  AppProfileAside,
  AppIcon,
} from "@/desingSistem";

const iconComponentMenu = computed(() =>
  showMenu.value ? "IconArrowBarToLeft" : "IconArrowBarToRight"
);

const options = [
  { text: "dashboard", link: "dashboard", icon: "IconHome" },
  { text: "clients", link: "clients", icon: "IconUser" },
  { text: "items", link: "items", icon: "IconClipboardList" },
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
