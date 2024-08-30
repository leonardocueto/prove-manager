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
      v-model="formValues.city"
      id="city"
      label="city"
      type="text"
      placeholder="enter city"
    />
    <div class="flex gap-2">
      <app-button type="secondary" @click="closeModal">salir</app-button>
      <app-button type="primary">Aceptar</app-button>
    </div>
  </app-form>
</template>

<script lang="ts" setup>
import { AppForm, AppButton, AppField } from "@/desingSistem";
import { reactive, defineEmits, defineProps } from "vue";

const props = defineProps<{
  values: {
    name: string;
    email: string;
    city: string;
  };
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

<style lang="scss" scoped></style>
