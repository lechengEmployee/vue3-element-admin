<template>
  <!-- 没有子菜单 -->
  <el-menu-item v-if="showMenuItem" :index="item.path" :key="item.path">
    <menu-title
      :icon="onlyOneChild.meta?.icon"
      :title="onlyOneChild.meta?.title"
    />
  </el-menu-item>

  <!-- 有子菜单 -->
  <el-sub-menu v-else-if="!item.meta?.hidden" :index="item.path">
    <template #title>
      <menu-title :icon="item.meta?.icon" :title="item.meta?.title" />
    </template>
    <!-- 递归渲染子菜单 -->
    <menu-item v-for="child in item.children" :key="child.path" :item="child" />
  </el-sub-menu>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from "vue-router";

const { item } = defineProps({
  item: {
    type: Object as () => RouteRecordRaw,
    required: true,
  },
});

const showMenuItem = computed(() => {
  return (
    !item.meta?.hidden && // 菜单显示
    hasSingleShowingChild(item.children, item) && // 只有一个子菜单或者没有子菜单
    (!onlyOneChild.value.children || onlyOneChild.value?.noShowingChildren) && // 子菜单没有子菜单
    !item.meta?.alwaysShow // 不始终显示
  );
});

// 临时变量，存储唯一子菜单，如果有多个子菜单，只会存储最后一个子菜单
const onlyOneChild = ref<any>(null);

/**
 * 判断是否只有一个子菜单/没有子菜单
 */
function hasSingleShowingChild(
  children: RouteRecordRaw[] = [],
  parent: RouteRecordRaw
) {
  //子菜单
  const showingChildren = children.filter((route: RouteRecordRaw) => {
    if (route.meta?.hidden) {
      return false;
    } else {
      onlyOneChild.value = route;
      return true;
    }
  });

  // 如果只有一个子路由, 返回 true
  if (showingChildren.length === 1) {
    return true;
  }

  // 如果没有子菜单,显示当前菜单
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
}
</script>
