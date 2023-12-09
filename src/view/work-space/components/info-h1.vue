<template>
  <div>
    <el-input
      v-model="(form.data.components[props.componentId!].data as TData).text"
      class="w-[300px]"
    />
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/store/useForm';

type TData = {
  text: string;
};

const { form } = useForm();

const props = defineProps({
  componentId: Number,
  data: Object,
});
</script>

<style></style>
