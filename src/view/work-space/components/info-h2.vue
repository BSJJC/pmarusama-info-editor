<template>
  <div>
    <el-input
      v-model="(form.data.components[props.componentId!].data as TData).text"
      class="w-[400px]"
    />
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
  data: Object,
});
</script>

<style></style>
