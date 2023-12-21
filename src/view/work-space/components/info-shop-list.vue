<template>
  <div>
    <div class="flex w-full justify-between">
      <el-button type="primary" plain class="w-[45%]" @click="addExistShopImage">
        add exist shop
      </el-button>
      <el-button type="success" plain class="w-[45%]" @click="addNewShopImage">
        add new shop
      </el-button>
    </div>

    <el-dialog
      v-model="setShopImageVisible"
      title="upload new shop image"
      draggable
      align-center
      class="rounded-lg"
    >
      <!-- 
      upload new shop image
     -->
      <div v-if="openType === 'new'" class="space-y-8">
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

      <!-- 
        select exist shop image
       -->
      <div v-else>b</div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { UploadInstance, UploadRawFile, UploadFile } from 'element-plus';
import { ElNotification } from 'element-plus';
import axios from 'axios';

const setShopImageVisible: Ref<boolean> = ref(false);
const openType: Ref<'exist' | 'new'> = ref('exist' || 'new');

const uploadRef = ref<UploadInstance>();
const newShopFile: Ref<File | undefined> = ref();
const newShopName: Ref<string> = ref('');

function addExistShopImage(): void {
  setShopImageVisible.value = true;
  openType.value = 'exist';
}

function addNewShopImage(): void {
  setShopImageVisible.value = true;
  openType.value = 'new';
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

watch(
  () => uploadRef.value,
  () => {
    console.log(uploadRef.value);
  },
);
</script>

<style></style>
