<template>
  <div class="flex justify-center items-start flex-wrap w-full">
    {{ ul }}
    <div
      v-for="(i, index) in ul"
      :key="index"
      class="md:w-1/2 mt-10 transition-all duration-75 sm:w-full w-full"
    >
      <p class="font-bold">
        {{ i[0].label }}
      </p>

      <div v-if="i[0].children?.length !== 0" class="ml-[30px]">
        <ul-childe :data="{ ul: i[0].children! }"></ul-childe>
      </div>
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
  ul: Array<Array<TTree>>;
};

const props = defineProps({
  data: Object as () => TData,
});

const ul = props.data?.ul;

console.log(ul);
</script>

<style scoped>
p {
  line-height: 1.8;
  color: #787878;
  font-size: large;
}
</style>
