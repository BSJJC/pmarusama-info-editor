<template>
  <div>
    <div v-for="(i, index) in _texts" :key="index">
      <div v-if="i" v-html="i" class="w-full text-center"></div>

      <br v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';

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
const _texts: Array<string | null> = [];

onBeforeMount(() => {
  for (let i = 0; i < texts.length; i++) {
    const megs = texts[i];

    if (megs === null) {
      _texts[i] = null;
      continue;
    }

    _texts[i] = '';

    for (let j = 0; j < megs.length; j++) {
      switch (megs[j].type) {
        case 'string':
          (_texts[i] as string) += megs[j].msg;
          break;

        case 'hyperlink':
          (_texts[i] as string) += ` <a href=${(megs[j] as ThyperlinkMsg).msg.link} target=_blank>${
            (megs[j] as ThyperlinkMsg).msg.text
          }</a> `;
          break;
      }
    }
  }
});
</script>

<style></style>
