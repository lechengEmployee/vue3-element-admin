<!--侧边栏 -->
<template>
  <el-aside class="sidebar" :width="sideBarWidth">
    <Logo
      v-if="settingsStore.showSidebarLogo"
      :collapse="appStore.isCollapse"
    />
    <Menu :menu-list="permissionStore.routes" base-path="" />
  </el-aside>
</template>

<script setup lang="ts">
import { useSettingsStore, usePermissionStore, useAppStore } from "@/store";

const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const appStore = useAppStore();

const sideBarWidth = computed(() => {
  if (appStore.device === "mobile") {
    return appStore.isCollapse ? "0" : "210px";
  } else {
    return appStore.isCollapse ? "54px" : "210px";
  }
});
</script>

<style lang="scss" scoped>
.sidebar1 {
  width: $sideBarWidth;
}
</style>
