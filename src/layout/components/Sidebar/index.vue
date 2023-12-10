<!--侧边栏 -->
<template>
  <el-aside class="flex flex-col" :width="sideBarWidth">
    <Logo
      v-if="settingsStore.showSidebarLogo"
      :collapse="!appStore.sidebarOpen"
    />
    <Menu :menus="permissionStore.routes" />
  </el-aside>
</template>

<script setup lang="ts">
import { useSettingsStore, usePermissionStore, useAppStore } from "@/store";

const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const appStore = useAppStore();

const sideBarWidth = computed(() => {
  if (appStore.isMobile) {
    return appStore.sidebarOpen ? "210px" : "0";
  } else {
    return appStore.sidebarOpen ? "210px" : "54px";
  }
});
</script>
