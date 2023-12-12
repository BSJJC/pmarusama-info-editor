<template>
  <div class="w-full p-10">
    <el-scrollbar height="90vh">
      <el-form ref="formRef" :model="form" label-width="200px">
        <el-form-item label="information type :">
          <InfoType></InfoType>
        </el-form-item>

        <el-form-item label="information date :">
          <InfoDate></InfoDate>
        </el-form-item>

        <el-form-item label="information title :">
          <InfoTitle></InfoTitle>
        </el-form-item>

        <TransitionGroup name="dynamic" tag="div" class="relative">
          <el-form-item
            v-for="(i, index) in dynamicComponents"
            :key="i"
            :label="`component ${i.value} :`"
            class="py-4 relative w-[400px]"
          >
            <div class="absolute top-[-15px] left-[410px]">
              <el-icon
                color="#F56C6C"
                class="hover:cursor-pointer"
                @click="deleteDynamicComponent(index)"
              >
                <CloseBold />
              </el-icon>
            </div>

            <DynamicComponent :component-id="index" :component-name="i.value"></DynamicComponent>
          </el-form-item>
        </TransitionGroup>

        <el-form-item label="information title :">
          <div class="w-[400px] flex justify-between">
            <el-select v-model="newComponentName" placeholder="new component" class="w-[300px]">
              <el-option
                v-for="name in newComponentNames"
                :key="name.value"
                :label="name.label"
                :value="name.value"
              />
            </el-select>

            <el-button :disabled="!newComponentName" @click="addDynamicComponent">add</el-button>
          </div>
        </el-form-item>

        <el-form-item class="mt-[10vh]">
          <el-button type="primary" plain round class="w-[400px] h-[5vh]">submit</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch, h } from 'vue';
import { useForm } from '@/store/useForm';
import { ElMessage, ElMessageBox } from 'element-plus';
import { newComponentNames } from './newComponentNames.ts';

import DynamicComponent from './dynamic-component.vue';
import InfoType from './components/info-type.vue';
import InfoDate from './components/info-date.vue';
import InfoTitle from './components/info-title.vue';

const { form } = useForm();

const newComponentName: Ref<string> = ref('');

const dynamicComponents: Ref<Array<{ value: string }>> = ref([]);

function addDynamicComponent(): void {
  form.data.components.push({
    componentName: newComponentName.value,
    data: {},
  });

  dynamicComponents.value.push({
    value: newComponentName.value,
  });

  newComponentName.value = '';
}

function deleteDynamicComponent(index: number): void {
  ElMessageBox.confirm(
    h('div', null, [
      h('span', null, 'Are you sure you want to delete component: '),
      h('b', null, `${dynamicComponents.value[index].value}`),
    ]),
    {
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
      type: 'warning',
      draggable: true,
    },
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: `Component ${dynamicComponents.value[index].value} deleted`,
      });

      form.data.components.slice(index, 1);
      dynamicComponents.value.splice(index, 1);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
}

watch(
  () => form.data.components,
  () => {
    console.log(form);
  },
  {
    deep: true,
  },
);
</script>

<style scoped>
.dynamic-move,
.dynamic-enter-active,
.dynamic-leave-active {
  transition: all 0.3s ease-in-out;
}

.dynamic-enter-from,
.dynamic-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.dynamic-leave-active {
  position: absolute;
}
</style>
./newComponentNames.ts
