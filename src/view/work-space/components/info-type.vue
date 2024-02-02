<template>
  <div>
    <el-radio-group v-model="type">
      <el-radio label="form">form</el-radio>
      <el-radio label="url">url</el-radio>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { useForm } from '@/store/useForm';

const props = defineProps({
  componentId: Number,
});

const { form } = useForm();

const type: Ref<'form' | 'url'> = ref('form');

watch(
  () => type.value,
  () => {
    form.informationType = type.value;
    form.data.components[props.componentId!].data = type.value;
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style></style>
