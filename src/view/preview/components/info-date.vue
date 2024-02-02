<template>
  <div>
    <div>{{ date }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: Number,
});

const date = props.data;
</script>

<style></style>
