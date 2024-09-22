<template>
  <select
    v-model="internalValue"
    @change="emitValue"
    class="w-full md:w-56 md:h-19 pl-10 py-1 px-2 rounded-lg border-2 text-base cursor-pointer"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps<{
  options: Array<{ value: string | number | undefined; name: string }>;
  modelValue: string | undefined;
}>();

const emit = defineEmits(["update:modelValue"]);

const internalValue = ref<string | number | undefined>(props.options[0]?.value);

const emitValue = () => {
  emit("update:modelValue", internalValue.value);
};

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);
</script>
