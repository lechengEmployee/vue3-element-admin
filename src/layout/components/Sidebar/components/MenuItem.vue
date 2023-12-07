<template>
  <el-sub-menu
    :index="menu.path"
    v-if="!menu.meta?.hidden && menu.children && menu.children.length > 0"
  >
    <template #title>
      <svg-icon :icon-class="menu.meta?.icon" />
      <span>{{ translateRouteTitle(menu.meta?.title) }}</span>
    </template>

    <menu-item v-for="child in menu.children" :key="child.path" :menu="child" />
  </el-sub-menu>

  <el-menu-item v-else-if="!menu.meta?.hidden" :index="menu.path">
    <svg-icon :icon-class="menu.meta?.icon" />
    <span>{{ translateRouteTitle(menu.meta?.title) }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
import { translateRouteTitle } from "@/utils/i18n";

defineProps({
  menu: {
    type: Object,
    required: true,
  },
});
</script>
