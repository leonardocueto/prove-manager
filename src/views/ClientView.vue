<template>
  <div class="flex flex-col w-full h-full bg-terceary">
    <app-topbar-view title="client" />
    <div class="flex h-full">
      <app-table
        :client="personas"
        :modalShow="modalShow"
        @toggleModal="toggleModal"
      />
      <app-modal-right :modalShow="modalShow" @toggleModal="toggleModal">
        <app-update-right />
      </app-modal-right>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  AppTopbarView,
  AppModalRight,
  AppUpdateRight,
  AppTable,
} from "@/desingSistem";
import { ref } from "vue";

const modalShow = ref(false);

const personas = [
  { nombre: "Ana Perez", email: "ana.perez@gmail.com", ciudad: "Madrid" },
  { nombre: "Juan Quito", email: "ana.perez@gmail.com", ciudad: "Barcelona" },
  { nombre: "Lucía Morales", email: "ana.perez@gmail.com", ciudad: "Valencia" },
  { nombre: "Juan Fontana", email: "ana.perez@gmail.com", ciudad: "Barcelona" },
];

const toggleModal = () => {
  modalShow.value = !modalShow.value;
};
</script>
