<template>
  <el-radio-group v-model="type" class="w-full flex justify-between items-center">
    <el-radio-button label="form" class="w-[48%]" @click="toForm"></el-radio-button>

    <el-radio-button label="url" class="w-[48%]" @click="toUrl"></el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const type: Ref<'form' | 'url'> = ref('form');
const router = useRouter();
const route = useRoute();

function toForm(): void {
  router.push('/form');
}

function toUrl(): void {
  router.push('/url');
}

onMounted(() => {
  const path = route.path;
  path.match('form') ? (type.value = 'form') : (type.value = 'url');
});
</script>

<style>
.el-radio-button__inner {
  width: 100%;
  font-size: 1.125rem;
}
</style>
