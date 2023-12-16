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
        class="w-[50px] h-[50px] m-[5px] bg-[#409EFF] rounded-md transition-all duration-300 ease-in-out hover:cursor-pointer hover:shadow-lg hover:translate-y-[-5px]"
        @click="setText(id)"
      >
        {{ id }}
      </div>
    </div>

    <el-dialog v-model="setTextVisible" title="Outer Dialog" draggable>
      <template #default>
        <el-form>
          <el-form-item label="text: ">
            <el-input v-model="text[editingRowIndex][editingColIndex]" />
          </el-form-item>
        </el-form>
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

function setText(index: number): void {
  // Because the index traversed through v-for starts from 1, you need to manually decrease it by one.
  editingRowIndex.value = Math.floor((index - 1) / cols.value);
  editingColIndex.value = Math.floor((index - 1) % cols.value);

  console.log(editingRowIndex.value);
  console.log(editingColIndex.value);

  setTextVisible.value = true;
}

watch(
  () => text.value,
  () => {
    console.log(text.value);
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style></style>
