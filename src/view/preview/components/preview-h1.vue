<template>
  <div>
    <h1>{{ props.data?.text }}</h1>
  </div>
</template>

<script setup lang="ts">
type TData = {
  text: string;
};

const props = defineProps({
  data: Object as () => TData,
});
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #f60;
  font-weight: bold;
}
</style>
