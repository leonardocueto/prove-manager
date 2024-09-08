<template>
  <data-table
    v-model:filters="filters"
    :value="listProviders"
    :loading="loadingTable"
    :rows="10"
    :rowsPerPageOptions="[10, 20, 30, 50]"
    :globalFilterFields="['name', 'email', 'status']"
    tableStyle="min-width: 50rem"
    scrollHeight="min-height: 50rem"
    paginator
    removableSort
  >
    <template #header>
      <nav class="flex items-center justify-between w-full">
        <h2 class="font-semibold text-xl text-gray-800">
          {{ $t("list provider") }}
        </h2>
        <div class="flex items-center space-x-4">
          <app-button-add @click="openModal">
            {{ $t("add provider") }}
          </app-button-add>
          <icon-field class="relative flex items-center w-64">
            <app-icon
              icon="IconSearch"
              size="small"
              class="absolute left-3 text-gray-500"
            />
            <input-text
              v-model="filters['global'].value"
              :placeholder="$t('search')"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </icon-field>
        </div>
      </nav>
    </template>
    <template #empty> {{ $t("providers not found") }} </template>
    <template #loading>
      <app-icon class="animate-spin" icon="IconLoader2" size="large" />
    </template>
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
    <column field="status" :header="$t('status')" sortable>
      <template #body="slotProps">
        <app-state :status="slotProps.data.status" />
      </template>
    </column>
    <column class="w-20 overflow-visible">
      <template #body="slotProps">
        <button-p
          type="button"
          class="rounded-full hover:bg-gray-50 p-2"
          @click="toggle"
        >
          <app-icon
            icon="IconDotsVertical"
            size="small"
            :color="hoverIcon ? 'black' : 'gray'"
          ></app-icon>
        </button-p>
        <popover ref="op">
          <div class="flex flex-col gap-4">
            <div>
              <ul class="list-none p-0 m-0 flex flex-col">
                <li
                  class="px-3 py-2 hover:bg-gray-100 cursor-pointer relative inline-block text-left rounded-md"
                >
                  <div
                    class="flex gap-2 relative z-20"
                    @click="openModal({ id: slotProps.data.id })"
                  >
                    <app-icon icon="IconPencil" size="small" />
                    {{ $t("edit") }}
                  </div>
                </li>
                <li
                  class="px-3 py-2 hover:bg-gray-100 cursor-pointer relative inline-block text-left rounded-md"
                >
                  <div class="flex gap-2 relative z-20">
                    <app-icon icon="IconTrash" size="small" />
                    <button-p
                      outlined
                      :label="$t('delete')"
                      class="flex justify-start w-full"
                      @click="confirmDelete($event, slotProps.data.id)"
                    ></button-p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </popover>
      </template>
    </column>
  </data-table>

  <!--Create Provider Modal-->
  <app-fade-modal :isVisible="showModal">
    <div class="bg-white min-w-[500px] min-h-96 rounded-2xl p-6">
      <div class="pb-4">
        <h1 class="font-bold text-2xl pb-4">{{ $t(titleModal) }}</h1>

        <provider-form
          :values="formValues"
          :loading="loadingForm"
          @close="closeModal"
          @submit="onSubmit"
        ></provider-form>
      </div>
    </div>
  </app-fade-modal>
  <!---->
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { IProvider } from "@/interface/provider.interface";
import { AppButtonAdd, AppFadeModal, AppState, AppIcon } from "@/desingSistem";
import ProviderForm from "@/components/Forms/ProviderForm.vue";

import { FilterMatchMode } from "@primevue/core/api";
import Popover from "primevue/popover";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import Button from "primevue/button";

import useProviders from "@/composables/useProviders";
import Alert from "@/utils/alert";

const { listProviders, findProvider, addProvider, editProvider, getProviders } =
  useProviders();

const { alert, confirmDelete } = Alert();

const buttonP = Button;

const hoverIcon = ref(false);
const op = ref();
const showModal = ref<boolean>(false);
const loadingTable = ref<boolean>(false);
const loadingForm = ref<boolean>(false);
const titleModal = ref("");
const formValues = ref<IProvider>({
  ivaCondition: "IVA_RESPONSABLE",
  name: "",
  email: "",
  type: "provider",
  status: "active",
});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const toggle = (event: MouseEvent) => {
  op.value.toggle(event);
};
const openModal = ({ id }: { id?: string | number }) => {
  if (id) {
    titleModal.value = "edit provider";
    formValues.value = findProvider(id) as IProvider;
  } else {
    titleModal.value = "add provider";
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  formValues.value = {
    ivaCondition: "IVA_RESPONSABLE",
    name: "",
    email: "",
    type: "provider",
    status: "active",
  };
};

const onSubmit = async (value: IProvider) => {
  try {
    loadingForm.value = true;

    if (value.id) {
      await editProvider(value);
    } else {
      await addProvider(value);
    }
    alert({
      severity: "success",
      summary: "Success",
      detail: "",
    });
  } catch (error) {
    alert({
      severity: "error",
      summary: "Error",
      detail: (error as Error).message,
    });
  } finally {
    loadingForm.value = false;
    closeModal();
  }
};

onMounted(async () => {
  try {
    loadingTable.value = true;
    await getProviders();
  } catch (error) {
    alert({
      severity: "error",
      summary: "Error",
      detail: (error as Error).message,
    });
  } finally {
    loadingTable.value = false;
  }
});
</script>
