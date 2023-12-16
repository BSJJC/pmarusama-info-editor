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
        class="w-[50px] h-[50px] m-[5px] flex justify-center items-center text-white text-lg font-bold rounded-md transition-all duration-300 ease-in-out hover:cursor-pointer hover:shadow-lg hover:translate-y-[-5px]"
        :style="{
          backgroundColor: `${
            text[calculateRowPosition(id)][calculateColPosition(id)].length === 0
              ? '#909399'
              : '#409EFF'
          }`,
        }"
        @click="setText(id)"
      >
        {{ text[calculateRowPosition(id)][calculateColPosition(id)][0] }}
      </div>
    </div>

    <div class="flex items-end flex-col space-y-2">
      <div class="flex space-x-2">
        <span>Unedited:</span>
        <div class="w-[30px] h-[30px] bg-[#909399] rounded-md"></div>
      </div>
      <div class="flex space-x-2">
        <span>Edited:</span>
        <div class="w-[30px] h-[30px] bg-[#409EFF] rounded-md"></div>
      </div>
    </div>

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

    <el-dialog
      v-model="setTextVisible"
      :title="`row: ${editingRowIndex + 1} col: ${editingColIndex + 1}`"
      draggable
    >
      <template #default>
        <el-form>
          <el-form-item label="text: ">
            <el-input v-model="text[editingRowIndex][editingColIndex]" />
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <span>
          <el-button @click="cancelSetText">Cancel</el-button>
          <el-button type="primary" @click="setTextVisible = false" plain>Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';

type TText = Array<Array<Array<string | null>>>;

const rows: Ref<number> = ref(3);
const cols: Ref<number> = ref(3);
const editingRowIndex: Ref<number> = ref(0);
const editingColIndex: Ref<number> = ref(0);

const text: Ref<TText> = ref(generateTextArray());

const setTextVisible = ref(false);

function generateTextArray(): TText {
  let arr: TText = [];

  for (let row = 0; row < rows.value; row++) {
    arr.push([] as Array<Array<string | null>>);

    for (let col = 0; col < cols.value; col++) {
      arr[row].push([]);
    }
  }

  return arr;
}

function calculateRowPosition(index: number): number {
  // Because the index traversed through v-for starts from 1, you need to manually decrease it by one.
  return Math.floor((index - 1) / cols.value);
}

function calculateColPosition(index: number): number {
  // Because the index traversed through v-for starts from 1, you need to manually decrease it by one.
  return Math.floor((index - 1) % cols.value);
}

function setText(index: number): void {
  editingRowIndex.value = calculateRowPosition(index);
  editingColIndex.value = calculateColPosition(index);

  setTextVisible.value = true;
}

function cancelSetText(): void {
  text.value[editingRowIndex.value][editingColIndex.value] = [];

  setTextVisible.value = false;
}

watch(
  () => [rows.value, cols.value],
  () => {
    text.value = generateTextArray();
  },
  { immediate: true, deep: true },
);

watch(
  () => text.value,
  () => {
    console.log(text.value);
  },
  { immediate: true, deep: true },
);
</script>

<style></style>
