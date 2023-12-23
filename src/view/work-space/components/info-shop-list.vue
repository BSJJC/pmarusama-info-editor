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
          v-for="(i, index) in shoingShopImages"
          :key="index"
          class="w-1/5 flex flex-col justify-center items-center m-4 p-2 rounded-lg relative transition-all duration-300 ease-in-out hover:bg-[#409eff] hover:text-white"
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
      v-model="setShopImageVisible"
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
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, ComputedRef, watch, onBeforeMount } from 'vue';
import { UploadInstance, UploadRawFile, UploadFile } from 'element-plus';
import { ElNotification } from 'element-plus';
import axios from 'axios';

const setShopImageVisible: Ref<boolean> = ref(false);

const uploadRef = ref<UploadInstance>();
const newShopFile: Ref<File | undefined> = ref();
const newShopName: Ref<string> = ref('');

const searchingShopName: Ref<string> = ref('');

const allShopImages: Ref<
  Array<{
    shopName: string;
  }>
> = ref([]);
const shoingShopImages: ComputedRef<
  {
    shopName: string;
  }[]
> = computed(() => {
  if (!searchingShopName.value) return allShopImages.value;

  return allShopImages.value.filter((item) => item.shopName.includes(searchingShopName.value));
});

function addNewShopImage(): void {
  setShopImageVisible.value = true;
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

      setShopImageVisible.value = false;
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

onBeforeMount(() => {
  axios.get('http://localhost:5000/api/informationShopImage/all').then((res) => {
    allShopImages.value = res.data;
  });
});

watch(
  () => uploadRef.value,
  () => {
    console.log(uploadRef.value);
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
