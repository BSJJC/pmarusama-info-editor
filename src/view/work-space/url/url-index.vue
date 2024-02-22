<template>
  <div class="w-full h-full py-10 px-5">
    <el-scrollbar height="85vh" class="w-full">
      <div class="flex flex-col justify-center items-center w-full space-y-10">
        <div class="flex w-1/2 justify-center items-center space-x-4">
          <span>url:</span>
          <el-input v-model="url" />
        </div>

        <link-prevue :url="url"></link-prevue>

        <el-button
          v-show="urlPattern.test(url)"
          type="primary"
          plain
          round
          class="w-full h-[5vh] text-lg"
        >
          submit
        </el-button>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LinkPrevue from 'link-prevue';

const url: Ref<string> = ref('');
const urlPattern: RegExp = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})(\/\S*)?$/i;
</script>

<style></style>
