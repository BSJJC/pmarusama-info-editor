<template>
  <div>
    <el-form ref="formRef" :model="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="information type">
        <el-radio-group v-model="form.informationType">
          <el-radio label="form" size="large">form</el-radio>
          <el-radio label="url" size="large">url</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/store/useForm';

const { form } = useForm();

console.log(form);
</script>

<style></style>
