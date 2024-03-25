<template>
  <div>
    <div v-for="(i, index) in _texts" :key="index">
      <span v-if="i" v-html="i"></span>

      <br v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type TStringMsg = {
  type: 'string';
  msg: string;
};

type THyperlinkMsg = {
  type: 'hyperlink';
  msg: {
    text: string;
    link: string;
  };
};

type TTextMsg = Array<TStringMsg | THyperlinkMsg>;

type TData = {
  texts: Array<TTextMsg | null>;
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
