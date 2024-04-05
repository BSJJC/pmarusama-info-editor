<template>
  <div class="flex flex-col gap-y-4">
    <transition-group name="image" tag="ul" class="relative">
      <div
        v-for="(image, index) in images"
        :key="image as unknown as string"
        class="flex justify-around items-center relative w-full text-[#787878] mb-4"
      >
        <div class="w-[80%] mb-2">
          <!-- select image -->
          <div class="table-row">
            <div class="table-cell pb-[10px] pr-[20px]">image:</div>

            <div calss="table-cell">
              <el-button type="primary" @click="selectFile(index)">
                {{ images[index].url ? 'change image' : 'select image' }}
              </el-button>
              <input
                type="file"
                :id="`upload-ref-${index}`"
                class="hidden"
                @change="handleFiles(index)"
              />
            </div>
          </div>

          <!-- set alt -->
          <div class="table-row align-middle">
            <div class="table-cell pb-[10px] pr-[20px]">alt:</div>

            <div class="table-cell w-full">
              <el-input v-model="image.alt" />
            </div>
          </div>

          <!-- show preview -->
          <transition name="preview-image">
            <div v-if="previewUrls[index]" class="table-row">
              <div class="table-cell align-middle pb-[10px] pr-[10px]">preview:</div>

              <div id="img-container" class="table-cell relative overflow-hidden">
                <el-image
                  style="height: 250px"
                  :src="previewUrls[index]"
                  :preview-src-list="[previewUrls[index]]"
                  :alt="image.alt"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  class="rounded-lg border-[10px]"
                />
              </div>
            </div>
          </transition>
        </div>

        <!-- delete button -->
        <div class="w-[20%] flex justify-end items-center">
          <el-button type="danger" plain @click="deleteIamge(index)">delete</el-button>
        </div>
      </div>

      <el-button
        type="primary"
        :key="`info-images-add-new-button`"
        plain
        class="w-full"
        @click="addNewImage"
      >
        add new image
      </el-button>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import syncData from '@/utils/syncData';

type TImages = {
  url: string;
  alt: string;
};

const props = defineProps({
  componentId: Number,
});

const images: Ref<Array<TImages>> = ref([
  {
    url: '',
    alt: '',
  },
]);
const previewUrls: Ref<Array<string>> = ref([]);

function selectFile(index: number) {
  document.getElementById(`upload-ref-${index}`)!.click();
}

function handleFiles(index: number) {
  const uploadRef = document.getElementById(`upload-ref-${index}`)! as HTMLInputElement;

  const file = uploadRef.files?.[0];

  if (!file) return;

  previewUrls.value[index] = URL.createObjectURL(file);

  images.value[index] = {
    url: URL.createObjectURL(file),
    alt: file.name.substring(0, file.name.length - 4),
  };
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
    syncData(props.componentId!, { images: images.value });
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style scoped>
.image-move,
.image-enter-active,
.image-leave-active {
  transition: all 0.3s ease-in-out;
}

.image-enter-from,
.image-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.image-leave-active {
  position: absolute;
}

.preview-image-active {
  transition: all 0.3s ease-in-out;
}

.preview-image-enter-from,
.preview-image-leave-to {
  opacity: 0;
}

.preview-image-active #img-container {
  transition: all 0.3s ease-in-out;
}

.preview-image-enter-from #img-container,
.preview-image-leave-to #img-container {
  height: 0px;
  opacity: 0;
}
</style>
