<template>
  <div class="w-full h-full py-10 px-5">
    <el-scrollbar height="85vh" class="w-full">
      <div class="flex flex-col justify-center items-center w-full space-y-10">
        <div class="flex w-1/2 justify-center items-center space-x-4">
          <span class="text-lg font-bold text-[#409EFF]">url:</span>
          <el-input
            ref="urlInputRef"
            v-model="inputUrl"
            @change="checkIfSiteExists()"
            @input="isSiteAvailable = null"
            @keyup.enter="urlInputRef!.blur()"
          />
        </div>

        <!-- animations -->
        <div
          class="w-full h-[50vh] flex justify-center items-center flex-col overflow-hidden text-[2rem] font-bold"
        >
          <transition mode="out-in">
            <div
              v-if="isSiteAvailable === null"
              class="w-full h-full flex justify-center items-center flex-col"
            >
              <lottie-player autoplay loop :src="waiting" class="h-1/2"></lottie-player>
              <span class="text-[#909399] animate-bounce">waiting for url...</span>
            </div>

            <div
              v-else-if="isSiteAvailable === true"
              class="w-full h-full flex justify-center items-center flex-col"
            >
              <lottie-player autoplay loop :src="success" class="h-1/2"></lottie-player>
              <span class="text-[#67C23A] animate-bounce">url available!</span>
            </div>

            <div
              v-else-if="isSiteAvailable === false"
              class="w-full h-full flex justify-center items-center flex-col"
            >
              <lottie-player autoplay loop :src="notFound" class="h-1/2"></lottie-player>
              <span class="text-[#F56C6C] animate-bounce">url unavailable...</span>
            </div>
          </transition>
        </div>

        <el-button
          :disabled="!urlPattern.test(inputUrl) && !isSiteAvailable"
          type="primary"
          round
          plain
          class="w-full h-[5vh] text-lg"
        >
          submit
        </el-button>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
export default {
  name: 'url-index',
};
</script>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import '@lottiefiles/lottie-player';

import waiting from '@/assets/lottieAnimations/waiting.json';
import success from '@/assets/lottieAnimations/success.json';
import notFound from '@/assets/lottieAnimations/not-found.json';

const urlInputRef: Ref<HTMLInputElement | undefined> = ref();

const inputUrl: Ref<string> = ref('');
const urlPattern: RegExp = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})(\/\S*)?$/i;
const isSiteAvailable: Ref<boolean | null> = ref(null);

/**
 * Checks if the site exists by making a request to the specified URL.
 * Updates the `isSiteAvailable` variable accordingly.
 * @returns {Promise<void>} A Promise that resolves when the site existence check is complete.
 */
async function checkIfSiteExists(): Promise<void> {
  if (!inputUrl.value) {
    isSiteAvailable.value = null;
    return;
  }

  if (!urlPattern.test(inputUrl.value)) {
    isSiteAvailable.value = false;
    return;
  }

  await fetch(`https://link-preview-api.nivaldo.workers.dev/preview?url=${inputUrl.value}`).then(
    (res) => {
      res.json().then((e) => {
        typeof e.title === 'string'
          ? (isSiteAvailable.value = true)
          : (isSiteAvailable.value = false);
      });
    },
  );
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
