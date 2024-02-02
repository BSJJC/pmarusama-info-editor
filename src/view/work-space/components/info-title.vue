<template>
  <div class="w-full">
    <el-input v-model="title" class="w-full" placeholder="information title" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
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
    form.data.components[props.componentId!].data = title.value;
  },
);
</script>

<style></style>
