<template>
  <div>
    <div class="flex flex-col gap-y-8 mb-4">
      <transition-group name="fade" tag="ul" class="relative flex flex-col gap-y-4">
        <el-form
          label-width="auto"
          class="flex w-full justify-between p-2 rounded-lg bg-[#90939920]"
          v-for="(listNote, listNoteIndex) in listNoteData"
          :key="listNote"
        >
          <!-- list note form -->
          <div class="w-full flex flex-col gap-y-4">
            <!-- title -->
            <el-form-item label="title: ">
              <el-input v-model="listNote.title" />
            </el-form-item>

            <!-- subtitle -->
            <el-form-item label="subtitle">
              <el-input v-model="listNote.subtitle" />
            </el-form-item>

            <!-- children -->
            <el-form-item label="children: ">
              <div class="flex flex-col gap-4 w-full">
                <div v-for="(maxRows, rowIndex) in listNote.children" :key="rowIndex" class="">
                  <div class="flex gap-x-2">
                    <el-input
                      v-for="(_, colIndex) in maxRows"
                      :key="colIndex"
                      v-model="listNote.children[rowIndex][colIndex]"
                      @input="reRenderChildren(listNoteIndex)"
                    />
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>

          <!-- delete button -->
          <div class="w-[15%] flex justify-center items-center">
            <el-button @click="deleteListNote(listNoteIndex)" type="danger" plain>delete</el-button>
          </div>
        </el-form>
      </transition-group>
    </div>

    <el-button @click="addListNote">add new list note</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import syncData from '@/utils/syncData';
import {
  getLastValuableColIndex,
  getLastValuableRowIndex,
} from '@/utils/arrayLastValuableIndexFinder';

type TListNote = Array<{
  title: string;
  subtitle: string;
  children: Array<Array<string>>;
}>;

const props = defineProps({
  componentId: Number,
});

const listNoteData: Ref<TListNote> = ref([
  {
    title: '',
    subtitle: '',
    children: [
      ['', ''],
      ['', ''],
    ],
  },
]);

function addListNote() {
  listNoteData.value.push({
    title: '',
    subtitle: '',
    children: [
      ['', ''],
      ['', ''],
    ],
  });
}

/**
 * Re-render the children of a list note based on the provided list note index.
 *
 * @param {number} listNoteIndex - The index of the list note to re-render.
 * @returns {void}
 */
function reRenderChildren(listNoteIndex: number): void {
  const children: Array<Array<string>> = listNoteData.value[listNoteIndex].children;

  const maxRows: number = children.length - 1;
  const maxCols: number = children[0].length - 1;

  const valuableRow: number = getLastValuableRowIndex(children, maxRows, maxCols);
  const valuableCol: number = getLastValuableColIndex(children, maxRows, maxCols);

  if (valuableRow === maxRows) {
    /**
     * When the number of valuable rows equals the maximum number of rows,
     * create a new row with the same length as the first row and add it.
     */
    const temp: Array<string> = Array.from({ length: children[0].length }, () => '');
    listNoteData.value[listNoteIndex].children.push(temp);
  } else if (valuableRow + 1 < maxRows) {
    /**
     * When the number of valuable rows + 1 is less than the maximum number of rows,
     * there are empty rows present, so remove them.
     */
    const distance = maxRows - valuableRow + 1; // We need valuableRow + 1 rows, which means we need exactly one empty row.
    listNoteData.value[listNoteIndex].children.splice(valuableRow + 2, distance); // We start deleting from the row index valuableRow + 1, and we delete maxRows - valuableRow + 1 rows in total.
  }

  if (valuableCol === maxCols) {
    /**
     * When the number of valuable columns equals the maximum number of columns,
     * add an empty string to the end of each row.
     */
    listNoteData.value[listNoteIndex].children = listNoteData.value[listNoteIndex].children.map(
      (row) => [...row, ''],
    );
  } else if (valuableCol + 1 < maxCols) {
    /**
     * When the number of valuable columns + 1 is less than the maximum number of columns,
     * there are empty spaces at the end of each row, so remove them.
     */
    const distance = maxCols - valuableCol + 1;
    listNoteData.value[listNoteIndex].children.map((row) => row.splice(valuableCol + 2, distance));
  }
}

function deleteListNote(listNoteIndex: number): void {
  listNoteData.value.splice(listNoteIndex, 1);
}

watch(
  () => listNoteData.value,
  () => {
    syncData(props.componentId!, { listNotes: listNoteData.value });
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
  z-index: -1;
}

.fade-leave-active {
  position: absolute;
}
</style>
