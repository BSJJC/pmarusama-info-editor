<template>
  <div class="relative w-screen h-screen flex flex-col px-[10vw] py-[5vh]">
    <InfoType></InfoType>

    <router-view v-slot="{ Component }">
      <transition name="main-layout" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

    <Teleport to="body">
      <TogglePreview></TogglePreview>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import InfoType from '@/components/info-type.vue';
import TogglePreview from '@/components/toggle-preview.vue';
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
