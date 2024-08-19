<template>
  <div class="flex flex-col mb-4">
    <label :for="id" class="mb-1 font-bold">{{ $t(`${label}`) }}</label>
    <div class="relative">
      <div
        class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
      >
        <component :is="IconComponentLeft" size="25"></component>
      </div>

      <input
        v-model="dataInput"
        :type="type"
        :id="id"
        :placeholder="$t(placeholder)"
        class="pl-10 py-1 px-2 rounded-lg border-2 text-base w-full focus:border-orange-200"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch, computed } from "vue";
import TablerIcons from "@/assets/icons";
const props = defineProps<{
  label: string;
  id?: string;
  type: string;
  modelValue: string;
  placeholder: string;
  iconLeft?: string;
}>();

const dataInput = ref(props.modelValue);

const IconComponentLeft = computed(() => {
  return TablerIcons[props.iconLeft as keyof typeof TablerIcons] || null;
});

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
