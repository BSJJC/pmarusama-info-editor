<template>
  <div class="flex flex-col space-y-4">
    <div v-for="i in (form.data.components[props.componentId!].data as TData).text.length" :key="i">
      <el-input
        v-if="(form.data.components[props.componentId!].data as TData).text[i - 1] !== null"
        type="textarea"
        class="w-[300px]"
        v-model="(form.data.components[props.componentId!].data as TData).text[i - 1]"
      />

      <el-text v-else class="mx-1 text-center" type="warning" size="large" tag="b">
        an empty line here
      </el-text>
    </div>

    <div>
      <el-button @click="addNewLine">start a new line</el-button>
      <el-button @click="addEmptyLine">add an empty line</el-button>
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

/**
 * add a new string line to text array.
 */
function addNewLine(): void {
  (form.data.components[props.componentId!].data as TData).text.push('');
}

/**
 * add a null to text array, which means an empty line.
 */
function addEmptyLine(): void {
  (form.data.components[props.componentId!].data as TData).text.push(null);
}
</script>

<style></style>
