<template>
  <div class="flex flex-col space-y-4">
    <div v-for="(i, index) in text.length" :key="i" class="flex justify-between items-center">
      <el-input
        v-if="text[i - 1] !== null"
        type="textarea"
        id="textarea-center"
        class="w-[80%]"
        v-model="text[index]"
      />

      <div v-else class="mx-1 text-[#e6a23c] text-[1rem] w-full text-center">
        <b>an empty line here</b>
      </div>

      <el-button :disabled="text.length === 1" type="danger" plain @click="deleteLine(i - 1)">
        delete
      </el-button>
    </div>

    <div class="flex justify-center items-center">
      <el-button @click="addNewLine" type="primary" plain>start a new line</el-button>
      <el-button @click="addEmptyLine" type="warning" plain>add an empty line</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { useForm } from '@/store/useForm';

const props = defineProps({
  componentId: Number,
});

const { form } = useForm();

const text: Ref<Array<string | null>> = ref(['']);

function addNewLine(): void {
  text.value.push('');
}

function addEmptyLine(): void {
  text.value.push(null);
}

function deleteLine(index: number) {
  text.value.splice(index, 1);
}

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

<style>
#textarea-center {
  text-align: center;
}
</style>
