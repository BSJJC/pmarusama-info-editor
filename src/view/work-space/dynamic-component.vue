<template>
  <div>
    <component :is="dynamicComponent" :data="props.data"></component>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

const dynamicComponent = shallowRef();

const props = defineProps({
  componentName: String,
  data: Object,
});

import(`./components/info-${props.componentName}.vue`).then((component) => {
  dynamicComponent.value = component.default;
});
</script>

<style></style>
