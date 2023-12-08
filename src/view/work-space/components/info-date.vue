<template>
  <div>
    <el-input-number v-model="form.date" class="w-[300px]" />
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/store/useForm';

const { form } = useForm();
</script>

<style></style>
