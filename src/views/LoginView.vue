<template>
  <div class="flex justify-center items-center h-screen bg-bg-login-gradient">
    <div class="flex p-6 shadow-md w-3/6 h-4/6 rounded-2xl bg-white">
      <div class="flex-1 bg-bg-login-start rounded-xl p-2">logo</div>
      <div class="flex-1 bg-white p-2 flex flex-col">
        <div class="flex mt-2 justify-end">
          <icon-cross width="30px" height="30px" />
        </div>
        <div class="flex flex-col items-center justify-start gap-5 h-full">
          <h1 class="text-3xl font-bold py-4">Login</h1>
          <app-form @submit="handleSubmit" class="w-5/6">
            <app-field
              id="username"
              label="Email"
              type="text"
              v-model="form.username"
              placeholder="Ingresar usuario"
            >
              <template #icon>
                <icon-mail height="20px" width="20px" />
              </template>
            </app-field>
            <app-field
              id="password"
              label="Password"
              type="password"
              v-model="form.password"
              placeholder="Ingresar password"
            >
              <template #icon>
                <icon-eye height="20px" width="20px" />
              </template>
            </app-field>
            <dir class="text-right text-orange-500 underline">
              <a href="">Forgot Password?</a>
            </dir>
            <app-button
              class="w-full p-2 bg-[#FF797B] my-2 rounded-lg text-white"
            >
              Log in
            </app-button>
          </app-form>

          <app-line />
          <app-box-i-con>
            <template #right>
              <app-icon-button href="https://apple.com"
                ><icon-apple width="30px" height="30px" />
              </app-icon-button>
            </template>
            <template #left>
              <app-icon-button href="https://google.com"
                ><icon-google width="25px" height="25px" />
              </app-icon-button>
            </template>
            <template #center>
              <app-icon-button href="https://facebook.com"
                ><icon-facebook width="40px" height="40px" />
              </app-icon-button>
            </template>
          </app-box-i-con>
          <div>
            <p class="text-xs font-semibold">
              Don't have an account?
              <span class="text-gray-600 underline">Sign Up here</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  IconCross,
  AppForm,
  AppField,
  AppButton,
  AppLine,
  AppBoxICon,
  AppIconButton,
  IconApple,
  IconGoogle,
  IconFacebook,
  IconEye,
  IconMail,
} from "@/desingSistem";

const form = ref({
  username: "",
  password: "",
});

const handleSubmit = () => {
  console.log("form:", form.value);
};
</script>

<style scoped lang="css"></style>
