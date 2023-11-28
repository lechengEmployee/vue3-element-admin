// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: {
    "flex-center": "flex justify-center items-center",
    "flex-x-center": "flex justify-center",
    "flex-y-center": "flex items-center",
    "wh-full": "w-full h-full",
  },
  theme: {
    colors: {
      primary: "var(--el-color-primary)",
      primary_dark: "var(--el-color-primary-light-5)",
      info: "var(--el-color-info)",
      success: "var(--el-color-success)",
      warning: "var(--el-color-warning)",
      error: "var(--el-color-error)",
      fill: "var(--el-fill-color-light)",
      text: "var(--el-text-color-primary)",
      card: "var(--el-bg-color-overlay)",
      background: "var(--el-bg-color)",
      borderColor: "var(--el-border-color-lighter)",
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
