<template>
  <component :is="layout">
    <toast />
    <confirm-popup></confirm-popup>
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import Toast from "primevue/toast";
import ConfirmPopup from "primevue/confirmpopup";
import { computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";

const DefaultLayout = defineAsyncComponent(
  () => import("./layouts/DefaultLayout.vue")
);

const BlankLayout = defineAsyncComponent(
  () => import("./layouts/BlankLayout.vue")
);

const route = useRoute();

const layout = computed(() => {
  return route.meta.layout == "BlankLayout" ? BlankLayout : DefaultLayout;
});
</script>

<style lang="scss"></style>
