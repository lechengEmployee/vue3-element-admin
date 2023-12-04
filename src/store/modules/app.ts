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
  const sidebarOpen = useStorage("sidebarOpen", true);
  const isMobile = ref(false); // 使用 ref 创建响应式变量

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
    sidebarOpen.value = !sidebarOpen.value;
  }

  function closeSideBar() {
    sidebarOpen.value = false;
  }

  function openSideBar() {
    sidebarOpen.value = true;
  }

  function toggleDevice(device: string) {
    isMobile.value = device == "mobile";
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
    sidebarOpen,
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
