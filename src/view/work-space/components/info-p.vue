<template>
  <div>
    <el-input
      type="textarea"
      class="w-[300px]"
      v-for="i in Math.max(props.data!.text.length - 1, 1)"
      :key="i"
      v-model="(form.data.components[props.componentId!].data as TData).text[i - 1]"
    />
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/store/useForm';

const { form } = useForm();

type TData = {
  text: Array<string | null>;
};

const props = defineProps({
  componentId: Number,
  data: Object,
});

(form.data.components[props.componentId!].data as TData).text = [];
</script>

<style></style>
