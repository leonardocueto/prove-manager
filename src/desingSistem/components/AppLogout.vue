<template>
  <div
    @click="SetLogout"
    class="flex items-center space-x-2 p-2 rounded cursor-pointer"
  >
    <component :is="iconComponent" size="25"></component>
    <span>{{ $t("logout") }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import useAuth from "@/composables/useAuth";
import TablerIcons from "@/assets/icons";

const iconComponent = TablerIcons["IconLogout"];

const router = useRouter();
const { doLogout } = useAuth();

const SetLogout = () => {
  doLogout();
  router.push({ name: "login" });
};
</script>
