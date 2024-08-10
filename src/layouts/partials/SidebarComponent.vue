<template>
  <app-aside :hide="showMenu">
    <template #icon>
      <div
        class="flex justify-between items-center gap-2 w-full p-1 rounded-md bg-blue-200"
      >
        <icon-brand-tinder
          :size="30"
          color="white"
          stroke-width="3"
          class="bg-blue-200"
        />
        <icon-menu-2
          :size="30"
          color="white"
          stroke-width="3"
          class="rounded-lg cursor-pointer hover:bg-blue-400 p-1"
          @click="toggleMenu"
        />
      </div>
    </template>
    <template #option>
      <div class="flex flex-col gap-1 w-full">
        <app-option-aside
          v-for="option in options"
          :key="option.text"
          :text="option.text"
          :size="option.size"
          :iconComponent="option.icon"
          :hide="showMenu"
        />
      </div>
    </template>
  </app-aside>
</template>
<script lang="ts" setup>
import { IconBrandTinder, IconMenu2 } from "@tabler/icons-vue";
import { AppAside, AppOptionAside } from "@/desingSistem";
import { ref } from "vue";

const options = [
  { text: "Dashboard", icon: "IconHome", size: 25 },
  { text: "Post", icon: "IconClipboard", size: 25 },
  { text: "test", icon: "IconSticker", size: 25 },
];

const showMenu = ref(true);

const toggleMenu = () => {
  console.log("se presiono");
  showMenu.value = !showMenu.value;
};
</script>
