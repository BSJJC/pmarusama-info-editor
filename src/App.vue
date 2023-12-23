<template>
  <div class="w-full h-screen flex flex-row relative">
    <WorkSpaceIndex></WorkSpaceIndex>
  </div>

  <div
    class="absolute bottom-0 w-full bg-[#66b1ff50] py-2 flex justify-center items-center translate-y-[50%] flex-col transition-all duration-300 ease-in-out hover:translate-y-0 hover:cursor-pointer hover:bg-[#66b1ff] hover:opacity-100"
    @click="showPreview = true"
  >
    <el-icon class="font-bold text-2xl" color="white"><ArrowUpBold /></el-icon>
    <span class="font-bold text-lg text-white">show preview</span>
  </div>

  <el-drawer v-model="showPreview" direction="btt" :size="drawerHeight">
    <el-button @click="drawerHeight = '100%'">123</el-button>

    <PreviewIndex></PreviewIndex>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import WorkSpaceIndex from './view/work-space/work-space-index.vue';
import PreviewIndex from './view/preview/preview-index.vue';

const showPreview: Ref<boolean> = ref(false);
const drawerHeight: Ref<'50%' | '100%'> = ref('50%' || '100%');
</script>

<style></style>
