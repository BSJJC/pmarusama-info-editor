<template>
  <div>
    <div class="flex w-full justify-between">
      <el-button type="primary" plain class="w-[45%]" @click="addExitShopImage">
        add exit shop
      </el-button>
      <el-button type="success" plain class="w-[45%]" @click="addNewShopImage">
        add new shop
      </el-button>
    </div>

    <el-dialog v-model="setShopImageVisible" title="Tips" draggable align-center class="rounded-lg">
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
            >
              <template #trigger>
                <el-button type="primary" plain>select shop image file</el-button>
              </template>
            </el-upload>
          </el-form-item>

          <el-form-item label="shop name :">
            <el-input v-model="newShopName" />
          </el-form-item>

          <el-form-item label="shop url :">
            <el-input v-model="newShopUrl" />
          </el-form-item>
        </el-form>

        <div class="w-full flex justify-end">
          <el-button type="primary" plain>submit</el-button>
        </div>
      </div>

      <div v-else>b</div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { genFileId } from 'element-plus';
import { UploadInstance, UploadRawFile } from 'element-plus';

const setShopImageVisible: Ref<boolean> = ref(false);
const openType: Ref<'exist' | 'new'> = ref('exist' || 'new');

const uploadRef = ref<UploadInstance>();
const newShopName: Ref<string> = ref('');
const newShopUrl: Ref<string> = ref('');

function addExitShopImage(): void {
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
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
}

function handleFileSelected(file: File): void {
  newShopName.value = file.name.substring(0, file.name.lastIndexOf('.'));
}

watch(
  () => uploadRef.value,
  () => {
    console.log(uploadRef.value);
  },
);
</script>

<style></style>
