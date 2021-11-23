import { defineConfig } from "vite";
import type { PluginOption } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const plugins: (PluginOption | PluginOption[])[] = [vue()];
plugins.push(dts());

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: path.join(__dirname, "/dist"),
        target: "esnext", // 这里是库模式 自然直接打包为最新es规范的包，减少polyfill代码

        lib: {
            entry: path.join(__dirname, "/src/index.ts"),
            fileName: "index",
            name: "sdt",
            formats: ["es"], // 只打包出es模块的包
        },
        rollupOptions: {
            external: [/^(@{0,1})vue/],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
    plugins,
});
