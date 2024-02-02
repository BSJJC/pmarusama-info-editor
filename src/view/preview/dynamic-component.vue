<template>
  <component :is="dynamicComponent"></component>
</template>

<script setup lang="ts">
import importDynamiComponent from '@/utils/importDynamicComponent.ts';

type TComponent = {
  componentName: string;
  data: object;
};

const props = defineProps<TComponent>();

const dynamicComponent = importDynamiComponent(props.componentName);
</script>

<style></style>
