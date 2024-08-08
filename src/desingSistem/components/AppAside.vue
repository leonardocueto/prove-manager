<template>
  <aside
    class="flex flex-col gap-8 px-4 py-8 items-start h-screen w-64 bg-gray-100 rounded-lg"
  >
    <div
      class="flex justify-start items-center gap-2 w-full bg-blue-200 p-1 rounded-md"
    >
      <slot name="icon" />
    </div>
    <div class="flex flex-col gap-4 w-full">
      <slot name="option" />
    </div>
  </aside>
</template>
