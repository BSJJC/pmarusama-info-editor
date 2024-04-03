<template>
  <div>
    <el-input v-model="title" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import syncData from '@/utils/syncData';
import { useForm } from '@/store/useForm';

const props = defineProps({
  componentId: Number,
});

const { form } = useForm();

const title: Ref<string> = ref('');

watch(
  () => title.value,
  () => {
    form.title = title.value;

    syncData(props.componentId!, { text: title.value });
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style></style>
