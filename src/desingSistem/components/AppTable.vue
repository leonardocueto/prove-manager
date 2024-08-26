<template>
  <div class="w-full">
    <div class="border m-6 rounded-lg">
      <div class="flex items-center justify-between w-full bg-white">
        <h2 class="py-5 px-6 font-semibold text-lg">Listado</h2>
        <div class="flex items-center w-30 max-h-full">
          <app-button-add @click="addUser"> Crear cliente </app-button-add>
        </div>
        <app-fade-modal :isVisible="isCreateModalOpen">
          <div class="bg-white">
            <p>test</p>
          </div>
        </app-fade-modal>
      </div>
      <div
        class="flex items-center justify-start w-full py-4 px-6 text-xs text-gray-600 bg-third"
      >
        <p
          v-for="header in headers"
          class="flex gap-2 grow items-center"
          :key="header.title"
        >
          {{ $t(`${header.title}`) }}

          <component
            :is="iconRight"
            :key="header.title"
            :size="22"
            color="grey"
            stroke-width="3"
            class="rounded-lg cursor-pointer p-1"
          />
        </p>
      </div>
      <div class="rounded-lg bg-white">
        <table class="w-full">
          <tbody>
            <tr
              v-for="(data, index) in client"
              :key="index"
              class="border-t"
              @click="emitToggleModal"
            >
              <td class="w-1/3 text-left py-3 px-5 grow">{{ data.nombre }}</td>
              <td class="w-1/3 text-left py-3 grow">{{ data.email }}</td>
              <td class="w-1/3 text-left py-3 pl-3 grow">{{ data.ciudad }}</td>
              <td class="pr-2">
                <app-button-modal>
                  <template #top>
                    <div class="flex gap-2 relative z-10">
                      <component :is="iconEdit" size="20" color="#2482F7" />
                      {{ $t("edit") }}
                    </div>
                  </template>
                  <template #down>
                    <div class="flex gap-2 relative z-10">
                      <component :is="iconDelete" size="20" color="red" />
                      {{ $t("delete") }}
                    </div>
                  </template>
                </app-button-modal>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";
import { AppButtonModal, AppButtonAdd, AppFadeModal } from "@/desingSistem";
import TablerIcons from "@/assets/icons";
const isCreateModalOpen = ref(false);
import getProviders from "@/composables/useProviders";

const addUser = async () => {
  await getProviders();
};
const headers: { title: string }[] = [
  { title: "name" },
  { title: "mail" },
  { title: "city" },
  { title: "phone" },
  { title: "ivaCondition" },
  { title: "status" },
];

const iconRight = TablerIcons["IconArrowsSort"];
const iconEdit = TablerIcons["IconPencil"];
const iconDelete = TablerIcons["IconTrash"];
interface Persona {
  nombre: string;
  email: string;
  ciudad: string;
  phonePrimary: string;
  status: string;
  ivaCondition: string;
}

defineProps<{
  client: Array<Persona>;
}>();

const emit = defineEmits(["toggleModal"]);

const emitToggleModal = () => {
  emit("toggleModal");
};
</script>
