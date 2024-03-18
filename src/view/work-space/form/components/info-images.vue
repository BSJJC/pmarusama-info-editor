<template>
  <div>
    <el-form>
      <div v-for="(image, index) in images" :key="index" class="mb-14 flex items-center">
        <el-form label-width="auto" class="space-y-4 w-[80%]">
          <el-form-item label="file: ">
            <el-button type="primary" @click="selectFile(index)">selct file</el-button>
            <input ref="uploadRef" type="file" class="hidden" @change="handleFiles(index)" />
          </el-form-item>

          <el-form-item label="alt: ">
            <el-input v-model="image.alt" />
          </el-form-item>

          <el-form-item label="preview: " v-if="previewUrls[index]">
            <transition name="preview-img" mode="out-in">
              <img
                :src="previewUrls[index]"
                :key="previewUrls[index]"
                :alt="image.alt"
                class="h-[300px] rounded-lg border-[10px] box-content"
              />
            </transition>
          </el-form-item>
        </el-form>

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
  const file = uploadRef.value[index].files[0];
  previewUrls.value[index] = URL.createObjectURL(file);

  const alt: string = file.name;
  images.value[index].alt = alt.substring(0, alt.length - 4);
}

function addNewImage(): void {
  images.value.push({
    url: '',
    alt: '',
  });
  previewUrls.value.push('');
}

function deleteIamge(index: number): void {
  images.value.splice(index, 1);
  previewUrls.value.splice(index, 1);
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

<style scoped>
.preview-img-enter-active,
.preview-img-leave-active {
  transition: all 0.3s ease-in-out;
}

.preview-img-enter-from,
.preview-img-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
