<template>
  <div>
    <el-tree
      v-for="(data, index) in dataSources"
      :key="index"
      :data="data"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      class="rounded-lg opacity-50"
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

    <el-button @click="t">123</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type Node from 'element-plus/es/components/tree/src/model/node';

type TTree = {
  id: number;
  label: string;
  children?: TTree[];
};

let id = 0;

const dataSources = ref<Array<Array<TTree>>>([[]]);

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

const t = () => {
  if (!dataSources.value[0]) dataSources.value[0] = [];
  dataSources.value[0].push({
    id,
    label: '121',
  });
};
</script>

<style></style>
