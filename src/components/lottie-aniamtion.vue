<template>
  <div ref="lottieContainer"></div>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, watch, defineProps } from 'vue';
import lottie, { AnimationItem } from 'lottie-web';

const props = defineProps({
  data: Object,
});

const lottieContainer: Ref<HTMLElement | undefined> = ref();
const animationInstance: Ref<AnimationItem | undefined | null> = ref<AnimationItem>();

/**
 * Function to load the Lottie animation.
 */
function load(): void {
  animationInstance.value = lottie.loadAnimation({
    container: lottieContainer.value!,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: props.data,
  });
}

// Watch for changes in the props
// If props change, remove the old animation and load the new one
watch(
  () => {
    props.data;
  },
  () => {
    animationInstance.value!.destroy();
    animationInstance.value = null;
    load();
  },
  {
    deep: true,
  },
);

onMounted(() => {
  load();
});
</script>
