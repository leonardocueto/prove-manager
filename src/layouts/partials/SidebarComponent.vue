<template>
  <app-aside>
    <template #icon>
      <icon-brand-tinder :size="30" color="white" stroke-width="3" />
      <p>Desplegar</p>
    </template>

    <template #option>
      <app-option-aside text="Dashboard" :iconComponent="IconHome" size="30">
      </app-option-aside>
      <app-option-aside
        text="Post"
        :iconComponent="IconFileDescription"
        size="30"
      >
      </app-option-aside>
      <app-option-aside text="Test" :iconComponent="IconSticker" size="30">
      </app-option-aside>
    </template>
  </app-aside>
</template>
<script lang="ts" setup>
import {
  IconBrandTinder,
  IconHome,
  IconFileDescription,
  IconSticker,
} from "@tabler/icons-vue";
import { AppAside, AppOptionAside } from "@/desingSistem";
//nota
// falta componetizar, el aside solamente deberia tener un slot
//y todo lo que este internamente tambien
//utilizar sidebarcomponent exactamente igual que LoginView
</script>
