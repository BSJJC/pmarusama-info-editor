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
        :id="`editingBlockRef-${props.componentId}-${id}`"
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
        {{ text[calculateRowPosition(id)][calculateColPosition(id)][0]?.slice(0, 1) }}
      </div>
    </div>

    <div class="flex items-end flex-col space-y-2 mr-[5px]">
      <div class="flex space-x-2">
        <span>Unedited:</span>
        <div class="w-[30px] h-[30px] bg-[#909399] rounded-md"></div>
      </div>
      <div class="flex space-x-2">
        <span>Editing:</span>
        <div class="w-[30px] h-[30px] bg-[#67c23a] rounded-md"></div>
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
      @close="checkOnClose"
    >
      <template #default>
        <div class="flex flex-col space-y-4">
          <div
            v-for="(i, index) in text[editingRowIndex][editingColIndex].length"
            :key="i"
            class="w-full flex justify-between items-center"
          >
            <el-input
              v-if="text[editingRowIndex][editingColIndex][i - 1] !== null"
              type="textarea"
              class="w-[80%]"
              v-model="text[editingRowIndex][editingColIndex][index]"
            />

            <div v-else class="mx-1 text-[#e6a23c] text-[1rem]">
              <b>an empty line here</b>
            </div>

            <el-button
              :disabled="text[editingRowIndex][editingColIndex].length === 1"
              type="danger"
              plain
              @click="deleteLine(i)"
            >
              delete
            </el-button>
          </div>

          <div>
            <el-button type="primary" plain @click="addNewLine">start a new line</el-button>
            <el-button type="warning" plain @click="addEmptyLine">add an empty line</el-button>
          </div>
        </div>
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
import { useForm } from '@/store/useForm';

const props = defineProps({
  componentId: Number,
});

type TText = Array<Array<Array<string | null>>>;

const { form } = useForm();

const rows: Ref<number> = ref(3);
const cols: Ref<number> = ref(3);
const editingRowIndex: Ref<number> = ref(0);
const editingColIndex: Ref<number> = ref(0);
const editingBlockRef: Ref<HTMLElement | undefined> = ref();

const text: Ref<TText> = ref(generateTextArray());

const setTextVisible = ref(false);

/**
 * generate the initial text array based on rows and columns
 *
 * @returns {TText} Initial text array
 */
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

/**
 * calculate the row positions based on the index
 *
 * @param {number} index - Index of the cell
 * @returns {number} Row position
 */
function calculateRowPosition(index: number): number {
  // Because the index traversed through v-for starts from 1, you need to manually decrease it by one.
  return Math.floor((index - 1) / cols.value);
}

/**
 * calculate the column positions based on the index
 *
 * @param {number} index - Index of the cell
 * @returns {number} Column position
 */
function calculateColPosition(index: number): number {
  // Because the index traversed through v-for starts from 1, you need to manually decrease it by one.
  return Math.floor((index - 1) % cols.value);
}

/**
 * set the text of the selected cell and open the editing dialog
 *
 * @param {number} index - Index of the selected cell
 * @returns {void}
 */
function setText(index: number): void {
  editingRowIndex.value = calculateRowPosition(index);
  editingColIndex.value = calculateColPosition(index);

  editingBlockRef.value = document.getElementById(`editingBlockRef-${props.componentId}-${index}`)!;

  editingBlockRef.value.classList.add('editing');

  // Initialize the array, otherwise the input component will not render
  if (text.value[editingRowIndex.value][editingColIndex.value].length === 0) {
    text.value[editingRowIndex.value][editingColIndex.value].push('');
  }

  setTextVisible.value = true;
}

function cancelSetText(): void {
  text.value[editingRowIndex.value][editingColIndex.value] = [];

  setTextVisible.value = false;
}

function addNewLine(): void {
  text.value[editingRowIndex.value][editingColIndex.value].push('');
}

function addEmptyLine(): void {
  text.value[editingRowIndex.value][editingColIndex.value].push(null);
}

function deleteLine(index: number): void {
  text.value[editingRowIndex.value][editingColIndex.value].splice(index - 1, 1);
}

/**
 * Check and clean up empty lines and null when closing the editing dialog.
 *
 * @param index The index of the cell being edited.
 * @returns {void}
 */
function checkOnClose(): void {
  editingBlockRef.value?.classList.remove('editing');

  let count = 0;

  /**
   * traverse the array, if it is null or length is 0, count++
   * stop traversing after traversing to a meaningful value
   * and delete count number of meaningless elements in the array starting from 0
   */
  for (let i = 0; i < text.value[editingRowIndex.value][editingColIndex.value].length; i++) {
    if (
      text.value[editingRowIndex.value][editingColIndex.value][i]?.length === 0 ||
      text.value[editingRowIndex.value][editingColIndex.value][i] === null
    ) {
      count++;
    } else {
      break;
    }
  }

  text.value[editingRowIndex.value][editingColIndex.value].splice(0, count);
}

watch(
  () => [rows.value, cols.value],
  () => {
    text.value = generateTextArray();
  },
  {
    immediate: true,
    deep: true,
  },
);

watch(
  () => text.value,
  () => {
    form.data.components[props.componentId!].data = text.value;
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style scoped>
.editing {
  background-color: #67c23a !important;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-5px);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
