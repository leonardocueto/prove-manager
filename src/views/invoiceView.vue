<template>
  <data-table
    v-model:filters="filters"
    :value="listInvoices"
    tableStyle="min-width: 25rem"
    scrollHeight="height: 800px"
    class="min-h-8 max-h-[800px]"
    paginator
    removableSort
    :rows="10"
    :rowsPerPageOptions="[10, 20, 30, 50]"
    :globalFilterFields="['client', 'date', 'item']"
    :loading="loading"
  >
    <template #header>
      <nav class="flex items-center justify-between w-full">
        <h2 class="font-semibold text-xl text-gray-800">
          {{ $t("list invoices") }}
        </h2>
        <div class="flex items-center space-x-4">
          <app-button-add @click="openModal">
            {{ $t("add invoice") }}
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
    <template #empty> {{ $t("invoice not found") }} </template>

    <column field="client" :header="$t('client')" sortable>
      <template #body="slotProps">
        {{ slotProps.data.client.name }}
      </template>
    </column>
    <column field="item" :header="$t('item')" sortable>
      <template #body="slotProps">
        {{ slotProps.data.items[0].name }}
      </template>
    </column>
    <column field="date" :header="$t('date')" sortable>
      <template #body="slotProps">
        {{ slotProps.data.date }}
      </template>
    </column>
    <column field="date" :header="$t('price')" sortable>
      <template #body="slotProps"> ${{ slotProps.data.total }} </template>
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
                    <app-icon icon="IconSearch" size="small" />
                    {{ $t("delete") }}
                  </div>
                </li>
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
                  <div
                    class="flex gap-2 relative z-20"
                    @click="openModal({ id: slotProps.data.id })"
                  >
                    <app-icon icon="IconSearch" size="small" />
                    {{ $t("see more") }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </popover>
      </template>
    </column>
  </data-table>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

import { AppFadeModal, AppButtonAdd, AppIcon } from "@/desingSistem";

import { FilterMatchMode } from "@primevue/core/api";
import Popover from "primevue/popover";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import Button from "primevue/button";
import useInvoice from "@/composables/useInvoice";
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  client: { value: null, matchMode: FilterMatchMode.CONTAINS },
  date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  item: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const buttonP = Button;

const op = ref();
const hoverIcon = ref(false);
const loading = ref<boolean>(false);
const toggle = (event: MouseEvent) => {
  op.value.toggle(event);
};

const { getInvoices, listInvoices } = useInvoice();
const openModal = ({ id }: { id?: string | number }) => {
  console.log(id);
};

onMounted(async () => {
  try {
    loading.value = true;
    await getInvoices();
  } catch (error) {
    alert({
      severity: "error",
      summary: "Error",
      detail: (error as Error).message,
    });
  } finally {
    loading.value = false;
  }
});
</script>
