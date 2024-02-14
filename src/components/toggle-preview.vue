<template>
  <div>
    <div
      class="absolute bottom-0 w-full h-[8vh] translate-y-[50%] flex flex-col justify-center items-center bg-[#409EFF] text-white rounded-t-lg transition-all duration-300 ease-in-out hover:cursor-pointer hover:translate-y-0"
      @click="showPreview = true"
    >
      <el-icon class="font-bold text-2xl h-1/2 bounce" color="white">
        <ArrowUpBold />
      </el-icon>
      <span class="h-1/2 text-lg font-bold">show preview</span>
    </div>

    <el-drawer v-model="showPreview" direction="btt" :size="drawerHeight" class="rounded-lg">
      <el-button
        @click="drawerHeight === '100%' ? (drawerHeight = '50%') : (drawerHeight = '100%')"
      >
        max
      </el-button>

      <previewIndex></previewIndex>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import previewIndex from '@/view/preview/preview-index.vue';

const showPreview: Ref<boolean> = ref(false);
const drawerHeight: Ref<'50%' | '100%'> = ref('50%');
</script>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(10%);
  }

  50% {
    transform: translateY(-10%);
  }
}

.bounce {
  animation: bounce 2s infinite;
}
</style>
