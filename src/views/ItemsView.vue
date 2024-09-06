<template>
  <datatable
    v-model:filters="filters"
    :value="listProducts"
    tableStyle="min-width: 50rem"
    scrollHeight="min-height: 50rem"
    paginator
    removableSort
    :rows="10"
    :rowsPerPageOptions="[10, 20, 30, 50]"
    :globalFilterFields="['name', 'description', 'price']"
  >
    <template #header>
      <nav class="flex items-center justify-between w-full">
        <h2 class="font-semibold text-xl text-gray-800">
          {{ $t("list products") }}
        </h2>
        <div class="flex items-center space-x-4">
          <app-button-add @click="openModal">
            {{ $t("add product") }}
          </app-button-add>
          <icon-field class="relative flex items-center w-64">
            <icon-search size="20" class="absolute left-3 text-gray-500" />
            <input-text
              v-model="filters['global'].value"
              :placeholder="$t('search')"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </icon-field>
        </div>
      </nav>
    </template>
    <template #empty> {{ $t("product not found") }} </template>
    <template #loading> <skeleton></skeleton> </template>
    <column field="name" :header="$t('name')" sortable>
      <template #body="slotProps">
        <skeleton v-if="loading"></skeleton>
        <template v-else>
          {{ slotProps.data.name }}
        </template>
      </template>
    </column>
    <column field="description" :header="$t('description')" sortable>
      <template #body="slotProps">
        <skeleton v-if="loading"></skeleton>
        <template v-else>
          {{ slotProps.data.description }}
        </template>
      </template>
    </column>
    <column field="price" :header="$t('price')" sortable>
      <template #body="slotProps">
        <skeleton v-if="loading"></skeleton>
        <template v-else>
          <p>{{ slotProps.data.price[0].price }}</p>
        </template>
      </template>
    </column>
    <column class="w-20 overflow-visible">
      <template #body="slotProps">
        <button-p
          type="button"
          class="rounded-full hover:bg-gray-50 p-2"
          @click="toggle"
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
              </ul>
            </div>
          </div>
        </popover>
      </template>
    </column>
  </datatable>
  <ptoast />
  <app-fade-modal :isVisible="showModal">
    <div class="bg-white min-w-[500px] min-h-96 rounded-2xl p-6">
      <div class="pb-4">
        <h1 class="font-bold text-2xl pb-4">{{ $t(titleModal) }}</h1>

        <product-form
          :values="formValues"
          @close="closeModal"
          @submit="onSubmit"
        ></product-form>
      </div>
    </div>
  </app-fade-modal>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { AppFadeModal, AppButtonAdd } from "@/desingSistem";
import ProductForm from "@/components/Forms/ProductForm.vue";
import useProducts from "@/composables/useProducts";
import { IProduct } from "@/interface/product.interface";
import TablerIcons from "@/assets/icons";
import { FilterMatchMode } from "@primevue/core/api";
import Popover from "primevue/popover";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import Toast from "primevue/toast";
const ptoast = Toast;

const showModal = ref<boolean>(false);
const titleModal = ref("");
const op = ref();

const hoverIcon = ref(false);
const iconComponent = TablerIcons["IconDotsVertical"];
const iconEdit = TablerIcons["IconPencil"];
const iconSearch = TablerIcons["IconSearch"];

const datatable = DataTable;
const column = Column;
const inputText = InputText;
const iconField = IconField;
const skeleton = Skeleton;
const buttonP = Button;
const popover = Popover;

const {
  loading,
  isEdit,
  getProduct,
  listProducts,
  addProduct,
  editProduct,
  findProduct,
} = useProducts();

const formValues = ref<IProduct>({
  name: "",
  description: "",
  price: [{ price: 0 }],
  inventory: { unit: "unit" },
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  price: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const toggle = (event: MouseEvent) => {
  op.value.toggle(event);
};

const openModal = ({ id }: { id?: string | number }) => {
  isEdit.value = id ? true : false;
  isEdit.value == true
    ? (titleModal.value = "edit product")
    : (titleModal.value = "add product");

  if (id) formValues.value = findProduct(id) as IProduct;
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
  formValues.value = {
    name: "",
    description: "",
    price: [{ price: 0 }],
    inventory: { unit: "unit" },
  };
};

const onSubmit = async (value: IProduct) => {
  console.log(value);
  isEdit.value ? await editProduct(value) : await addProduct(value);
  closeModal();
};

onMounted(async () => {
  try {
    loading.value = true;
    await getProduct();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});
</script>
