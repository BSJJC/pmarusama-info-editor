<template>
  <div>
    <div v-for="(list, index) in props.data?.listNotes" :key="index">
      <div
        v-for="(childrenList, childrenListIndex) in list.children.slice(0, -1)"
        :key="childrenListIndex"
      >
        <div v-for="(child, childIndex) in childrenList.slice(0, -1)" :key="childIndex">
          <!-- TODO render list note preview -->
          {{ child }}
        </div>
      </div>
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
