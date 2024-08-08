<template>
  <div class="flex flex-col mb-4">
    <label :for="id" class="mb-1 font-bold">{{ label }}</label>
    <div class="relative">
      <div
        class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
      >
        <component :is="iconComponent" />
      </div>

      <input
        v-model="dataInput"
        :type="type"
        :id="id"
        :placeholder="placeholder"
        class="pl-10 py-1 px-2 rounded-lg border-2 text-base w-full focus:border-orange-200"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from "vue";
// Linea 8 sale error, por que?
const props = defineProps<{
  label: string;
  id?: string;
  type: string;
  modelValue: string;
  placeholder: string;
  iconComponent: {
    type: object;
  };
}>();

const dataInput = ref(props.modelValue);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

watch(dataInput, (value) => {
  emit("update:modelValue", value);
});

watch(
  () => props.modelValue,
  (value) => {
    dataInput.value = value;
  }
);
</script>
