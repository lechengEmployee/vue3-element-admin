/**
 * 菜单类型
 */
export enum MenuType {
  /**
   * 目录
   */
  CATALOG = "CATALOG",
  /**
   * 菜单
   */
  MENU = "MENU",

  /**
   * 按钮
   */
  BUTTON = "BUTTON",
  /**
   * 外链
   */
  EXTLINK = "EXTLINK",
}

/**
 * 布局类型
 */
export enum LayoutType {
  Left = "left", // 左侧菜单布局
  Top = "top", // 顶部菜单布局
  Mix = "mix", // 混合菜单布局
}

/**
 * 主题枚举
 */
export enum ThemeType {
  Dark = "dark", // 深色主题
  Light = "light", // 浅色主题
}

export enum SizeType {
  Default = "default",
  Large = "large",
  Small = "small",
}

export enum LanguageType {
  zhCN = "zh-cn",
  en = "en",
}
