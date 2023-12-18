<template>
  <div class="w-full">
    <el-input-number v-model="form.date" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/store/useForm';

const { form } = useForm();
</script>

<style></style>
