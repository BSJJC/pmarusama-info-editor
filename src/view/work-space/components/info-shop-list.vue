<template>
  <div>
    <div class="flex w-full justify-between">
      <el-button type="primary" plain class="w-[45%]" @click="addExitShopImage">
        add exit shop
      </el-button>
      <el-button type="success" plain class="w-[45%]" @click="addNewShopImage">
        add new shop
      </el-button>
    </div>

    <el-dialog v-model="setShopImageVisible" title="Tips" draggable class="rounded-lg">
      <div v-if="pp === 'a'">a</div>

      <div v-else>b</div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';

const setShopImageVisible: Ref<boolean> = ref(false);

const pp: Ref<'a' | 'b'> = ref('a' || 'b');

function addExitShopImage(): void {
  setShopImageVisible.value = true;
  pp.value = 'a';
}

function addNewShopImage(): void {
  setShopImageVisible.value = true;
  pp.value = 'b';
}
</script>

<style></style>
