<template>
  <div class="sidebar-collapse" @click="toggleClick">
    <svg-icon
      class="sidebar-collapse__icon"
      :class="{ 'is-active': isActive }"
      icon-class="collapse"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
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

<style scoped lang="scss">
.sidebar-collapse {
  &__icon {
    transform: scaleX(-1);

    &.is-active {
      transform: scaleX(1);
    }
  }
}
</style>
