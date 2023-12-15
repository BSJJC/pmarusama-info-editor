<template>
  <div class="space-y-4">
    <div
      class="grid"
      :style="{
        gridTemplateRows: `repeat(${rows},1fr)`,
        gridTemplateColumns: `repeat(${cols},1fr)`,
      }"
    >
      <div
        v-for="id in rows * cols"
        :key="id"
        class="w-[50px] h-[50px] m-[5px] bg-[#a6a9ad] transition-all duration-75 ease-in-out hover:rounded-lg hover:cursor-pointer hover:shadow-lg hover:translate-y-[-5px]"
      >
        {{ id }}
      </div>
    </div>

    <el-dialog v-model="outerVisible" title="Outer Dialog">
      <template #default>
        <el-dialog v-model="innerVisible" width="30%" title="Inner Dialog" append-to-body />
      </template>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="outerVisible = false">Cancel</el-button>
          <el-button type="primary" @click="innerVisible = true">open the inner Dialog</el-button>
        </div>
      </template>
    </el-dialog>

    <div>
      <el-form label-width="50px" class="space-y-2">
        <el-form-item label="rows: ">
          <el-input-number v-model="rows" :min="1" :max="6" />
        </el-form-item>

        <el-form-item label="cols: ">
          <el-input-number v-model="cols" :min="1" :max="6" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';

type TText = Array<Array<string | null>>;

const rows: Ref<number> = ref(3);
const cols: Ref<number> = ref(3);

const text: TText = [];

const outerVisible = ref(false);
const innerVisible = ref(false);

setTimeout(() => {
  outerVisible.value = true;
}, 1000);
</script>

<style></style>
