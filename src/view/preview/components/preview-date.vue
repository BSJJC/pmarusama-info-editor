<template>
  <div>
    <div id="date">
      <!-- year -->
      {{ date?.substring(0, 4) }}.
      <!-- mongth -->
      {{ date?.substring(4, 6) }}.
      <!-- day -->
      {{ date?.substring(6, 8) }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: Number,
});

const date = props.data?.toString();
</script>

<style scoped>
#date {
  font-size: 1.5rem;
  color: #f60;
  font-family: 'Fredoka One', sans-serif;
}
</style>
