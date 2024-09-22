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
      v-model="formValues.email"
      id="mail"
      label="mail"
      type="text"
      icon="IconMail"
      placeholder="enter mail"
    />
    <app-field-select
      :options="optionsSelect"
      :modelValue="formValues.type"
    ></app-field-select>
    <div class="flex flex-col mb-4 gap-2">
      <p class="mb-1 font-bold">{{ $t("status") }}</p>
      <toggle-switch v-model="checked" />
    </div>
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
import {
  reactive,
  defineEmits,
  defineProps,
  withDefaults,
  computed,
} from "vue";
import { AppForm, AppButton, AppField, AppFieldSelect } from "@/desingSistem";
import { IProvider } from "@/interface/provider.interface";
import ToggleSwitch from "primevue/toggleswitch";

const props = withDefaults(
  defineProps<{
    values: IProvider;
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);

const checked = computed({
  get: () => formValues.status === "active",
  set: (val: boolean) => {
    formValues.status = val ? "active" : "inactive";
  },
});

const optionsSelect = [
  { name: "provider", value: "provider" },
  { name: "client", value: "client" },
];

const formValues = reactive({
  ...props.values,
  type: props.values.type[0] || "provider",
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
</script>
