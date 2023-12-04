<template>
  <el-scrollbar>
    <el-menu
      :default-active="currentRoute.path"
      :collapse-transition="false"
      :collapse="!appStore.sidebarOpen"
      :unique-opened="false"
      mode="vertical"
    >
      <menu-item
        v-for="route in menuList"
        :key="route.path"
        :item="route"
        :base-path="resolvePath(route.path)"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store";

import path from "path-browserify";
import { isExternal } from "@/utils/index";

const props = defineProps({
  menuList: {
    required: true,
    default: () => {
      return [];
    },
    type: Array<any>,
  },
  basePath: {
    type: String,
    required: true,
  },
});

const appStore = useAppStore();
const currentRoute = useRoute(); // 当前路由
/**
 * 解析路径
 *
 * @param routePath 路由路径
 */
function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }

  // 完整路径 = 父级路径(/level/level_3) + 路由路径
  const fullPath = path.resolve(props.basePath, routePath); // 相对路径 → 绝对路径
  return fullPath;
}
</script>
