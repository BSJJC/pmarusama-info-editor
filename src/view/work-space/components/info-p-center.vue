<template>
  <div class="flex flex-col space-y-4">
    <div
      v-for="i in (form.data.components[props.componentId!].data as TData).text.length"
      :key="i"
      class="w-[400px] flex justify-between items-center"
    >
      <el-input
        id="textarea-center"
        v-if="(form.data.components[props.componentId!].data as TData).text[i - 1] !== null"
        type="textarea"
        class="w-[300px]"
        v-model="(form.data.components[props.componentId!].data as TData).text[i - 1]"
      />

      <div v-else class="w-full text-center mx-1 text-[#e6a23c] text-[1rem]">
        <b>an empty line here</b>
      </div>

      <el-button
        :disabled="(form.data.components[props.componentId!].data as TData).text.length <= 1"
        type="danger"
        plain
        @click="deleteLine(i - 1)"
      >
        delete
      </el-button>
    </div>

    <div>
      <el-button @click="addNewLine" type="primary" plain>start a new line</el-button>
      <el-button @click="addEmptyLine" type="warning" plain>add an empty line</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/store/useForm';

type TData = {
  text: Array<string | null>;
};

const props = defineProps({
  componentId: Number,
  data: Object,
});

const { form } = useForm();

// initial text array
(form.data.components[props.componentId!].data as TData).text = [''];

function addNewLine(): void {
  (form.data.components[props.componentId!].data as TData).text.push('');
}

function addEmptyLine(): void {
  (form.data.components[props.componentId!].data as TData).text.push(null);
}

function deleteLine(index: number) {
  (form.data.components[props.componentId!].data as TData).text.splice(index, 1);
}
</script>

<style>
#textarea-center {
  text-align: center;
}
</style>
