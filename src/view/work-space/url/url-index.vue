<template>
  <div class="w-full h-full py-10 px-5 flex flex-col justify-center items-center">
    <div class="w-full flex space-x-4 mb-4">
      <span>url:</span>
      <el-input v-model="_url" @change="completeInput" />
    </div>

    <TransitionGroup>
      <div v-if="legalURL === null" class="w-full h-full rounded-lg">no URL</div>

      <div v-else-if="legalURL === false" class="w-full h-full rounded-lg">非法URL</div>

      <iframe v-else title="url preview" :src="url" class="w-full h-full rounded-lg"></iframe>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';

const _url: Ref<string> = ref('');
const url: Ref<string> = ref('');

const legalURL: Ref<boolean | null> = ref(null);
const urlRegex = /^(https?:\/\/)?(www\.)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

function completeInput(): void {
  if (!_url.value) {
    legalURL.value = null;
    url.value = '';
    return;
  }

  if (urlRegex.test(_url.value)) {
    legalURL.value = true;
    url.value = _url.value;
  } else {
    legalURL.value = false;
  }
}
</script>

<style></style>
