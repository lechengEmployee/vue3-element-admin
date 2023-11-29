import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import defaultSettings from "@/settings";

// 导入 Element Plus 中英文语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";

// setup
export const useAppStore = defineStore("app", () => {
  // state
  const size = useStorage<any>("size", defaultSettings.size);
  const language = useStorage("language", defaultSettings.language);
  const isCollapse = useStorage<Boolean>("isCollapse", false);
  const isMobile = useStorage<Boolean>("isMobile", false);
  /**
   * 根据语言标识读取对应的语言包
   */
  const locale = computed(() => {
    if (language?.value == "en") {
      return en;
    } else {
      return zhCn;
    }
  });

  // actions
  function toggleSidebar() {
    isCollapse.value = !isCollapse.value;
  }

  function closeSideBar() {
    isCollapse.value = false;
  }

  function openSideBar() {
    isCollapse.value = true;
  }

  function toggleDevice() {
    isMobile.value = !isMobile.value;
  }

  function changeSize(val: string) {
    size.value = val;
  }
  /**
   * 切换语言
   *
   * @param val
   */
  function changeLanguage(val: string) {
    language.value = val;
  }

  return {
    isMobile,
    isCollapse,
    language,
    locale,
    size,
    toggleDevice,
    changeSize,
    changeLanguage,
    toggleSidebar,
    closeSideBar,
    openSideBar,
  };
});
