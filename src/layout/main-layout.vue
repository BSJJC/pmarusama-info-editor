<template>
  <div class="w-screen h-screen flex flex-col relative px-[10vw] pt-[5vh]">
    <InfoType></InfoType>

    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import InfoType from '@/components/info-type.vue';
</script>

<style></style>
