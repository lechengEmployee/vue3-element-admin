<!--头部 -->
<template>
  <el-header class="header">
    <div class="navbar">
      <SidebarCollapse
        :isActive="!appStore.isCollapse"
        @toggle-click="toggleSideBar"
        class="navbar__btn w-10!"
      />
      <breadcrumb />
    </div>
    <div class="navbar">
      <ThemeSelect class="navbar__btn" />
      <FullScreen class="navbar__btn" />
      <SizeSelect class="navbar__btn" />
      <LangSelect class="navbar__btn" />
      <UserAvatar />
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();

function toggleSideBar() {
  appStore.toggleSidebar();
}
</script>

<style lang="scss" scoped>
.header {
  @apply flex-y-center;

  justify-content: space-between;
  padding: 0;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);

  .navbar {
    @apply flex-y-center h-full;

    &__btn {
      @apply h-full w-8 hover:bg-fill flex-center cursor-pointer;
    }
  }
}
</style>
