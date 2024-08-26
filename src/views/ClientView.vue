<template>
  <div class="flex flex-col w-full h-full bg-white">
    <div class="flex">
      <app-table :items="personas" :modalShow="modalShow" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { AppTable } from "@/desingSistem";
import { ref } from "vue";
import { Provider } from "@/interface/providerInterface";
const modalShow = ref(false);

const personas: Provider = [
  { nombre: "Ana Perez", email: "ana.perez@gmail.com", ciudad: "Madrid" },
  { nombre: "Juan Quito", email: "ana.perez@gmail.com", ciudad: "Barcelona" },
  { nombre: "Lucía Morales", email: "ana.perez@gmail.com", ciudad: "Valencia" },
  { nombre: "Juan Fontana", email: "ana.perez@gmail.com", ciudad: "Barcelona" },
  { nombre: "Juan Fontana", email: "ana.perez@gmail.com", ciudad: "Barcelona" },
];
</script>
