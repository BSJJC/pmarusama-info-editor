<template>
  <div>
    <div
      v-for="(data, index) in dataSources"
      :key="index"
      class="flex flex-col justify-between items-center"
    >
      <div class="w-full flex justify-between items-center mb-4">
        <el-tree
          :data="data"
          empty-text="If no data is present upon submission, the component will be deleted."
          node-key="id"
          draggable
          default-expand-all
          :expand-on-click-node="false"
          class="rounded-lg w-[90%]"
        >
          <template #default="{ node, data }">
            <span class="flex flex-1 justify-between items-center pr-[8px] text-base">
              <span>{{ node.label }}</span>
              <span>
                <a @click="append(data, index)" class="text-[#409EFF]">Append</a>
                <a @click="remove(node, data, index)" class="text-[#F56C6C] ml-[8px]">Delete</a>
              </span>
            </span>
          </template>
        </el-tree>

        <el-button
          :disabled="dataSources.length === 1"
          type="danger"
          plain
          @click="dataSources.splice(index, 1)"
        >
          delete
        </el-button>
      </div>
    </div>

    <div class="mt-4 w-[90%] flex justify-end">
      <el-button type="primary" plain @click="addNewTree">add new tree</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type Node from 'element-plus/es/components/tree/src/model/node';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useForm } from '@/store/useForm';

type TTree = {
  id: number;
  label: string;
  children?: Array<TTree>;
};

const props = defineProps({
  componentId: Number,
});

const { form } = useForm();

let id = 0;

const dataSources = ref<Array<Array<TTree>>>([[]]);

function addNewTree(): void {
  ElMessageBox.prompt('Add new tree', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    draggable: true,
  })
    .then(({ value }) => {
      // when data is empty, exchange it with new data.
      if (dataSources.value.length === 1 && dataSources.value[0].length === 0) {
        dataSources.value[0] = [
          {
            id,
            label: value,
            children: [],
          },
        ];
      } else {
        dataSources.value.push([
          {
            id,
            label: value,
            children: [],
          },
        ]);
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      });
    });
}

/**
 * Append a new child node to a given tree node.
 *
 * @param {TTree} data The tree node to which a child will be appended.
 * @param {number} index The index of the data source array.
 * @returns {void}
 */
function append(data: TTree, index: number): void {
  ElMessageBox.prompt('Please input new tree', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `Your email is:${value}`,
      });

      const newChild = {
        id: id++,
        label: value,
        children: [],
      };
      if (!data.children) data.children = [];

      data.children.push(newChild);
      dataSources.value[index] = [...dataSources.value[index]];
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      });
    });
}

/**
 * Remove a specified tree node.
 *
 * @param {Node} node The tree node to be removed.
 * @param {TTree} data The data of the tree node to be removed.
 * @param {number} index The index of the data source array.
 * @returns {void}
 */
function remove(node: Node, data: TTree, index: number): void {
  const parent = node.parent;
  const children: TTree[] = parent.data.children || parent.data;
  const position = children.findIndex((d) => d.id === data.id);
  children.splice(position, 1);
  dataSources.value[index] = [...dataSources.value[index]];
}

watch(
  () => dataSources.value,
  () => {
    form.data.components[props.componentId!].data = dataSources.value;
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style></style>
