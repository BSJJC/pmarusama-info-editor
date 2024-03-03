<template>
  <div class="relative w-screen h-screen flex flex-col px-[10vw] py-[5vh]">
    <info-type></info-type>

    <router-view v-slot="{ Component }">
      <transition name="main-layout" mode="out-in">
        <keep-alive exclude="url-index">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

    <teleport to="body">
      <toggle-preview></toggle-preview>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const InfoType = defineAsyncComponent(() => import('@/components/info-type.vue'));
const TogglePreview = defineAsyncComponent(() => import('@/components/toggle-preview.vue'));
</script>

<style scoped>
.main-layout-enter-active,
.main-layout-leave-active {
  transition: all 0.25s ease-out;
}

.main-layout-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.main-layout-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
