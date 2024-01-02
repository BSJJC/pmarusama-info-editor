<template>
  <div>
    <div
      v-for="(data, index) in dataSources"
      :key="index"
      class="flex justify-between items-center"
    >
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        class="rounded-lg w-[80%]"
      >
        <template #default="{ node, data }">
          <span class="flex flex-1 justify-between items-center pr-[8px] text-[14px]">
            <span>{{ node.label }}</span>
            <span>
              <a @click="append(data, index)">Append</a>
              <a style="margin-left: 8px" @click="remove(node, data, index)">Delete</a>
            </span>
          </span>
        </template>
      </el-tree>

      <el-button type="danger" plain @click="showDeleteTree(index)">delete</el-button>
    </div>

    <!-- 
      delete tree dialog
     -->
    <el-dialog
      v-model="setDeleteTree"
      :show-close="false"
      draggable
      align-center
      class="rounded-lg"
    >
      <el-tree
        :data="deleteTreeData"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        class="rounded-lg"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import type Node from 'element-plus/es/components/tree/src/model/node';

type TTree = {
  id: number;
  label: string;
  children?: Array<TTree>;
};

let id = 0;

const dataSources = ref<Array<Array<TTree>>>([[]]);

const setDeleteTree: Ref<boolean> = ref(false);
const deleteTreeData = ref<Array<TTree>>([]);

function append(data: TTree, index: number): void {
  const newChild = { id: id++, label: 'testtest', children: [] };
  if (!data.children) data.children = [];

  data.children.push(newChild);
  dataSources.value[index] = [...dataSources.value[index]];
}

function remove(node: Node, data: TTree, index: number): void {
  const parent = node.parent;
  const children: TTree[] = parent.data.children || parent.data;
  const position = children.findIndex((d) => d.id === data.id);
  children.splice(position, 1);
  dataSources.value[index] = [...dataSources.value[index]];
}

function showDeleteTree(index: number): void {
  deleteTreeData.value = dataSources.value[index];
  setDeleteTree.value = true;
}
</script>

<style></style>
