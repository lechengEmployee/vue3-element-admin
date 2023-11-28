<template>
  <el-main>
    <el-scrollbar>
      <router-view>
        <template #default="{ Component, route }">
          <transition name="fade-slide" mode="out-in">
            <keep-alive :include="tagsViewStore.cachedViews">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </template>
      </router-view>
    </el-scrollbar>
  </el-main>
</template>

<script setup lang="ts">
import { useTagsViewStore } from "@/store/modules/tagsView";

const tagsViewStore = useTagsViewStore();
</script>
