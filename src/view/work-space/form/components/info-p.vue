<template>
  <div class="flex flex-col space-y-4">
    <div
      v-for="(msgs, index) in texts"
      :key="index"
      class="flex justify-between items-center p-2 bg-[#a6a9ad20] rounded-lg"
    >
      <!-- empty line -->
      <div v-if="msgs === null" class="mx-1 text-[#e6a23c] text-[1rem]">
        <b>an empty line here</b>
      </div>

      <!-- not empty line -->
      <div v-else class="w-[80%] flex flex-col gap-4">
        <div v-for="(msg, msgIndex) in msgs" :key="msgIndex">
          <!-- string msg -->
          <el-input v-if="msg.type === 'string'" type="textarea" v-model="msg.msg" />

          <!-- hyperlink msg -->
          <div
            v-else-if="(msg.type = 'hyperlink')"
            class="flex flex-col text-base text-[#909399] gap-y-2"
          >
            <div class="flex flex-row gap-x-2">
              <span>text:</span>
              <el-input v-model="msg.msg.text" />
            </div>

            <div class="flex flex-row gap-x-2">
              <span>link:</span>
              <el-input v-model="msg.msg.link" />
            </div>
          </div>
        </div>
      </div>

      <el-button :disabled="texts.length === 1" type="danger" plain @click="deleteLine(index)">
        delete
      </el-button>
    </div>

    <div class="flex justify-between items-center">
      <el-button @click="addNewLine" type="primary" plain>start a new line</el-button>

      <div>
        <el-popover placement="top-start" wdith="350" trigger="hover">
          <template #reference>
            <el-button
              @click="connectMsg('hyperlink')"
              type="primary"
              plain
              :disabled="addEmptyLineActive()"
            >
              connect hyperlink
            </el-button>
          </template>

          <template #default>
            <span v-if="!addEmptyLineActive()">
              this operation does not create a new line, but as part of the previous line of an a
              tag.
            </span>

            <span v-else>a tag can not be connected to a null line.</span>
          </template>
        </el-popover>

        <el-popover placement="top-start" wdith="350" trigger="hover">
          <template #reference>
            <el-button
              @click="connectMsg('string')"
              type="primary"
              plain
              :disabled="addEmptyLineActive()"
            >
              connect string
            </el-button>
          </template>

          <template #default>
            <span v-if="!addEmptyLineActive()">
              this operation does not create a new line, but as part of the previous line of an a
              tag.
            </span>

            <span v-else>can not be connected to a null line.</span>
          </template>
        </el-popover>
      </div>

      <el-button @click="addEmptyLine" type="warning" plain>add an empty line</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { useForm } from '@/store/useForm';

const props = defineProps({
  componentId: Number,
});

const { form } = useForm();

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

const texts: Ref<Array<TtextMsg | null>> = ref([[{ type: 'string', msg: '' }]]);

function addNewLine(): void {
  texts.value.push([
    {
      type: 'string',
      msg: '',
    },
  ]);
}

function connectMsg(type: 'string' | 'hyperlink'): void {
  const msgIndex = texts.value.length - 1;

  if (type === 'hyperlink') {
    texts.value[msgIndex]!.push({
      type: 'hyperlink',
      msg: {
        text: '',
        link: '',
      },
    });
  } else if (type === 'string') {
    texts.value[msgIndex]!.push({
      type: 'string',
      msg: '',
    });
  }
}

function addEmptyLineActive(): boolean {
  if (texts.value[texts.value.length - 1]) return false;
  else return true;
}

function addEmptyLine(): void {
  texts.value.push(null);
}

function deleteLine(index: number) {
  texts.value.splice(index, 1);
}

watch(
  () => texts.value,
  () => {
    form.data.components[props.componentId!].data = {
      texts: texts.value,
    };
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style></style>
