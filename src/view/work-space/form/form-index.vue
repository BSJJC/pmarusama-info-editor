<template>
  <div class="w-full py-10">
    <el-scrollbar height="85vh" class="w-full">
      <div class="w-full flex justify-center items-center">
        <el-form ref="formRef" :model="form" label-width="200px" class="w-2/3">
          <!-- render all components -->
          <transition-group name="dynamic" tag="ul" class="relative">
            <el-form-item
              v-for="(i, index) in dynamicComponents"
              :key="i"
              :label="`component ${i.value} :`"
              class="py-4 relative w-full"
            >
              <div v-if="i.deletable" class="absolute top-[-20px] right-[-20px]">
                <el-icon
                  color="#F56C6C"
                  class="hover:cursor-pointer"
                  @click="deleteDynamicComponent(index)"
                >
                  <CloseBold />
                </el-icon>
              </div>

              <dynamic-component
                :component-id="index"
                :component-name="i.value"
              ></dynamic-component>
            </el-form-item>

            <!-- you must put the add new component in the transition group, otherwise the transition when add or delete will not be smooth -->
            <!-- in that case, you need to set a key to the add new component manual -->

            <!-- add new component -->
            <el-form-item label="information title :" :key="`form-index-add-new-component`">
              <div class="w-full flex justify-between">
                <el-select v-model="newComponentName" placeholder="new component" class="w-[90%]">
                  <el-option
                    v-for="name in newComponentNames"
                    :key="name.value"
                    :label="name.label"
                    :value="name.value"
                  />
                </el-select>

                <el-button :disabled="!newComponentName" @click="addDynamicComponent">
                  add
                </el-button>
              </div>
            </el-form-item>
          </transition-group>

          <!-- submit button -->
          <el-form-item class="mt-[15vh]">
            <el-button
              type="primary"
              plain
              round
              class="w-full h-[5vh] text-lg"
              @click="submitForm"
            >
              submit
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
export default {
  name: 'form-index',
};
</script>

<script setup lang="ts">
import { ref, Ref, watch, h, defineAsyncComponent } from 'vue';
import { useForm } from '@/store/useForm';
import { ElMessage, ElMessageBox } from 'element-plus';
import newComponentNames from './newComponentNames.ts';

const DynamicComponent = defineAsyncComponent(() => import('./dynamic-component.vue'));

const { form } = useForm();

const newComponentName: Ref<string> = ref('');

const dynamicComponents: Ref<Array<{ value: string; deletable?: boolean }>> = ref([
  { value: 'date', deletable: false },
  { value: 'title', deletable: false },
]);

function addDynamicComponent(): void {
  form.data.components.push({
    componentName: newComponentName.value,
    data: {},
  });

  dynamicComponents.value.push({
    value: newComponentName.value,
    deletable: true,
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

      form.data.components.splice(index, 1);
      dynamicComponents.value.splice(index, 1);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
}

function submitForm() {
  console.log(form.date);
  console.log(form.title);
  console.log(form.informationType);
  console.log(form.data);
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
  transform: translateX(50px);
}

.dynamic-leave-active {
  position: absolute;
}
</style>
