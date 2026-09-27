import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, '../src');

const 目录列表 = readdirSync(src).filter((name) => {
    const 路径 = join(src, name);
    try {
        return statSync(路径).isDirectory();
    } catch {
        return false;
    }
});

const 导出列表 = [];

for (const 目录 of 目录列表.sort()) {
    const blockPath = join(src, 目录, 'block.ts');
    try {
        statSync(blockPath);
    } catch {
        continue;
    }

    const 内容 = readFileSync(blockPath, 'utf-8');
    const const匹配 = 内容.match(/export const (\S+)\s*=\s*定义积木/);
    if (!const匹配) continue;
    const 积木名 = const匹配[1];

    const interface匹配 = 内容.match(/export interface (\S+输入)\s*\{/);
    const 类型名 = interface匹配 ? interface匹配[1] : null;

    导出列表.push({ 目录, 积木名, 类型名 });
}

const 行列表 = ['// 此文件由 scripts/gen-index.mjs 自动生成，请勿手动修改', ''];

// import
for (const { 目录, 积木名 } of 导出列表) {
    行列表.push(`import { ${积木名} } from './${目录}/block';`);
}
行列表.push('');

// re-export（带 目录 解构）
for (const { 目录, 积木名, 类型名 } of 导出列表) {
    行列表.push(`export { ${积木名} };`);
    if (类型名) {
        行列表.push(`export type { ${类型名} } from './${目录}/block';`);
    }
}
行列表.push('');

// 数组
行列表.push('// 所有官方积木');
行列表.push('export const 所有积木 = [');
for (const { 积木名 } of 导出列表) {
    行列表.push(`  ${积木名},`);
}
行列表.push('];');
行列表.push('');

const 输出 = 行列表.join('\n');
writeFileSync(join(src, 'index.ts'), 输出, 'utf-8');

console.log(`已生成 index.ts，共 ${导出列表.length} 个积木`);