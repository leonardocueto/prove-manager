<template>
  <app-form @submit="onSubmit">
    <app-field
      v-model="formValues.name"
      id="Name"
      label="name"
      type="text"
      placeholder="enter name"
    />
    <app-field
      v-model="formValues.description"
      id="Description"
      label="description"
      type="text"
      placeholder="enter description"
    />
    <app-field
      v-model="formValues.price[0].price"
      id="price"
      label="price"
      type="text"
      placeholder="enter price"
    />
    <div class="flex gap-2">
      <app-button type="secondary" @click="closeModal">{{
        $t("cancel")
      }}</app-button>
      <app-button type="primary">{{ $t("save") }}</app-button>
    </div>
  </app-form>
</template>

<script lang="ts" setup>
import { AppForm, AppButton, AppField } from "@/desingSistem";
import { reactive, defineEmits, defineProps } from "vue";
import { IProduct } from "@/interface/product.interface";
const props = defineProps<{
  values: IProduct;
}>();

const formValues = reactive({ ...props.values });

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
