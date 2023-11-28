<!--侧边栏 -->
<template>
  <el-aside class="sidebar">
    <Logo v-if="showSidebarLogo" :collapse="!appStore.sidebar.opened" />
    <Menu :menu-list="permissionStore.routes" base-path="" />
  </el-aside>
</template>

<script setup lang="ts">
import { useSettingsStore, usePermissionStore, useAppStore } from "@/store";

const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const appStore = useAppStore();
const { showSidebarLogo } = storeToRefs(settingsStore);
const layout = computed(() => settingsStore.layout);
const showContent = ref(true);
watch(
  () => layout.value,
  () => {
    showContent.value = false;
    nextTick(() => {
      showContent.value = true;
    });
  }
);
</script>

<style lang="scss" scoped>
.sidebar {
  width: $sideBarWidth;
}

:deep(.setting-container) {
  .setting-item {
    color: #fff;

    .svg-icon {
      margin-right: 0;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}

.isMix {
  .menu-wrap {
    z-index: 99;
    width: 100% !important;
    height: 50px;
    background-color: $menuBg;

    :deep(.header) {
      display: flex;
      width: 100%;
      // 顶部模式全局变量修改
      --el-menu-item-height: 50px;

      .logo-wrap {
        width: $sideBarWidth;
      }

      .el-menu {
        background-color: $menuBg;

        .el-menu-item {
          color: $menuText;
        }
      }

      .el-scrollbar {
        flex: 1;
        min-width: 0;
        height: 50px;
      }
    }
  }

  .left-menu {
    display: inline-block;
    width: $sideBarWidth;
    background-color: $menuBg;

    :deep(.el-menu) {
      background-color: $menuBg;

      .el-menu-item {
        color: $menuText;
      }
    }
  }
}
</style>
