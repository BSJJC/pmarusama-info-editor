<template>
  <div>
    <el-input v-model="text" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import syncData from '@/utils/syncData.ts';

const props = defineProps({
  componentId: Number,
});

const text: Ref<string> = ref('');

watch(
  () => text.value,
  () => {
    syncData(props.componentId!, { text: text.value });
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style></style>
