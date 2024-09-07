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
    <div class="flex gap-2">
      <app-button
        :loading="loading"
        :disabled="loading"
        type="secondary"
        @click="closeModal"
        >{{ $t("cancel") }}</app-button
      >
      <app-button :loading="loading" :disabled="loading" type="primary">{{
        $t("save")
      }}</app-button>
    </div>
  </app-form>
</template>

<script lang="ts" setup>
import { AppForm, AppButton, AppField } from "@/desingSistem";
import { reactive, defineEmits, defineProps, withDefaults } from "vue";
import { IProvider } from "@/interface/provider.interface";

const props = withDefaults(
  defineProps<{
    values: IProvider;
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);

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
