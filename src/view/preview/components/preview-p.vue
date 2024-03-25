<template>
  <div>
    <div v-for="(i, index) in _texts" :key="index">
      <div v-if="i" v-html="i"></div>

      <br v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type TstringMsg = {
  type: 'string';
  msg: string;
};

type ThyperlinkMsg = {
  type: 'hyperlink';
  msg: {
    text: string;
    link: string;
  };
};

type TtextMsg = Array<TstringMsg | ThyperlinkMsg>;

type TData = {
  texts: Array<TtextMsg | null>;
};

const props = defineProps({
  data: Object as () => TData,
});

const texts = props.data!.texts;

const _texts = computed(() => {
  return texts.map((texts) => {
    if (!texts) return null;

    return texts.reduce((acc, msg) => {
      switch (msg.type) {
        case 'string':
          return acc + msg.msg;

        case 'hyperlink':
          return `${acc} <a href="${msg.msg.link}" target="_blank">${msg.msg.text}</a> `;

        default:
          return acc;
      }
    }, '');
  });
});
</script>

<style></style>
