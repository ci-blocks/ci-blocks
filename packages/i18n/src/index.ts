// ========== 类型 ==========
export type { 语言, 语言包 } from './类型';

// ========== 语言包（单个） ==========
export { zhCN } from './zh-CN';
export { zhHK } from './zh-HK';
export { zhMO } from './zh-MO';
export { zhTW } from './zh-TW';
export { enUS } from './en-US';
export { jaJP } from './ja-JP';

// ========== 语言注册表（汇总） ==========
export {
    语言包表,
    语言顺序,
    取语言显示名,
    是已知语言,
    取默认语言,
    取语言包,
} from './语言注册表';

// ========== 从类型文件 re-export 的工具函数 ==========
export { 取积木名, 取积木描述, 取字段名, 取选项名 } from './类型';