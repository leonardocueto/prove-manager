<template>
  <div class="flex flex-col size-full bg-white">
    <div class="flex flex-col border m-6 rounded-lg overflow-hidden">
      <main class="min-w-full min-h-full">
        <datatable
          v-model:filters="filters"
          :value="listProviders"
          tableStyle="min-width: 50rem"
          scrollHeight="200px"
          paginator
          removableSort
          :rows="10"
          :rowsPerPageOptions="[10, 20, 30, 50]"
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
                  <icon-search
                    size="20"
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
          <template #loading> <skeleton></skeleton> </template>
          <column field="name" :header="$t('name')" sortable>
            <template #body="slotProps">
              <skeleton v-if="loading"></skeleton>
              <template v-else>
                {{ slotProps.data.name }}
              </template>
            </template>
          </column>
          <column field="email" :header="$t('mail')" sortable>
            <template #body="slotProps">
              <skeleton v-if="loading"></skeleton>
              <template v-else>
                {{ slotProps.data.email }}
              </template>
            </template>
          </column>
          <column field="city" :header="$t('city')" sortable>
            <template #body="slotProps">
              <skeleton v-if="loading"></skeleton>
              <template v-else>
                {{ slotProps.data.address.city }}
              </template>
            </template>
          </column>
          <column class="w-20 overflow-visible">
            <template #body="slotProps">
              <button-p
                type="button"
                @click="toggle"
                class="rounded-full hover:bg-gray-50 p-2"
              >
                <component
                  :is="iconComponent"
                  :size="20"
                  :color="hoverIcon ? 'black' : 'gray'"
                />
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
                          <component :is="iconEdit" size="20" color="gray" />
                          {{ $t("edit") }}
                        </div>
                      </li>
                      <li
                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer relative inline-block text-left rounded-md"
                      >
                        <div
                          class="flex gap-2 relative z-20"
                          @click="deleteProvider(slotProps.data.id)"
                        >
                          <component :is="iconDelete" size="20" color="gray" />
                          {{ $t("delete") }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </popover>
            </template>
          </column>
        </datatable>
      </main>

      <!--Create Provider Modal-->
      <app-fade-modal :isVisible="showModal">
        <div class="bg-white min-w-[500px] min-h-96 rounded-2xl p-6">
          <div class="pb-4">
            <h1 class="font-bold text-2xl pb-4">{{ $t(titleModal) }}</h1>

            <provider-form
              :values="formValues"
              @close="closeModal"
              @submit="onSubmit"
            ></provider-form>
          </div>
        </div>
      </app-fade-modal>
      <!---->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import TablerIcons from "@/assets/icons";
import { FilterMatchMode } from "@primevue/core/api";
import Popover from "primevue/popover";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import { IProvider } from "@/interface/provider.interface";
import { AppButtonAdd, AppFadeModal } from "@/desingSistem";
import ProviderForm from "@/components/Forms/ProviderForm";
import useProviders from "@/composables/useProviders";

const hoverIcon = ref(false);
const op = ref();
const showModal = ref<boolean>(false);
const loading = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const titleModal = ref("");
const formValues = ref<IProvider>({
  address: {
    city: "",
    province: "",
    address: "",
    postalCode: "",
  },
  ivaCondition: "IVA_RESPONSABLE",
  name: "",
  email: "",
  type: "",
  status: "active",
});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const {
  listProviders,
  findProvider,
  addProvider,
  editProvider,
  deleteProvider,
  getProviders,
} = useProviders();

const toggle = (event: any) => {
  op.value.toggle(event);
};

const iconComponent = TablerIcons["IconDotsVertical"];
const iconEdit = TablerIcons["IconPencil"];
const iconDelete = TablerIcons["IconTrash"];
const iconSearch = TablerIcons["IconSearch"];

const datatable = DataTable;
const column = Column;
const inputText = InputText;
const iconField = IconField;
const skeleton = Skeleton;
const buttonP = Button;
const popover = Popover;

const openModal = ({ id }: { id?: string | number }) => {
  isEdit.value = id ? true : false;
  isEdit.value == true
    ? (titleModal.value = "edit provider")
    : (titleModal.value = "add provider");

  if (id) formValues.value = findProvider(id);
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
  formValues.value = {
    address: {
      city: "",
      province: "",
      address: "",
      postalCode: "",
    },
    ivaCondition: "IVA_RESPONSABLE",
    name: "",
    email: "",
    type: "",
    status: "active",
  };
};

const onSubmit = async (value: IProvider) => {
  isEdit.value ? await editProvider(value) : await addProvider(value);
  closeModal();
};

onMounted(async () => {
  try {
    loading.value = true;
    await getProviders();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});
</script>
