<template>
  <div>
    <el-input v-model="props.data!.text" />
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

<style></style>
