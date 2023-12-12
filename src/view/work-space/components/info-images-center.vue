<template>
  <div>
    <el-form>
      <div v-for="(image, index) in images" :key="index" class="mb-4 w-[400px] flex items-center">
        <div class="w-[300px] space-y-2">
          <el-form-item label="url: ">
            <el-input v-model="image.url" />
          </el-form-item>

          <el-form-item label="alt: ">
            <el-input v-model="image.alt" />
          </el-form-item>

          <Transition>
            <el-form-item v-if="image.url" label="preview: ">
              <el-image :src="image.url" />

              <span class="w-full text-center">{{ image.alt }}</span>
            </el-form-item>
          </Transition>
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

const images: Ref<Array<TImages>> = ref([
  {
    url: '',
    alt: '',
  },
]);

const { form } = useForm();

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
    form.data.components[props.componentId!].data = images.value;
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
