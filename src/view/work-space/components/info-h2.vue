<template>
  <div>
    <el-input v-model="form.data.components[props.componentId!].data.text" />
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/store/useForm';

const { form } = useForm();

type TData = {
  text: string;
};

const props = defineProps({
  componentId: Number,
  data: Object as () => TData,
});
</script>

<style></style>
