<template>
  <div class="w-1/2 p-10">
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

        <TransitionGroup name="dynamic">
          <el-form-item
            v-for="(i, index) in dynamicComponents"
            :key="index"
            :label="`component ${i.value} :`"
          >
            <DynamicComponent
              :component-name="i.value"
              :data="form.data.components[index].data"
            ></DynamicComponent>
          </el-form-item>
        </TransitionGroup>

        <el-form-item label="information title :">
          <div class="w-[300px] flex justify-between">
            <el-select v-model="newComponentName" placeholder="new component">
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
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { useForm } from '@/store/useForm';

import DynamicComponent from './dynamic-component.vue';
import InfoType from './components/info-type.vue';
import InfoDate from './components/info-date.vue';
import InfoTitle from './components/info-title.vue';

const { form } = useForm();

const newComponentName: Ref<string> = ref('');
const newComponentNames: Ref<
  {
    value: string;
    label: string;
  }[]
> = ref([
  {
    value: 'h1',
    label: 'h1',
  },
]);

const dynamicComponents: Ref<Array<{ value: string }>> = ref([]);

function addDynamicComponent(): void {
  form.data.components.push({
    componentName: newComponentName.value,
    data: {},
  });

  dynamicComponents.value.push({
    value: newComponentName.value,
  });
}

watch(
  () => form,
  () => {
    console.log(form.data.components);
  },
  {
    deep: true,
  },
);
</script>

<style scoped>
.dynamic-enter-active,
.dynamic-leave-active {
  transition: all 0.5s ease;
}

.dynamic-enter-from,
.dynamic-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
