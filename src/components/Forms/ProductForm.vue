<template>
  <app-form @submit="onSubmit">
    <app-field
      v-model="formValues.name"
      id="Name"
      label="name"
      type="text"
      icon="IconUser"
      placeholder="enter name"
    />
    <app-field
      v-model="formValues.description"
      id="Description"
      label="description"
      type="text"
      icon="IconFileDescription"
      placeholder="enter description"
    />
    <app-field
      v-model="formValues.price[0].price"
      id="price"
      label="price"
      type="text"
      icon="IconReceipt2"
      placeholder="enter price"
    />
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

<script lang="ts" setup>
import { AppForm, AppButton, AppField } from "@/desingSistem";
import { reactive, defineEmits, defineProps, withDefaults } from "vue";
import { IProduct } from "@/interface/product.interface";

const props = withDefaults(
  defineProps<{
    values: IProduct;
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);

const formValues = reactive<Partial<IProduct>>(structuredClone(props.values));

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
</script>
