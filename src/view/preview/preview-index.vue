<template>
  <div
    id="preview-body"
    class="flex justify-center items-center w-full h-100vh rounded-lg px-4 py-2"
  >
    <div class="flex flex-col w-[60%] gap-y-4">
      <dynamic-component
        v-for="(i, index) in form.data.components"
        :key="index"
        :component-name="i.componentName"
        :data="i.data"
      ></dynamic-component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useForm } from '@/store/useForm';

const dynamicComponent = defineAsyncComponent(() => import('./dynamic-component.vue'));

const { form } = useForm();
</script>

<style scoped>
#preview-body {
  background: #fff8a9 url('@/image/body-bg.png') center top/100% auto;
}
</style>
