<template>
  <div class="w-full px-6">
    <div
      class="flex items-center justify-start w-full py-4 font-bold text-xl px-2 text-gray-600"
    >
      <p class="flex grow gap-2 items-center">
        {{ $t("name") }}
        <component
          :is="iconRight"
          :key="iconRight"
          :size="25"
          color="grey"
          stroke-width="3"
          class="rounded-lg cursor-pointer p-1"
        />
      </p>
      <p class="flex gap-2 grow items-center">
        {{ $t("mail") }}
        <component
          :is="iconRight"
          :key="iconRight"
          :size="25"
          color="grey"
          stroke-width="3"
          class="rounded-lg cursor-pointer p-1"
        />
      </p>
      <p class="flex gap-2 grow items-center">
        {{ $t("city") }}
        <component
          :is="iconRight"
          :key="iconRight"
          :size="25"
          color="grey"
          stroke-width="3"
          class="rounded-lg cursor-pointer p-1"
        />
      </p>
    </div>
    <div class="rounded-lg bg-white">
      <table border="1" class="w-full border-collapse">
        <tbody>
          <tr
            v-for="(data, index) in client"
            :key="index"
            class="cursor-pointer hover:bg-slate-300 border-b-2"
            @click="emitToggleModal"
          >
            <td class="w-1/3 text-left py-3 px-2">{{ data.nombre }}</td>
            <td class="w-1/3 text-left py-3 px-2">{{ data.email }}</td>
            <td class="w-1/3 text-left py-3 px-2">{{ data.ciudad }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import TablerIcons from "@/assets/icons";

const iconRight = TablerIcons["IconArrowsSort"];
interface Persona {
  nombre: string;
  email: string;
  ciudad: string;
}

const props = defineProps<{
  client: Array<Persona>;
}>();

const emit = defineEmits(["toggleModal"]);

const emitToggleModal = () => {
  emit("toggleModal");
};
</script>
