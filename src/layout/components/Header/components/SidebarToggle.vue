<template>
  <div @click="toggleClick">
    <svg-icon :class="iconClass" icon-name="collapse" />
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

const iconClass = computed(() => ({
  "scale-x-[1]": !props.isActive,
  "scale-x-[-1]": props.isActive,
}));
</script>
