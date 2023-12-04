<template>
  <div @click="toggleClick">
    <svg-icon
      :class="'scale-x-[' + (isActive ? -1 : 1) + ']'"
      icon-class="collapse"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  isActive: {
    required: true,
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggleClick"]);

function toggleClick() {
  emit("toggleClick");
}
</script>
