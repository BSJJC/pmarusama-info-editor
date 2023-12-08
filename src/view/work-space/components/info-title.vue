<template>
  <div>
    <el-input v-model="form.title" class="w-[300px]" />
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/store/useForm';

const { form } = useForm();
</script>

<style></style>
