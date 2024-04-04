<template>
  <div class="flex">
    <div
      v-for="(list, index) in props.data?.listNotes"
      :key="index"
      class="w-1/2 flex flex-col gap-y-1 text-[#787878]"
    >
      <!-- title -->
      <p class="text-lg font-bold">
        <strong>
          {{ list.title }}
        </strong>
      </p>

      <!-- subtitle -->
      <p v-if="list.subtitle">{{ list.subtitle }}</p>

      <!-- children -->
      <ul calss="table">
        <li v-for="(cells, cellsIndex) in list.children" :key="cellsIndex" class="table-row">
          <div
            v-for="(cell, cellIndex) in cells"
            :key="cellIndex"
            :class="cellIndex === 0 ? 'table-cell pr-[0.5rem] font-bold' : 'table-cell'"
          >
            {{ cell }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
type TListNote = Array<{
  title: string;
  subtitle: string;
  children: Array<Array<string>>;
}>;

type TData = {
  listNotes: TListNote;
};

const props = defineProps({
  data: Object as () => TData,
});
</script>

<style></style>
