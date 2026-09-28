// packages/i18n/src/index.ts
export type { 语言, 语言包 } from './类型';
export { zhCN } from './zh-CN';
export { enUS } from './en-US';

import { zhCN } from './zh-CN';
import { enUS } from './en-US';
import type { 语言, 语言包 } from './类型';

export const 语言包表: Record<语言, 语言包> = {
    'zh-CN': zhCN,
    'en-US': enUS,
};

// 从 类型.ts 转出这几个工具函数
export { 取积木名, 取积木描述, 取字段名, 取选项名 } from './类型';