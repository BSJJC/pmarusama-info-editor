<template>
  <el-radio-group v-model="type" class="w-full h-[5vh] flex justify-between items-center">
    <el-radio-button label="form" class="w-[48%]">
      <router-link to="form">form</router-link>
    </el-radio-button>
    <el-radio-button label="url" class="w-[48%]">
      <router-link to="url">url</router-link>
    </el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';

const type: Ref<'form' | 'url'> = ref('form');
</script>

<style>
.el-radio-button__inner {
  width: 100%;
  font-size: 1.125rem;
  line-height: 1.75rem;
}
</style>
