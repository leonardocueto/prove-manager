<template>
  <div class="flex flex-col size-full bg-white">
    <div class="flex flex-col border m-6 rounded-lg overflow-hidden">
      <nav class="flex items-center justify-between w-full bg-white">
        <h2 class="py-5 px-6 font-semibold text-lg">
          {{ $t("list provider") }}
        </h2>
        <div class="flex items-center w-30 max-h-full">
          <app-button-add @click="openModal">{{
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
                    @click="openModal({ id: slotProps.data.id })"
                  >
                    <component :is="iconEdit" size="20" color="gray" />
                    {{ $t("edit") }}
                  </div>
                </template>
                <template #down>
                  <div class="flex gap-2 relative z-20">
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
      <app-fade-modal :isVisible="showModal">
        <div class="bg-white min-w-[500px] min-h-96 rounded-2xl p-6">
          <div class="pb-4">
            <h1 class="font-bold text-2xl">{{ $t("add provider") }}</h1>

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
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ProviderForm from "@/components/Forms/ProviderForm.vue";
import { AppButtonModal, AppButtonAdd, AppFadeModal } from "@/desingSistem";
import useProviders from "@/composables/useProviders";

const { listProviders, findProvider } = useProviders();

const iconEdit = TablerIcons["IconPencil"];
const iconDelete = TablerIcons["IconTrash"];
const datatable = DataTable;
const column = Column;

const showModal = ref<boolean>(false);
// const loading = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const formValues = ref({
  name: "",
  email: "",
  city: "",
});

// onMounted(async () => {
//   try {
//     loading.value = true;
//     await getProviders();
//   } catch (error) {
//   } finally {
//     loading.value = false;
//   }
// });

const onSubmit = (value: any) => {
  console.log(value);
};

const openModal = ({ id }: { id?: string | number }) => {
  isEdit.value = id ? true : false;
  if (id) formValues.value = findProvider(id);
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  formValues.value = {
    name: "",
    email: "",
    city: "",
  };
};
</script>
