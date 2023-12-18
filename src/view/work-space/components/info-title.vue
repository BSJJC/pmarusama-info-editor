<template>
  <div class="w-full">
    <el-input v-model="form.title" class="w-full" placeholder="information title" />
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/store/useForm';

const { form } = useForm();
</script>

<style></style>
