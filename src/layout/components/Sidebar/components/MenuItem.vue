<template>
  <el-menu-item
    v-if="
      !route.meta?.hidden &&
      hasOneShowingChild(route.children, route) &&
      (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) &&
      !route.meta?.alwaysShow
    "
    :index="route.path"
  >
    <svg-icon :icon-class="onlyOneChild?.meta?.icon" />
    <span>{{ translateRouteTitle(onlyOneChild?.meta?.title) }}</span>
  </el-menu-item>

  <el-sub-menu :index="route.path" v-else-if="!route.meta?.hidden">
    <template #title>
      <svg-icon :icon-class="route.meta?.icon" />
      <span>{{ translateRouteTitle(route.meta?.title) }}</span>
    </template>

    <menu-item
      v-for="child in route.children"
      :key="child.path"
      :route="child"
    />
  </el-sub-menu>
</template>
<script setup lang="ts">
import { translateRouteTitle } from "@/utils/i18n";
import { RouteRecordRaw } from "vue-router";

const props = defineProps({
  route: {
    type: Object as () => RouteRecordRaw,
    required: true,
  },
});

// 如果 menu 的 chidren 只有一个非隐藏的子元素，onlyOneChild 就是这个子元素
const onlyOneChild = ref<RouteRecordRaw | null>(null);

/**
 * 判断当前路由是否只有一个子路由
 */
function hasOneShowingChild(
  children: RouteRecordRaw[] = [],
  parent: RouteRecordRaw
) {
  debugger;
  // 显示的子路由集合
  const showingChildren = children.filter((route: RouteRecordRaw) => {
    if (route.meta?.hidden) {
      return false;
    } else {
      onlyOneChild.value = route; // 如果只有一个子路由，onlyOneChild 就是这个子元素；如果多个子路由，此变量无效
      return true;
    }
  });

  // 如果只有一个子路由, 返回 true
  if (showingChildren.length === 1) {
    return true;
  }

  // 如果没有子路由，显示父级路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
}
</script>
