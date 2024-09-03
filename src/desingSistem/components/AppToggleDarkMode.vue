<template>
  <button-p label="Toggle Dark Mode" @click="toggleDarkMode()"></button-p>
</template>
<script setup lang="ts">
import Button from "primevue/button";

const buttonP = Button;

const toggleDarkMode = () => {
  const element = document.querySelector("html");
  element?.classList.toggle("my-app-dark");
};
//implementar
</script>
