<template>
  <div>{{ props.data || 'meiyou' }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: String,
});

console.log(props.data);
</script>

<style></style>
