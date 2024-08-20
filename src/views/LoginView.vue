<template>
  <div class="flex justify-center items-center h-screen bg-bg-login-g">
    <div class="flex p-6 shadow-lg w-3/6 rounded-2xl bg-white">
      <div class="flex-1 bg-secondary rounded-xl relative">
        <img src="@/assets/login.png" alt="login" />
      </div>
      <div class="flex-1 bg-white p-2 flex flex-col">
        <div
          class="flex flex-col items-center justify-start gap-10 h-full px-4"
        >
          <h1 class="text-3xl font-bold py-4">{{ $t("login") }}</h1>
          <app-form @submit="handleSubmit">
            <app-field
              v-model="form.username"
              id="username"
              label="email"
              type="text"
              placeholder="enter email"
              icon-left="IconMail"
            >
            </app-field>
            <app-field
              v-model="form.password"
              id="password"
              label="password"
              type="password"
              placeholder="enter password"
              icon-left="IconEye"
            >
            </app-field>
            <dir class="text-right">
              <a class="text-gray-300 underline hover:text-primary" href="">{{
                $t("forgot password?")
              }}</a>
            </dir>
            <app-button class="flex items-center justify-center">
              <icon-spin v-if="loading" />
              <span v-else>{{ $t("log in") }} </span>
            </app-button>
          </app-form>

          <app-line />
          <div class="flex space-x-5">
            <app-icon-button href="https://apple.com"
              ><icon-apple width="30px" height="30px" />
            </app-icon-button>

            <app-icon-button href="https://google.com"
              ><icon-google width="25px" height="25px" />
            </app-icon-button>

            <app-icon-button href="https://facebook.com"
              ><icon-facebook width="40px" height="40px" />
            </app-icon-button>
          </div>
          <div>
            <p class="text-xs font-semibold">
              {{ $t(`don't have an account?`) }}
              <span class="text-gray-600 underline hover:cursor-pointer">{{
                $t(`sign Up here`)
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables";

const router = useRouter();

import {
  AppForm,
  AppField,
  AppButton,
  AppLine,
  AppIconButton,
  IconApple,
  IconGoogle,
  IconFacebook,
  IconSpin,
} from "@/desingSistem";

const { doLogin } = useAuth();

const loading = ref(false);
const form = ref({
  username: "leocueto1999+1@gmail.com",
  password: "",
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    await doLogin(form.value.username);
    router.push({ name: "dashboard" });
  } catch (error) {
    console.error("Error durante el login:", error);
    throw new Error("Error en el login");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="css"></style>
