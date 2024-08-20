<template>
  <div class="flex flex-col w-full h-full bg-third">
    <div class="flex">
      <app-table :client="personas" :modalShow="modalShow" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { AppTable } from "@/desingSistem";
import { ref } from "vue";

const modalShow = ref(false);

const personas = [
  { nombre: "Ana Perez", email: "ana.perez@gmail.com", ciudad: "Madrid" },
  { nombre: "Juan Quito", email: "ana.perez@gmail.com", ciudad: "Barcelona" },
  { nombre: "Lucía Morales", email: "ana.perez@gmail.com", ciudad: "Valencia" },
  { nombre: "Juan Fontana", email: "ana.perez@gmail.com", ciudad: "Barcelona" },
];
</script>
