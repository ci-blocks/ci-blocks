import type { 语言, 语言包 } from './类型';

// ========== 语言包导入 ==========
import { zhCN } from './zh-CN';
import { zhHK } from './zh-HK';
import { zhMO } from './zh-MO';
import { zhTW } from './zh-TW';
import { enUS } from './en-US';
import { jaJP } from './ja-JP';

/**
 * 语言注册表
 *
 * 加新语言只需两步：
 *   1. 在本目录新建 `xx-XX.ts`，导出 `xxXX: 语言包`
 *   2. 在下方「导入」和「表」各加一行
 *
 * 语言下拉的显示顺序 = 本表 key 顺序。按地区分组，方便阅读。
 */
export const 语言包表: Record<语言, 语言包> = {
    // 中文
    'zh-CN': zhCN,
    'zh-HK': zhHK,
    'zh-MO': zhMO,
    'zh-TW': zhTW,
    // 英语
    'en-US': enUS,
    // 日语
    'ja-JP': jaJP,
};

/** 按注册顺序返回所有语言代码 */
export const 语言顺序: 语言[] = Object.keys(语言包表) as 语言[];

/** 取某语言的显示名（用于语言下拉） */
export function 取语言显示名(代码: 语言): string {
    return 语言包表[代码]?.名称 ?? 代码;
}

/** 判断是否是已注册的语言代码 */
export function 是已知语言(代码: string): 代码 is 语言 {
    return 代码 in 语言包表;
}

/** 默认语言：找不到时兜底 */
export function 取默认语言(): 语言 {
    return 'zh-CN';
}

/** 安全取语言包：代码无效时返回默认语言包 */
export function 取语言包(代码: string): 语言包 {
    return 语言包表[代码 as 语言] ?? 语言包表[取默认语言()];
}