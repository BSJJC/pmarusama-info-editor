<template>
  <div>
    <p v-for="(i, index) in texts" :key="index" v-html="i || '<br/>'"></p>
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
</script>

<style scoped>
p {
  line-height: 1.8;
  color: #787878;
}
</style>
