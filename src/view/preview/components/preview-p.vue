<template>
  <div>
    <div v-for="(msgs, msgIndex) in texts" :key="msgIndex">
      <div v-for="(msg, msgIndex) in msgs" :key="msgIndex">
        <div v-if="msg.type === 'string'" v-html="msg.msg"></div>

        <a v-else-if="msg.type === 'hyperlink'" :href="msg.msg.link" target="_blank">
          {{ msg.msg.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const texts = props.data?.texts;
</script>

<style scoped>
p {
  line-height: 1.8;
  color: #787878;
}
</style>
