<template>
  <div>
    <div
      class="absolute bottom-0 w-full h-[8vh] translate-y-[50%] flex flex-col justify-center items-center bg-[#409EFF] text-white rounded-t-lg transition-all duration-300 ease-in-out hover:cursor-pointer hover:translate-y-0 z-[999]"
      @click="showPreview = true"
    >
      <div
        class="w-full h-1/2 font-bold text-2xl text-center flex justify-center items-center bounce"
      >
        <el-icon color="white">
          <ArrowUpBold />
        </el-icon>
      </div>

      <span class="w-full h-1/2 text-lg text-center font-bold">show preview</span>
    </div>

    <el-drawer v-model="showPreview" direction="btt" :size="drawerHeight" class="rounded-lg">
      <el-button
        @click="drawerHeight === '100%' ? (drawerHeight = '50%') : (drawerHeight = '100%')"
      >
        max
      </el-button>

      <preview-index></preview-index>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, defineAsyncComponent } from 'vue';

const previewIndex = defineAsyncComponent(() => import('@/view/preview/preview-index.vue'));

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
