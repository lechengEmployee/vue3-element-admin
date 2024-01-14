<template>
  <svg-icon v-if="icon" :icon-name="icon" />
  <span class="title" v-if="title">{{ translateRouteTitle(title) }}</span>
</template>

<script setup lang="ts">
import { translateRouteTitle } from "@/utils/i18n";

defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.el-menu {
  .title {
    margin-left: 5px;
  }

  &--collapse {
    .title {
      margin-left: 0;
    }
  }
}
</style>
