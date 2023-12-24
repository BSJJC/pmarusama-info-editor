<template>
  <div class="space-y-4">
    <div class="flex w-full justify-between">
      <el-input v-model="searchingShopName" class="w-[45%]" placeholder="search shop name" />

      <el-button type="success" plain class="w-[45%]" @click="addNewShopImage">
        add new shop
      </el-button>
    </div>

    <div class="flex flex-wrap">
      <TransitionGroup name="fade">
        <div
          v-for="(i, index) in showingShopImages"
          :key="index"
          class="w-1/5 flex flex-col justify-center items-center m-4 p-2 rounded-lg relative transition-all duration-300 ease-in-out hover:bg-[#409eff] hover:text-white hover:translate-y-[-5px]"
          :style="{
            backgroundColor: `${i.url ? '#409eff' : ''}`,
            color: `${i.url ? 'white' : ''}`,
          }"
          @click="setShopUrl(i, index)"
        >
          <div class="flex justify-center items-center flex-col hover:cursor-pointer">
            <img
              :src="`http://localhost:5000/api/informationShopImage/${i.shopName}`"
              :alt="`shop ${i.shopName}`"
              class="rounded-lg"
            />
            <span class="text-md">{{ i.shopName }}</span>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <el-dialog
      v-model="addNewShopImageVisible"
      title="upload new shop image"
      draggable
      align-center
      class="rounded-lg"
    >
      <div class="space-y-8">
        <el-form label-width="100px" class="space-y-2">
          <el-form-item label="shop image :">
            <el-upload
              ref="uploadRef"
              :auto-upload="false"
              :limit="1"
              list-type="picture"
              :on-change="handleFileSelected"
              :on-exceed="handleExceed"
              action="http://localhost:5000/api/informationShopImage/create"
            >
              <template #trigger>
                <el-button type="primary" plain>select shop image file</el-button>
              </template>
            </el-upload>
          </el-form-item>

          <el-form-item label="shop name :">
            <el-input v-model="newShopName" />
          </el-form-item>
        </el-form>

        <div class="w-full flex justify-end">
          <el-button
            type="primary"
            plain
            :disabled="!newShopImageCheck()"
            @click="uploadNewShopImage"
          >
            submit
          </el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      v-model="setShopUrlVisible"
      :title="`set the url of shop ${editingShopName}`"
      draggable
      align-center
      class="rounded-lg"
    >
      <div class="space-y-8">
        <div class="flex justify-center items-center flex-col space-y-4">
          <img
            :src="`http://localhost:5000/api/informationShopImage/${editingShopName}`"
            :alt="`shop ${editingShopName}`"
            class="rounded-lg"
          />

          <div class="w-2/3 flex space-x-4">
            <span>url:</span>
            <el-input v-model="showingShopImages[editingShopIndex].url" />
          </div>
        </div>

        <div class="flex justify-end">
          <el-button
            type="danger"
            plain
            :disabled="!showingShopImages[editingShopIndex].url"
            @click="cancelSetUrl"
          >
            cancel
          </el-button>
          <el-button
            type="primary"
            plain
            :disabled="!showingShopImages[editingShopIndex].url"
            @click="setShopUrlVisible = false"
          >
            submit
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, ComputedRef, watch, onBeforeMount } from 'vue';
import { UploadInstance, UploadRawFile, UploadFile } from 'element-plus';
import { ElNotification } from 'element-plus';
import axios from 'axios';
import { useForm } from '@/store/useForm';

const props = defineProps({
  componentId: Number,
});

const { form } = useForm();

const addNewShopImageVisible: Ref<boolean> = ref(false);
const uploadRef = ref<UploadInstance>();
const newShopFile: Ref<File | undefined> = ref();
const newShopName: Ref<string> = ref('');

const searchingShopName: Ref<string> = ref('');
const allShopImages: Ref<
  Array<{
    shopName: string;
    url: string;
  }>
> = ref([]);
const showingShopImages: ComputedRef<
  {
    shopName: string;
    url: string;
  }[]
> = computed(() => {
  if (!searchingShopName.value) return allShopImages.value;

  return allShopImages.value.filter((item) => item.shopName.includes(searchingShopName.value));
});
const setShopUrlVisible: Ref<boolean> = ref(false);
const editingShopName: Ref<string> = ref('');
const editingShopIndex: Ref<number> = ref(0);

function addNewShopImage(): void {
  addNewShopImageVisible.value = true;
}

function handleExceed(files: Array<File>): void {
  uploadRef.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  newShopFile.value = file;
  uploadRef.value!.handleStart(file);
}

function handleFileSelected(file: UploadFile): void {
  newShopFile.value = file.raw;
  newShopName.value = file.name.substring(0, file.name.lastIndexOf('.'));
}

function newShopImageCheck(): boolean {
  if (!newShopFile.value || !newShopName.value) return false;
  return true;
}

function uploadNewShopImage(): void {
  const formData = new FormData();

  formData.append('informationShopImage', newShopFile.value!);
  formData.append('shopName', newShopName.value);

  axios
    .post('http://localhost:5000/api/informationShopImage/create', formData)
    .then(() => {
      ElNotification({
        title: 'Success',
        message: `${newShopName.value} image have been uploaded`,
        type: 'success',
      });

      addNewShopImageVisible.value = false;
      uploadRef.value?.clearFiles();
      newShopFile.value = undefined;
      newShopName.value = '';
    })
    .catch(() => {
      ElNotification({
        title: 'upload failed',
        message: `${newShopName.value} image upload failed`,
        type: 'error',
      });
    });
}

function setShopUrl(item: { shopName: string }, index: number): void {
  editingShopName.value = item.shopName;
  editingShopIndex.value = index;
  setShopUrlVisible.value = true;
}

function cancelSetUrl(): void {
  showingShopImages.value[editingShopIndex.value].url = '';
  setShopUrlVisible.value = false;
}

onBeforeMount(() => {
  axios.get('http://localhost:5000/api/informationShopImage/all').then((res) => {
    allShopImages.value = res.data;
  });
});

watch(
  () => showingShopImages.value,
  () => {
    form.data.components[props.componentId!].data = showingShopImages.value.filter(
      (shop) => shop.url,
    );
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style scoped>
.p ::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  border-radius: 0.5rem;
  background-color: #409eff;
  opacity: 0.1;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
