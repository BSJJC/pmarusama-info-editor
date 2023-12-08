<template>
  <div class="w-1/2">
    <el-form ref="formRef" :model="form" label-width="200px" class="demo-ruleForm">
      <el-form-item label="information type :">
        <InfoType></InfoType>
      </el-form-item>

      <el-form-item label="information date :">
        <InfoDate></InfoDate>
      </el-form-item>

      <el-form-item label="information title :">
        <InfoTitle></InfoTitle>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useForm } from '@/store/useForm';

import InfoType from './components/info-type.vue';
import InfoDate from './components/info-date.vue';
import InfoTitle from './components/info-title.vue';

const { form } = useForm();

// TODO delete watch
watch(
  () => form,
  () => {
    console.log(form.informationType);
  },
  {
    deep: true,
  },
);
</script>

<style></style>
