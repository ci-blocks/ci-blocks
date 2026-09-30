import type { CIBBlock } from '@cib/block-sdk';

export interface 单条加载结果 {
    积木: CIBBlock<any>[];
    错误?: string;
}

export interface 批量加载结果 {
    积木: CIBBlock<any>[];
    错误: { url: string; 消息: string }[];
}

/** 从 URL 末段推一个可读名字，用于 UI 列表默认显示 */
export function 从URL取名字(url: string): string {
    try {
        const u = new URL(url, window.location.href);
        const 末段 = u.pathname.split('/').filter(Boolean).pop() ?? url;
        return 末段.replace(/\.(m?js|ts|cjs)$/i, '') || url;
    } catch {
        return url.slice(0, 60);
    }
}

/** 加载单个外部积木（URL → 模块 → 积木数组） */
export async function 加载单个外部积木(url: string): Promise<单条加载结果> {
    try {
        const mod = await import(/* @vite-ignore */ url);
        const 导出 = (mod as any).default ?? mod;
        const 候选 = Array.isArray(导出) ? 导出 : [导出];
        const 合法 = 候选.filter(
            (b: any) => b && typeof b === 'object' && typeof b.id === 'string',
        ) as CIBBlock<any>[];
        if (合法.length === 0) {
            return { 积木: [], 错误: '文件未导出有效的积木' };
        }
        return { 积木: 合法 };
    } catch (e) {
        return { 积木: [], 错误: (e as Error).message };
    }
}

/** 批量加载（保留给内部 / 老调用方） */
export async function 加载外部积木(urls: string[]): Promise<批量加载结果> {
    const 积木: CIBBlock<any>[] = [];
    const 错误: { url: string; 消息: string }[] = [];
    for (const url of urls) {
        const r = await 加载单个外部积木(url);
        if (r.错误) {
            错误.push({ url, 消息: r.错误 });
        } else {
            积木.push(...r.积木);
        }
    }
    return { 积木, 错误 };
}

/** 从 URL 参数 ?blocks=a.js,b.js 读取要加载的积木列表 */
export function 从URL读取积木参数(): string[] {
    try {
        const 参数 = new URLSearchParams(window.location.search);
        const raw = 参数.get('blocks');
        if (!raw) return [];
        return raw
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
    } catch {
        return [];
    }
}