import { defineStore } from "pinia";

export const useProviderStore = defineStore("providers", {
  state: () => {
    const storedProviders = localStorage.getItem("providers");
    return {
      providers: storedProviders ? JSON.parse(storedProviders) : [],
    };
  },
  getters: {
    AllProviders: (state) => {
      return state.providers;
    },
    selectProvider: (state) => (id: number) => {
      //cambiar por interface
      return state.providers.find((provider: any) => provider.id === id);
    },
  },
  actions: {
    addProvider(AddNewProvider: any) {
      //cambiar por interface
      this.providers = [...this.providers, AddNewProvider];
      localStorage.setItem("providers", JSON.stringify(this.providers));
    },
    deleteProvider(id: number) {
      this.providers = this.providers.filter(
        (provider: any) => provider.id !== id
      );
      localStorage.setItem("providers", JSON.stringify(this.providers));
    },
    updateProvider(newProvider: any) {
      //cambiar por interface
      this.providers.forEach((provider: any, index: number) => {
        //cambiar por interface
        provider.id === newProvider.id ?? (this.providers[index] = newProvider);
      });
    },
  },
});
