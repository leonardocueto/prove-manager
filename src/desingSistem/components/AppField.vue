<template>
  <div class="flex flex-col mb-4">
    <label :for="id" class="mb-1 font-bold">{{ label }}</label>
    <div class="relative">
      <div
        class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
      >
        <slot name="icon" />
      </div>

      <input
        :type="type"
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="pl-10 py-1 px-2 rounded-lg border-2 text-base w-full focus:border-orange-200"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
// Linea 8 sale error, por que?
defineProps<{
  label: string;
  id?: string;
  type: string;
  modelValue: string;
  placeholder: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
