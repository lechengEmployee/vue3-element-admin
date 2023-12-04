<template>
  <el-icon v-if="icon && icon.includes('el-icon')" class="sub-el-icon" />
  <span v-if="title">{{ translateRouteTitle(title) }}</span>
</template>

<script setup lang="ts">
import { translateRouteTitle } from "@/utils/i18n";

import { useAppStore } from "@/store";

const appStore = useAppStore();

const sidebarOpen = computed(() => appStore.sidebarOpen);

defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.sub-el-icon {
  width: 1em;
  height: 1em;
  color: currentcolor;
}
</style>
