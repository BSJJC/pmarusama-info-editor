<template>
  <div>table test</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  getLastValuableColIndex,
  getLastValuableRowIndex,
} from '@/utils/arrayLastValuableIndexFinder';

type TTable = Array<Array<Array<string | null>>>;

const table: TTable = [];
</script>

<style></style>
