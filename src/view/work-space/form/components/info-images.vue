<template>
  <div>
    <el-form>
      <div v-for="(image, index) in images" :key="index" class="mb-14 flex items-center">
        <div class="space-y-4 w-[80%]">
          <el-form-item label="file: ">
            <el-button @click="selectFile(index)">selct file</el-button>
            <input ref="uploadRef" type="file" class="hidden" @change="handleFiles(index)" />
          </el-form-item>

          <el-form-item label="alt: ">
            <el-input v-model="image.alt" />
          </el-form-item>

          <el-form-item label="preview" v-if="previewUrls[index]">
            <img :src="previewUrls[index]" alt="" class="max-h-[200px]" />
          </el-form-item>
        </div>

        <el-button
          type="danger"
          plain
          class="ml-auto"
          @click="deleteIamge(index)"
          :disabled="images.length === 1"
        >
          delete
        </el-button>
      </div>
    </el-form>

    <el-button type="primary" plain class="w-full" @click="addNewImage">add new image</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { useForm } from '@/store/useForm';

type TImages = {
  url: string;
  alt: string;
};

const props = defineProps({
  componentId: Number,
});

const { form } = useForm();

const uploadRef = ref();

const images: Ref<Array<TImages>> = ref([
  {
    url: '',
    alt: '',
  },
]);
const previewUrls: Ref<Array<string>> = ref([]);

function selectFile(index: number) {
  uploadRef.value[index].click();
}

function handleFiles(index: number) {
  const files = uploadRef.value[index].files;
  previewUrls.value.push(URL.createObjectURL(files[0]));
}

function addNewImage(): void {
  images.value.push({
    url: '',
    alt: '',
  });
}

function deleteIamge(index: number): void {
  images.value.splice(index, 1);
}

watch(
  () => images.value,
  () => {
    form.data.components[props.componentId!].data = {
      images: images.value,
    };
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style></style>
