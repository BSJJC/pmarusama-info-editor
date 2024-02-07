<template>
  <div class="w-full">
    <el-input-number v-model="date" class="w-full" :max="20301231" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { useForm } from '@/store/useForm';

const props = defineProps({
  componentId: Number,
});

const { form } = useForm();

const date: Ref<number> = ref(0);

watch(
  () => date.value,
  () => {
    form.date = date.value;
    form.data.components[props.componentId!].data = date.value;
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style></style>
