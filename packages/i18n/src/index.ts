// packages/i18n/src/index.ts
export type { 语言, 语言包 } from './类型';
export { zhCN } from './zh-CN';
export { zhHK } from './zh-HK';
export { zhMO } from './zh-MO';
export { zhTW } from './zh-TW';
export { enUS } from './en-US';
export { jaJP } from './ja-JP';

import { zhCN } from './zh-CN';
import { zhHK } from './zh-HK';
import { zhMO } from './zh-MO';
import { zhTW } from './zh-TW';
import { enUS } from './en-US';
import { jaJP } from './ja-JP';

export const 语言包表: Record<语言, 语言包> = {
    'zh-CN': zhCN,
    'zh-HK': zhHK,
    'zh-MO': zhMO,
    'zh-TW': zhTW,
    'en-US': enUS,
    'ja-JP': jaJP,
};

// 从 类型.ts 转出这几个工具函数
export { 取积木名, 取积木描述, 取字段名, 取选项名 } from './类型';