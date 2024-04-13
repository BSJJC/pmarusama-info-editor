<template>
  <div>
    <div class="flex flex-col space-y-2">
      <div
        v-for="rows in maxRows"
        :key="rows"
        class="w-full h-[40px] flex flex-row justify-start items-center space-x-4"
      >
        <div
          v-for="cols in maxCols"
          :key="cols"
          class="w-[50px] h-[40px] rounded-lg bg-[#909399] transition-all ease-in-out duration-100 hover:cursor-pointer hover:-translate-y-1"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  getLastValuableColIndex,
  getLastValuableRowIndex,
} from '@/utils/arrayLastValuableIndexFinder';

type TTable = Array<Array<Array<string | null>>>;

const table: TTable = [];

const maxRows = 8;
const maxCols = 8;
</script>

<style></style>
