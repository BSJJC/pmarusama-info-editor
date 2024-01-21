<template>
  <div>
    <div
      v-for="(data, index) in dataSources"
      :key="index"
      class="flex justify-between items-center"
    >
      <div class="w-full flex justify-between items-center">
        <el-tree
          :data="data"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          class="rounded-lg w-[90%]"
        >
          <template #default="{ node, data }">
            <span class="flex flex-1 justify-between items-center pr-[8px] py-4">
              <span class="text-lg">{{ node.label }}</span>
              <span>
                <a @click="append(data, index)">Append</a>
                <a style="margin-left: 8px" @click="remove(node, data, index)">Delete</a>
              </span>
            </span>
          </template>
        </el-tree>

        <el-button
          :disabled="dataSources.length === 1"
          type="danger"
          plain
          @click="showDeleteTree(index)"
        >
          delete
        </el-button>
      </div>
    </div>

    <!-- add new tree dialog -->
    <el-dialog v-model="setNewTree" :show-close="false" draggable align-center class="rounded-lg">
      <div class="flex justify-between">
        <span>add new tree:</span>
        <el-input type="text" v-model="newTreeText" class="w-[80%]" />
      </div>

      <template #footer>
        <span>
          <el-button @click="setNewTree = false">Cancel</el-button>
          <el-button type="primary" plain @click="addNewTree">Confirm</el-button>
        </span>
      </template>
    </el-dialog>

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

const dataSources = ref<Array<Array<TTree>>>([]);

const setNewTree: Ref<boolean> = ref(true);
const newTreeText: Ref<string> = ref('');
const setDeleteTree: Ref<boolean> = ref(false);
const deleteTreeData = ref<Array<TTree>>([]);

function addNewTree(): void {
  dataSources.value.push([
    {
      id,
      label: newTreeText.value,
      children: [],
    },
  ]);

  setNewTree.value = false;
}

/**
 * Append a new child node to a given tree node.
 *
 * @param {TTree} data The tree node to which a child will be appended.
 * @param {number} index The index of the data source array.
 * @returns {void}
 */
function append(data: TTree, index: number): void {
  const newChild = { id: id++, label: 'testtest', children: [] };
  if (!data.children) data.children = [];

  data.children.push(newChild);
  dataSources.value[index] = [...dataSources.value[index]];
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

/**
 * Show the delete tree dialog with the data of a specific tree.
 *
 * @param {number} index The index of the data source array.
 * @returns {void}
 */
function showDeleteTree(index: number): void {
  deleteTreeData.value = dataSources.value[index];
  setDeleteTree.value = true;
}
</script>

<style></style>
