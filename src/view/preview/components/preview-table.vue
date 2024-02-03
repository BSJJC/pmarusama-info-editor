<template>
  <table>
    <tr v-for="(trArr, index) in table" :key="index" class="flex mb-8">
      <td v-for="(tdArr, strIndex) in trArr" :key="strIndex" class="min-w-[100px] text-[#787878]">
        <template v-for="text in tdArr" :key="tdArr[text]">
          <div v-if="text">{{ text }}</div>
          <br v-else />
        </template>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
/**
 * Example data for a table component.
 *
 * const tableData: TData = {
 *
 *   text: [
 *     // First <tr> tag
 *     [
 *       // First <td> tag
 *       ['Cell 1', null], // If 'Cell 1' is meaningful, render it; otherwise, render a <br/>
 *       // Second <td> tag
 *       ['Cell 2', 'Cell 3'], // Render 'Cell 2' and 'Cell 3'
 *       // ...
 *     ],
 *     // Second <tr> tag
 *     [
 *       ['Cell 4', null],
 *       ['Cell 5', 'Cell 6'],
 *       // ...
 *     ],
 *     // ...
 *   ],
 * };
 *
 *
 * In this example, `tableData` is an instance of the `TData` type, representing a table with class name
 * "tableClass" and specific content for each <td> tag, including handling for meaningful strings and null values.
 */
type TData = {
  table: Array<Array<Array<string | null>>>;
};

const props = defineProps({
  data: Object as () => TData,
});

const table = props.data?.table;
</script>

<style scoped>
table {
  word-break: break-all;
  line-height: 1.8;
}
</style>
