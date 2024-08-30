import { reactive } from "vue";

const providersStore = reactive({
  providers: [
    {
      id: 1,
      name: "Provider 1",
      email: "derian.rosado@alegra.com",
      city: "Bogotá",
    },
  ],
});

export { providersStore };
