<template>
  <div>
    <p v-for="(i, index) in texts" :key="index" v-html="i || '<br/>'" class="text-center"></p>
  </div>
</template>

<script setup lang="ts">
type TData = {
  texts: Array<string | null>;
};

const props = defineProps({
  data: Object as () => TData,
});

const texts = props.data?.texts;

console.log(texts);
</script>

<style scoped>
p {
  line-height: 1.8;
  color: #787878;
}
</style>
