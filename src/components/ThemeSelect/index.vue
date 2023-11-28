<template>
  <el-switch
    v-model="isDark"
    inline-prompt
    :active-icon="IconEpMoon"
    :inactive-icon="IconEpSunny"
    active-color="var(--el-fill-color-dark)"
    inactive-color="var(--el-fill-color-dark)"
    @change="handleThemeChange"
  />
</template>

<script setup lang="ts">
import IconEpSunny from "~icons/ep/sunny";
import IconEpMoon from "~icons/ep/moon";
import { useSettingsStore } from "@/store/modules/settings";
const settingsStore = useSettingsStore();

const isDark = ref<boolean>(settingsStore.theme === "dark");
const handleThemeChange = (isDark: any) => {
  useToggle(isDark);
  settingsStore.changeSetting({
    key: "theme",
    value: isDark ? "dark" : "light",
  });
};
</script>
