<template>
  <div class="flex justify-between h-10">
    <el-tabs v-model="activeName" type="card" @tab-change="changeTag">
      <el-tab-pane
        v-for="item in visitedViews"
        :key="item.fullPath"
        :name="item.fullPath"
      >
        <template #label>
          <div @contextmenu.prevent="openContextmenu($event, item)">
            <span>{{ item.title }}</span>

            <el-icon
              v-if="!item.affix"
              :size="12"
              class="mt-[5px] ml-[5px] hover:bg-primary rounded-full hover:color-white"
              @click.stop="closeTag(item)"
            >
              <i-ep-close />
            </el-icon>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div
      class="flex-center border border-gray-300 cursor-pointer w-[40px]"
      @click="refreshSelectedTag(selectedTag)"
    >
      <svg-icon icon-name="refresh" />
    </div>

    <!-- tag标签操作菜单 -->
    <ul
      v-show="contextmenuVisible"
      class="contextmenu"
      :style="{ left: contextmenuLeft + 'px', top: contextmenuTop + 'px' }"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        <svg-icon icon-name="refresh" />
        刷新
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <svg-icon icon-name="close" />
        关闭
      </li>
      <li @click="closeOtherTags">
        <svg-icon icon-name="close_other" />
        关闭其它
      </li>
      <li v-if="!isFirstView()" @click="closeLeftTags">
        <svg-icon icon-name="close_left" />
        关闭左侧
      </li>
      <li v-if="!isLastView()" @click="closeRightTags">
        <svg-icon icon-name="close_right" />
        关闭右侧
      </li>
      <li @click="closeAllTags(selectedTag)">
        <svg-icon icon-name="close_all" />
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTagsViewStore, usePermissionStore } from "@/store";
import { RouteRecordRaw } from "vue-router";
import { TabPaneName } from "element-plus";

const router = useRouter();
const route = useRoute();

const tagsViewStore = useTagsViewStore();
const permissionStore = usePermissionStore();

const { visitedViews } = storeToRefs(tagsViewStore);
const affixtags = ref<TagView[]>([]);

const activeName = ref(route.fullPath);

const { proxy } = getCurrentInstance()!;
const contextmenuVisible = ref(false);

const contextmenuLeft = ref(0);
const contextmenuTop = ref(0);
const selectedTag = ref<TagView>();

watch(
  () => route.fullPath,
  (newFullPath) => {
    addTag();
    activeName.value = newFullPath;
  },
  {
    immediate: true, //初始化立即执行
  }
);

watch(
  () => contextmenuVisible.value,
  () => {
    useEventListener(
      document,
      "click",
      () => (contextmenuVisible.value = false)
    );
  }
);

/**
 * 初始化页签
 */
function initTags() {
  const tags = filterAffixTags(permissionStore.routes);
  affixtags.value = tags;
  for (const tag of tags) {
    if (tag.name) {
      tagsViewStore.addVisitedView(tag);
    }
  }
}

/**
 * 筛选固定页签
 *
 * @param routes
 */
function filterAffixTags(routes: RouteRecordRaw[]): TagView[] {
  let tags: TagView[] = [];
  routes.forEach((route: RouteRecordRaw) => {
    if (route.meta?.affix) {
      tags.push({
        path: route.path,
        fullPath: route.path,
        name: String(route.name),
        title: route.meta?.title || "no-name",
        affix: route.meta?.affix,
        keepAlive: route.meta?.keepAlive,
      });
    }

    if (route.children) {
      const temptags = filterAffixTags(route.children);
      if (temptags.length >= 1) {
        tags = [...tags, ...temptags];
      }
    }
  });
  return tags;
}

/**
 * 添加页签
 */
function addTag() {
  if (route.name) {
    tagsViewStore.addView({
      name: String(route.name),
      title: route.meta.title || "no-name",
      path: route.path,
      fullPath: route.fullPath,
      affix: route.meta?.affix,
      keepAlive: route.meta?.keepAlive,
    });
  }
}

/**
 * 关闭页签
 *
 * @param tag 页签
 */
function closeTag(view: TagView) {
  tagsViewStore.delVisitedView(view).then((visitedViews) => {
    const isActive = view.fullPath === activeName.value;
    if (isActive) {
      toLastView(visitedViews, view);
    }
  });
}

/**
 *  切换页签
 *
 * @param targetFullPath
 */
function changeTag(targetFullPath: TabPaneName) {
  router.push(targetFullPath as string);
}

/**
 * 跳转到最后一个页签
 */
function toLastView(visitedViews: TagView[], view?: TagView) {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView && latestView.fullPath) {
    router.push(latestView.fullPath);
  } else {
    router.push("/");
  }
}

