<template>
  <div>
    <el-input v-model="text" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { useForm } from '@/store/useForm';

const props = defineProps({
  componentId: Number,
});

const { form } = useForm();

const text: Ref<string> = ref('');

watch(
  () => text.value,
  () => {
    form.data.components[props.componentId!].data = {
      text: text.value,
    };
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style></style>
