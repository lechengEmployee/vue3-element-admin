<template>
  <transition name="fade-slide">
    <router-link
      v-if="settingsStore.showSidebarLogo"
      class="wh-full flex-center h-[60px]"
      to="/"
    >
      <img :src="logo" class="w-5 h-5" />
      <span v-show="collapse" class="ml-2 text-4">{{
        settingsStore.title
      }}</span>
    </router-link>
  </transition>
</template>

<script lang="ts" setup>
import { useSettingsStore } from "@/store/modules/settings";

const settingsStore = useSettingsStore();

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

const logo = ref(new URL(`@/assets/logo.png`, import.meta.url).href);
</script>
