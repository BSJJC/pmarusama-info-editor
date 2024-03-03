<template>
  <component :is="dynamicComponent" :data="props.data"></component>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Ref } from 'vue';
import importDynamicComponent from '@/utils/importDynamicComponent.ts';

type TComponent = {
  componentName: string;
  data: unknown;
};

const props = defineProps<TComponent>();
const dynamicComponent: Ref<HTMLElement | undefined> = importDynamicComponent(props.componentName);
</script>

<style></style>
