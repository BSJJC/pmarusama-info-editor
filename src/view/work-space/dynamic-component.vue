<template>
  <div>
    <component
      :is="dynamicComponent"
      :componentId="props.componentId"
      :data="props.data"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

const dynamicComponent = shallowRef();

const props = defineProps({
  componentId: Number,
  componentName: String,
  data: Object,
});

console.log(props.componentId);

import(`./components/info-${props.componentName}.vue`).then((component) => {
  dynamicComponent.value = component.default;
});
</script>

<style></style>
