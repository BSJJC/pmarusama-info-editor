<template>
  <div id="preview-body" class="w-full h-full rounded-lg">
    <dynamicComponent
      v-for="(i, index) in form.data.components"
      :key="index"
      :component-name="i.componentName"
      :data="i.data"
    ></dynamicComponent>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/store/useForm';
import dynamicComponent from './dynamic-component.vue';

const { form } = useForm();
</script>

<style scoped>
#preview-body {
  background: #fff8a9 url('@/image/body-bg.png') center top/100% auto;
}
</style>
