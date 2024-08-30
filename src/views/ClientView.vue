<template>
  <div class="flex flex-col size-full bg-white">
    <div class="flex flex-col border m-6 rounded-lg overflow-hidden">
      <nav class="flex items-center justify-between w-full bg-white">
        <h2 class="py-5 px-6 font-semibold text-lg">
          {{ $t("list provider") }}
        </h2>
        <div class="flex items-center w-30 max-h-full">
          <app-button-add @click="isCreateModalOpen = true">{{
            $t("add provider")
          }}</app-button-add>
        </div>
      </nav>
      <main class="min-w-full min-h-full">
        <datatable
          :value="listProviders"
          tableStyle="min-width: 50rem"
          scrollHeight="800px"
          paginator
          removableSort
          :rows="10"
          :rowsPerPageOptions="[10, 20, 30, 50]"
        >
          <column field="name" :header="$t('name')" sortable>
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </column>
          <column field="email" :header="$t('mail')" sortable>
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
          </column>
          <column field="city" :header="$t('city')" sortable>
            <template #body="slotProps">
              {{ slotProps.data.city }}
            </template>
          </column>
          <column class="w-20">
            <template #body="slotProps">
              <app-button-modal class="z-10">
                <template #top>
                  <div
                    class="flex gap-2 relative z-20"
                    @click="updateModalForm(slotProps.data.id)"
                  >
                    <component :is="iconEdit" size="20" color="gray" />
                    {{ $t("edit") }}
                  </div>
                </template>
                <template #down>
                  <div
                    class="flex gap-2 relative z-20"
                    @click="deleteProvider(slotProps.data.id)"
                  >
                    <component :is="iconDelete" size="20" color="gray" />
                    {{ $t("delete") }}
                  </div>
                </template>
              </app-button-modal>
            </template>
          </column>
        </datatable>
      </main>
      <!--Create Provider Modal-->
      <app-fade-modal :isVisible="isCreateModalOpen">
        <div class="bg-white min-w-[500px] min-h-96 rounded-2xl p-6">
          <div class="pb-4">
            <h1 class="font-bold text-2xl">{{ $t("add provider") }}</h1>
          </div>
          <app-form @submit="handleSubmit(formValues)">
            <app-field
              v-model="formValues.name"
              id="Name"
              label="name"
              type="text"
              placeholder="enter name"
            />
            <app-field
              v-model="formValues.email"
              id="mail"
              label="mail"
              type="text"
              placeholder="enter mail"
            />
            <app-field
              v-model="formValues.city"
              id="city"
              label="city"
              type="text"
              placeholder="enter city"
            />
            <div class="flex gap-2">
              <app-button type="secondary" @click="isCreateModalOpen = false"
                >salir</app-button
              >
              <app-button type="primary">Aceptar</app-button>
            </div>
          </app-form>
        </div>
      </app-fade-modal>
      <!---->

      <!-- Update Provider Modal -->
      <app-fade-modal :isVisible="isUpdateModalOpen">
        <div class="bg-white min-w-[500px] min-h-96 rounded-2xl p-6">
          <div class="pb-4">
            <h1 class="font-bold text-2xl">{{ $t("edit provider") }}</h1>
          </div>
          <app-form @submit="handleUpdateValues(selectedProvider)">
            <app-field
              v-model="selectedProvider.name"
              id="Name"
              label="name"
              type="text"
              placeholder="enter name"
            />
            <app-field
              v-model="selectedProvider.email"
              id="mail"
              label="mail"
              type="text"
              placeholder="enter mail"
            />
            <app-field
              v-model="selectedProvider.city"
              id="city"
              label="city"
              type="text"
              placeholder="enter city"
            />
            <div class="flex gap-2">
              <app-button type="secondary" @click="isUpdateModalOpen = false"
                >salir</app-button
              >
              <app-button type="primary">Aceptar</app-button>
            </div>
          </app-form>
        </div>
      </app-fade-modal>
      <!-- -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import TablerIcons from "@/assets/icons";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {
  AppButtonModal,
  AppButtonAdd,
  AppFadeModal,
  AppForm,
  AppButton,
  AppField,
} from "@/desingSistem";
import useProviders from "@/composables/useProviders";

const {
  getProviders,
  listProviders,
  handleSubmit,
  formValues,
  isCreateModalOpen,
  deleteProvider,
  isUpdateModalOpen,
  updateModalForm,
  selectedProvider,
  handleUpdateValues,
} = useProviders();

const iconEdit = TablerIcons["IconPencil"];
const iconDelete = TablerIcons["IconTrash"];
const datatable = DataTable;
const column = Column;
</script>
