<template>
  <div
    @click="SetLogout"
    class="flex items-center space-x-2 p-2 rounded cursor-pointer"
  >
    <app-icon icon="IconLogout" size="small"></app-icon>
    <span>{{ $t("logout") }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { AppIcon } from "@/desingSistem";
import useAuth from "@/composables/useAuth";

const router = useRouter();
const { doLogout } = useAuth();

const SetLogout = () => {
  doLogout();
  router.push({ name: "login" });
};
</script>
