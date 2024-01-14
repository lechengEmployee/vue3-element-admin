<!--侧边栏 -->
<template>
  <el-aside class="sidebar-container" :width="sideBarWidth">
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
    return appStore.sidebarOpen ? "210px" : "64px";
  }
});
</script>

<style lang="scss">
.sidebar-container {
  display: flex;
  flex-direction: column;

  .el-menu {
    --el-menu-hover-bg-color: transparent;
    --el-menu-bg-color: transparent;

    &--collapse {
      .el-sub-menu,
      .el-menu-item {
        justify-content: center;

        &__title {
          justify-content: center;
        }
      }
    }

    .el-sub-menu {
      &.is-active > .el-sub-menu__title {
        color: var(--el-color-primary);
      }

      .el-sub-menu__title {
        & > * {
          z-index: 1;
        }

        &:hover::before {
          position: absolute;
          inset: 2px 5px;
          clear: both;
          content: "";
          background: var(--el-fill-color);
          border-radius: 4px;
        }
      }
    }

    .el-menu-item {
      & > * {
        z-index: 1;
      }

      &.is-active > * {
        color: var(--el-color-primary);
      }

      &:hover::before {
        position: absolute;
        inset: 2px 5px;
        clear: both;
        content: "";
        background: var(--el-fill-color);
        border-radius: 4px;
      }

      &.is-active::before {
        position: absolute;
        inset: 2px 5px;
        clear: both;
        content: "";
        background: var(--el-color-primary-light-8);
        border-radius: 4px;
      }
    }
  }
}
</style>
