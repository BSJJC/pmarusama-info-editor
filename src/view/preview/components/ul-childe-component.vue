<template>
  <div v-for="(i, index) in props.data?.ul" :key="index">
    <p>
      {{ i.label }}
    </p>

    <div v-if="i.children?.length !== 0" class="ml-[30px]">
      <ul-childe :data="{ ul: i.children! }"></ul-childe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const ulChilde = defineAsyncComponent(() => import('./ul-childe-component.vue'));

type TTree = {
  label: string;
  children?: Array<TTree>;
};

type TData = {
  ul: Array<TTree>;
};

const props = defineProps({
  data: Object as () => TData,
});
</script>

<style scoped>
p {
  line-height: 1.8;
  color: #787878;
  font-size: large;
}
</style>
