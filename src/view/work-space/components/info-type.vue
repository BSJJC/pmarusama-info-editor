<template>
  <div>
    <el-radio-group v-model="form.informationType">
      <el-radio label="form">form</el-radio>
      <el-radio label="url">url</el-radio>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/store/useForm';

const { form } = useForm();
</script>

<style></style>
