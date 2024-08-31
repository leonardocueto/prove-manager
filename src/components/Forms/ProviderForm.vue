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
      v-model="formValues.email"
      id="mail"
      label="mail"
      type="text"
      placeholder="enter mail"
    />
    <app-field
      v-model="formValues.address.city"
      id="city"
      label="city"
      type="text"
      placeholder="enter city"
    />
    <app-field
      v-model="formValues.address.province"
      id="province"
      label="province"
      type="text"
      placeholder="enter province"
    />
    <app-field
      v-model="formValues.address.address"
      id="address"
      label="address"
      type="text"
      placeholder="enter address"
    />
    <app-field
      v-model="formValues.address.postalCode"
      id="postalcode"
      label="postalcode"
      type="text"
      placeholder="enter postal code"
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
import { IProvider } from "@/interface/provider.interface";
const props = defineProps<{
  values: IProvider;
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
