<template>
  <div
    class="bg-gray-200 p-32 flex text-center justify-center items-center rounded-md"
    v-if="loading"
  >
    <div class="animate-spin w-10">
      <app-icon icon="IconLoader2" size="large" color="gray" />
    </div>
  </div>
  <app-form v-else @submit="onSubmit">
    <app-field
      v-model="formValues.date"
      id="date"
      label="date"
      type="text"
      icon="IconCalendarEvent"
      placeholder="2024-09-24"
    />
    <app-field
      v-model="formValues.dueDate"
      id="final_date"
      label="final date"
      type="text"
      icon="IconCalendarEvent"
      placeholder="2024-09-24"
    />
    <section class="flex gap-2 py-2">
      <div class="w-full">
        <h2 class="font-bold">Client</h2>
        <app-field-select
          v-model="formValues.client"
          :options="providerOptions"
        ></app-field-select>
      </div>
      <div class="w-full">
        <h2 class="font-bold">Item</h2>
        <app-field-select
          v-model="formValues.items"
          :options="itemsOptions"
        ></app-field-select>
      </div>
    </section>
    <section class="flex w-full gap-2 py-2 justify-between">
      <div class="w-full">
        <app-field
          v-model="formValues.quantity"
          id="quantity"
          label="quantity"
          type="number"
          icon="IconCalculator"
          placeholder="12"
        />
      </div>
      <div class="w-full">
        <h2 class="font-bold">status</h2>
        <app-field-select
          v-model="formValues.status"
          :options="statusOptions"
        ></app-field-select>
      </div>
    </section>
    <div class="flex gap-2">
      <app-button
        :loading="loading"
        :disabled="loading"
        type="secondary"
        @click="closeModal"
        >{{ $t("cancel") }}</app-button
      >
      <app-button
        :loading="loading"
        :disabled="loading"
        type="primary"
        nativeType="submit"
      >
        {{ $t("save") }}
      </app-button>
    </div>
  </app-form>
</template>
<script setup lang="ts">
import { AppForm, AppButton, AppField, AppFieldSelect } from "@/desingSistem";
import AppIcon from "@/desingSistem/components/AppIcon.vue";
import { IFormValues } from "@/interface/invoice.interface";
import {
  defineProps,
  withDefaults,
  defineEmits,
  reactive,
  ref,
  onMounted,
} from "vue";
import useProviders from "@/composables/useProviders";
import useProducts from "@/composables/useProducts";
import { providersStore } from "@/store/providerStore";
import { productStore } from "@/store/productStore";

const { getProviders } = useProviders();
const { getProduct } = useProducts();

const providerOptions = ref<
  { value: string | number | undefined; name: string }[]
>([]);
const itemsOptions = ref<
  { value: string | number | undefined; name: string }[]
>([]);

const props = withDefaults(
  defineProps<{
    values: IFormValues;
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);

const loading = ref(false);
const statusOptions = [
  { name: "open", value: "open" },
  { name: "draft", value: "draft" },
];

const formValues = reactive<IFormValues>({
  ...props.values,
  status: props.values.status || "open",
  // client: providerOptions.value,
  // items: itemsOptions.value,
  // quantity: itemsOptions.value,
});

const emits = defineEmits<{
  (event: "submit", value: typeof formValues): void;
  (event: "close"): void;
}>();
const onSubmit = () => {
  emits("submit", formValues);
};
const closeModal = () => {
  emits("close");
};
onMounted(async () => {
  try {
    loading.value = true;
    await getProviders();
    await getProduct();
    itemsOptions.value = productStore.products.map((item) => ({
      value: item.id,
      name: item.name,
    }));
    providerOptions.value = providersStore.providers.map((provider) => ({
      value: provider.id,
      name: provider.name,
    }));
  } catch (error) {
    throw new Error((error as Error).message || "Error to get providers");
  } finally {
    loading.value = false;
  }
});
</script>
