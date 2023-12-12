<template>
  <div>
    <component :is="dynamicComponent" :componentId="props.componentId"></component>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

const dynamicComponent = shallowRef();

const props = defineProps({
  componentId: Number,
  componentName: String,
});

import(`./components/info-${props.componentName}.vue`).then((component) => {
  dynamicComponent.value = component.default;
});
</script>

<style></style>