function openContextmenu(e: MouseEvent, tag: TagView) {
  selectedTag.value = tag;

  const menuMinWidth = 105;

  const offsetLeft = proxy?.$el.getBoundingClientRect().left; // container margin left
  const offsetWidth = proxy?.$el.offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const left = e.clientX - offsetLeft + 15; // 15: margin right

  contextmenuLeft.value = left > maxLeft ? maxLeft : left;
  contextmenuTop.value = e.clientY;

  contextmenuVisible.value = true;
}

/**
 * 刷新选择的页签
 */
function refreshSelectedTag(tag?: TagView) {
  if (!tag) {
    return;
  }
  tagsViewStore.delCachedView(tag);
  nextTick(() => {
    router.replace({ path: "/redirect" + tag.fullPath });
  });
}

/**
 *  关闭选择的页签
 */
function closeSelectedTag(tag?: TagView) {
  if (!tag) {
    return;
  }
  tagsViewStore.delView(tag).then((res: any) => {
    if (isActive(tag)) {
      toLastView(res.visitedViews, tag);
    }
  });
}

/**
 * 关闭左侧页签
 */
function closeLeftTags() {
  if (!selectedTag.value) {
    return;
  }
  tagsViewStore.delLeftViews(selectedTag.value).then((res: any) => {
    if (
      !res.visitedViews.find(
        (item: TagView) => item.fullPath === route.fullPath
      )
    ) {
      toLastView(res.visitedViews);
    }
  });
}

/**
 * 关闭右侧页签
 */
function closeRightTags() {
  if (!selectedTag.value) {
    return;
  }

  tagsViewStore.delRightViews(selectedTag.value).then((res: any) => {
    if (
      !res.visitedViews.find(
        (item: TagView) => item.fullPath === route.fullPath
      )
    ) {
      toLastView(res.visitedViews);
    }
  });
}

/**
 * 关闭其它页签
 */
function closeOtherTags() {
  if (!selectedTag.value) {
    return;
  }

  router.push(selectedTag.value);
  tagsViewStore.delOtherViews(selectedTag.value).then(() => {
    moveToCurrentTag();
  });
}

/**
 * 关闭所有页签
 */
function closeAllTags(tag?: TagView) {
  if (!tag) {
    return;
  }
  tagsViewStore.delAllViews().then((res: any) => {
    toLastView(res.visitedViews, tag);
  });
}

/**
 * 跳转到当前页签
 */
function moveToCurrentTag() {
  for (const tag of visitedViews.value) {
    if (tag.path === route.path) {
      if (tag.fullPath !== route.fullPath) {
        tagsViewStore.updateVisitedView({
          name: String(route.name),
          title: route.meta.title || "no-name",
          path: route.path,
          fullPath: route.fullPath,
          affix: route.meta?.affix,
          keepAlive: route.meta?.keepAlive,
        });
      }
    }
  }
}

/**
 * 是否是当前页签
 */
function isActive(tag?: TagView) {
  if (!tag) {
    return false;
  }
  return tag.fullPath === route.fullPath;
}

/**
 * 是否固定页签
 */
function isAffix(tag?: TagView) {
  return tag?.affix;
}

/**
 * 是否是首个页签
 */
function isFirstView() {
  if (!selectedTag.value) {
    return false;
  }

  const isFirstView =
    selectedTag.value.fullPath === visitedViews.value[0].fullPath;

  return isFirstView;
}

/**
 * 是否是最后一个页签
 */
function isLastView() {
  if (!selectedTag.value) {
    return false;
  }

  const isLastView =
    selectedTag.value.fullPath ===
    visitedViews.value[visitedViews.value.length - 1].fullPath;
  return isLastView;
}

onMounted(() => {
  initTags();
});
</script>
<style lang="scss" scoped>
:deep(.el-tabs) {
  width: calc(100% - 40px);

  .el-tabs__header {
    margin-bottom: 0;

    .el-tabs__nav-wrap::after {
      height: 0;
    }

    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      line-height: 30px;
    }

    .el-tabs__active-bar {
      display: none;
    }

    .el-tabs__item:nth-child(2) {
      margin-left: 12px;
    }

    .el-tabs__item {
      height: 31px;
      padding: 0 4px;
      margin-left: 8px;
      border: 1px solid var(--el-border-color-light);
      border-radius: 2px;

      &:hover {
        border-color: var(--el-color-primary-light-3);
      }
    }

    .is-icon-close:hover {
      background-color: var(--el-color-primary);
    }

    .is-active {
      background: var(--el-color-primary-light-8);
      border-color: var(--el-color-primary-light-3);
    }
  }
}

.contextmenu {
  position: absolute;
  z-index: 3000;
  padding: 5px 0;
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  list-style-type: none;
  background: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);

  li {
    padding: 7px 16px;
    margin: 0;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
}
</style>
