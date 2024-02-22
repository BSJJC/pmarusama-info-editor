<template>
  <div class="w-full h-full py-10 px-5 flex flex-col justify-center items-center">
    <div class="w-full flex space-x-4 mb-4">
      <span>url:</span>
      <el-input v-model="_url" @change="completeInput" />
    </div>

    <TransitionGroup>
      <div
        v-if="legalURL === false"
        class="w-full h-full rounded-lg flex justify-center items-center"
      >
        <!-- <lottieAniamtion :data="animationData" class="w-1/2"></lottieAniamtion> -->
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onBeforeMount } from 'vue';
import lottieAniamtion from '@/components/lottie-aniamtion.vue';

const _url: Ref<string> = ref('');
const url: Ref<string> = ref('');

const legalURL: Ref<boolean> = ref(false);

const animationData: Ref<object | undefined> = ref<object>();

async function completeInput(): Promise<void> {}

onBeforeMount(async () => {
  animationData.value = (await import('@/assets/lottieAnimations/404.json')).default;
});
</script>

<style></style>
