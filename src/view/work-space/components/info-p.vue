<template>
  <div>
    <div v-for="(i, index) in props.data?.text" :key="index">
      <el-input v-model="props" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/store/useForm';

const { form } = useForm();

type TData = {
  text: Array<string | null>;
};

const props = defineProps({
  data: Object as () => TData,
});
</script>

<style></style>
