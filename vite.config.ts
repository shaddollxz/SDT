import { defineConfig } from "vite";
import type { PluginOption } from "vite";
import path from "path";
import fs from "fs-extra";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const outDir = path.join(__dirname, "/dist");

const plugins: (PluginOption | PluginOption[])[] = [vue()];
plugins.push(
    dts({
        async afterBuild() {
            const indexDir = path.resolve(outDir, "./index.d.ts");
            const dts = await fs.readFile(indexDir, "utf-8");
            await fs.writeFile(indexDir, dts + 'import "./globalComponents";\r');
        },
    })
);

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir,
        target: "es2015", // 这里是库模式 发布到npm用es2015 否则webpack无法使用

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
