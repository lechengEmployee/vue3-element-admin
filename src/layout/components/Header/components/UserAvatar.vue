<template>
  <el-dropdown trigger="click">
    <div class="avatar">
      <img :src="userStore.user.avatar + '?imageView2/1/w/80/h/80'" />
      <el-icon :size="12">
        <i-ep-CaretBottom />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/">
          <el-dropdown-item>{{ $t("navbar.dashboard") }}</el-dropdown-item>
        </router-link>
        <a
          target="_blank"
          href="https://github.com/youlaitech/vue3-element-admin"
        >
          <el-dropdown-item>Github</el-dropdown-item>
        </a>
        <a target="_blank" href="https://gitee.com/haoxr">
          <el-dropdown-item>{{ $t("navbar.gitee") }}</el-dropdown-item>
        </a>
        <a target="_blank" href="https://juejin.cn/post/7228990409909108793">
          <el-dropdown-item>{{ $t("navbar.document") }}</el-dropdown-item>
        </a>
        <el-dropdown-item divided @click="logout">
          {{ $t("navbar.logout") }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useUserStore, useTagsViewStore } from "@/store";
const userStore = useUserStore();
const tagsViewStore = useTagsViewStore();

/**
 * 注销
 */
function logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    userStore
      .logout()
      .then(() => {
        tagsViewStore.delAllViews();
      })
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
  });
}
</script>

<style scoped lang="scss">
.avatar {
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
  }
}
</style>
