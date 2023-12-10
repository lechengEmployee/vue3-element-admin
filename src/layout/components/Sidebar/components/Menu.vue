<template>
  <el-scrollbar>
    <el-menu
      :default-active="currentRoute.path"
      :collapse-transition="false"
      :collapse="!appStore.sidebarOpen"
      :unique-opened="false"
      @select="handleMenuSelect"
      mode="vertical"
    >
      <menu-item v-for="menu in menus" :key="menu.path" :item="menu" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store";
import router from "@/router";

defineProps({
  menus: {
    required: true,
    default: () => {
      return [];
    },
    type: Array<any>,
  },
});

const appStore = useAppStore();
const currentRoute = useRoute(); // 当前路由

/**
 * 菜单激活回调
 *
 * @param index 选中菜单项的 index, 一般为路由路径
 */
const handleMenuSelect = (index: string) => {
  if (/^(https?:|http?:|mailto:|tel:)/.test(index)) {
    window.open(index);
  } else {
    router.push(index);
  }
};
</script>
