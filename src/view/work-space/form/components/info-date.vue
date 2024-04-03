<template>
  <div>
    <el-input-number v-model="date" :min="20000000" :max="20301231" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import syncData from '@/utils/syncData.ts';

const props = defineProps({
  componentId: Number,
});

const date: Ref<number> = ref(0);

watch(
  () => date.value,
  () => {
    syncData(props.componentId!, date.value);
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style scoped>
.el-input-number {
  width: 100%;
}
</style>
