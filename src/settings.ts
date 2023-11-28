import { LayoutType, ThemeType, SizeType, LanguageType } from "@/enums";

const defaultSettings: AppSettings = {
  title: "vue3-element-admin",
  version: "v2.7.0",
  showSettings: true,
  tagsView: true,
  fixedHeader: false,
  showSidebarLogo: true,
  layout: LayoutType.Left,
  theme: ThemeType.Light,
  size: SizeType.Default,
  language: LanguageType.zhCN,
  themeColor: "#409EFF",
  watermark: { enabled: false, content: "有来技术" },
};

export default defaultSettings;
